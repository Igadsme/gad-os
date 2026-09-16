"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { allNav, isActivePath, primaryNav, secondaryNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-[72px] shrink-0 flex-col border-r border-border bg-sidebar md:flex lg:w-[220px]">
      <Link href="/" className="group border-b border-border px-5 py-6">
        <span className="block font-display text-[22px] font-extrabold leading-none tracking-[0.12em]">IMANI OS</span>
        <span className="mt-1.5 block font-mono text-[10px] tracking-[0.15em] text-muted/60">v1.0.0 · 2026</span>
      </Link>
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-0 py-4">
        {primaryNav.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={isActivePath(pathname, item.href)}
          />
        ))}
        <div className="mx-5 my-3 h-px bg-border" />
        {secondaryNav.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={isActivePath(pathname, item.href)}
          />
        ))}
      </nav>
      <div className="border-t border-border px-5 py-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="status-dot" />
          <span className="font-mono text-[10px] tracking-[0.1em] text-success">AVAILABLE</span>
        </div>
        <div className="mb-4 font-mono text-[10px] tracking-[0.08em] text-muted/60">ATLANTA, GEORGIA</div>
        <div className="flex gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="font-mono text-[10px] tracking-[0.1em] text-muted/60 hover:text-violet">GH</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="font-mono text-[10px] tracking-[0.1em] text-muted/60 hover:text-violet">LI</a>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: (typeof allNav)[number]["icon"];
  active: boolean;
}) {
  return (
    <Link
      href={href}
      title={label}
      className={cn(
        "relative flex min-h-11 items-center justify-center gap-3 border-l-2 border-transparent px-5 text-[13px] font-normal tracking-[0.04em] text-muted/70 transition-colors hover:bg-white/[0.03] hover:text-muted lg:justify-start",
        active && "border-violet bg-violet/10 text-foreground hover:bg-violet/10 hover:text-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="hidden lg:inline">{label}</span>
    </Link>
  );
}
