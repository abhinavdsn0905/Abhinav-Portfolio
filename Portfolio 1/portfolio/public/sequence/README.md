# Sequence Frames

Place your WebP frames here, named sequentially:

```
frame001.webp
frame002.webp
...
frame089.webp
```

The ScrollyCanvas component expects exactly 89 frames (TOTAL_FRAMES = 89).
If your frames have a different count, update the `TOTAL_FRAMES` constant in:
`src/components/ScrollySection.tsx`

Until frames are placed here, the canvas shows a dark radial gradient fallback.
