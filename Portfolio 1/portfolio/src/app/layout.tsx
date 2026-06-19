import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siva Narasimha Abhinav D — Creative Developer",
  description:
    "Portfolio of Siva Narasimha Abhinav D. CS Engineer specialising in AI/ML, full-stack development, and digital experiences.",
  keywords: ["developer", "portfolio", "Next.js", "AI", "React", "Python", "Django"],
  openGraph: {
    title: "Siva Narasimha Abhinav D — Creative Developer",
    description: "CS Engineer · Full-Stack · AI/ML",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bg text-text-primary antialiased">{children}</body>
    </html>
  );
}
