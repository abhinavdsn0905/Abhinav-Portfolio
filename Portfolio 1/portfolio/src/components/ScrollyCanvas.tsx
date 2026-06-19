"use client";

import { useRef, useEffect, useCallback } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 89;
const FRAME_PATH = (i: number) =>
  `/sequence/frame${String(i).padStart(3, "0")}.webp`;

function useMappedFrameIndex(scrollYProgress: MotionValue<number>) {
  return useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useMappedFrameIndex(scrollYProgress);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      img.onload = () => {
        loaded++;
        if (loaded === 1) renderFrame(0); // show first frame immediately
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[Math.round(index)];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Resize canvas to match display size
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    // object-fit: cover math
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (imgAspect > canvasAspect) {
      sw = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasAspect;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  }, []);

  // Subscribe to frame index changes
  useEffect(() => {
    return frameIndex.on("change", (latest) => {
      frameIndexRef.current = latest;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => renderFrame(latest));
    });
  }, [frameIndex, renderFrame]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => renderFrame(frameIndexRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  // Fallback gradient when no frames are loaded
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.8);
    gradient.addColorStop(0, "#0d1a2e");
    gradient.addColorStop(0.5, "#080808");
    gradient.addColorStop(1, "#080808");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "500vh" }}
    >
      {/* Sticky canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ display: "block" }}
        />
        {/* Subtle vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(8,8,8,0.7) 100%)",
          }}
        />
      </div>
    </div>
  );
}
