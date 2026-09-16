import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, IBM_Plex_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { profile } from "@/data/profile";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const display = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: {
    default: "Imani Gad — Software Engineer",
    template: `%s — Imani Gad`,
  },
  description:
    "Software engineer building AI-powered products and secure backend systems. Kennesaw State University computer science candidate graduating December 2026.",
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: profile.website }],
  creator: profile.name,
  keywords: ["Imani Gad", "software engineer", "full-stack engineer", "applied AI", "backend systems", "Atlanta software engineer"],
  openGraph: {
    title: "Imani Gad — Software Engineer",
    description:
      "Software engineer building AI-powered products and secure backend systems.",
    type: "website",
    url: "/",
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Imani Gad — Software Engineer",
    description: "Full-stack engineering · Applied AI · Security automation",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.website,
    image: `${profile.website}${profile.avatar}`,
    email: `mailto:${profile.email}`,
    jobTitle: "Software Engineer",
    homeLocation: { "@type": "Place", name: profile.locationFull },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: ["Full-stack engineering", "Applied AI", "Security automation"],
  };
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
