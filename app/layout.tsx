import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Kenangan Jago NganDev | Scrapbook Digital",
  description: "A Cyberpunk digital scrapbook for your precious memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <main className="min-h-screen cyber-grid relative overflow-x-hidden">
          {/* Scanline Overlay */}
          <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-30"></div>

          {children}

          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "bg-black border-2 border-primary text-primary font-mono rounded-none clip-path-cyber-inv",
            }}
          />
        </main>
      </body>
    </html>
  );
}
