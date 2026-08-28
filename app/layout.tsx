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
}: LayoutProps<"/">) {
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
    <html lang="en" className={`${manrope.variable} ${display.variable} ${mono.variable} h-full antialiased`}>
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
