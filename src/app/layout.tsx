import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CVProvider } from "@/context/CVContext";
import { PremiumProvider } from '@/context/PremiumContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrimeResumeBuilder - AI-Powered Resume Builder",
  description: "Create professional resumes with AI assistance. Modern templates, real-time preview, and easy customization.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <PremiumProvider>
          <CVProvider>
            {children}
          </CVProvider>
        </PremiumProvider>
      </body>
    </html>
  );
}
