import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { profile } from "@/data/profile";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: {
    default: `${profile.name} · ${profile.productName}`,
    template: `%s · ${profile.productName}`,
  },
  description:
    "Software engineer, AI builder, and cybersecurity practitioner. Kennesaw State University, December 2026.",
  openGraph: {
    title: `${profile.name} · ${profile.productName}`,
    description:
      "Imani Gad’s work in software engineering, AI/ML, and cybersecurity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${display.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
