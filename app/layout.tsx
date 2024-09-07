import type { Metadata } from "next";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-caption",
});

export const metadata: Metadata = {
  title: "App Meteo",
  description: "Application Meteo pour les villes françaises",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          josefinSans.variable,
          "font-sans bg-background text-foreground scrollbar-gutter-stable"
        )}
      >
        {children}
      </body>
    </html>
  );
}
