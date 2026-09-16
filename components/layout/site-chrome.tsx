"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
];

export function SiteChrome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const start = window.setTimeout(() => setLoaded(true), 650);
    const progressTimer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          window.clearInterval(progressTimer);
          return 100;
        }
        return Math.min(value + 8, 100);
      });
    }, 35);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(start);
      window.clearInterval(progressTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <div className={cn("site-loader", loaded && "site-loader--done")} aria-hidden="true">
        <span className="site-loader__word">IG</span>
        <span className="site-loader__progress">{progress}%</span>
      </div>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
      <header className="site-nav">
        <Link href="/" className="site-nav__brand" onClick={() => setMenuOpen(false)}>
          <span className="site-nav__mark">IG</span>
          <span>Imani Gad</span>
        </Link>
        <nav className="site-nav__links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
          ))}
        </nav>
        <a href={`mailto:${profile.email}`} className="site-nav__cta">Let&apos;s talk <span>↗</span></a>
        <button type="button" className="site-nav__menu" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </header>
      <div id="mobile-menu" className={cn("mobile-menu", menuOpen && "mobile-menu--open")} aria-hidden={!menuOpen}>
        <div className="mobile-menu__inner">
          <p className="eyebrow">Navigation / 01</p>
          <nav aria-label="Mobile navigation">
            {links.map((link, index) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{link.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <span>{profile.location}</span>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      </div>
    </>
  );
}
