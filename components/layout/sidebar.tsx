"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, MapPin } from "lucide-react";
import { allNav, isActivePath, primaryNav, secondaryNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-[72px] shrink-0 flex-col border-r border-border bg-sidebar md:flex lg:w-[216px]">
      <Link href="/" className="group flex items-center gap-3 px-3 py-5">
        <span className="brand-mark flex size-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-extrabold text-white">
          {profile.initials}
        </span>
        <span className="hidden lg:block">
          <span className="block font-display text-sm font-bold tracking-tight">{profile.productName}</span>
        </span>
      </Link>
      <nav className="flex flex-1 flex-col gap-0.5 px-2">
        {primaryNav.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={isActivePath(pathname, item.href)}
          />
        ))}
        <div className="mx-3 my-2 h-px bg-border" />
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
      <div className="flex items-center gap-1 px-3 py-4">
        <div className="hidden min-w-0 flex-1 items-center gap-2 px-2 py-2 lg:flex">
          <MapPin className="size-3.5 shrink-0 text-muted" />
          <span className="truncate text-[11px] font-semibold">Atlanta, GA</span>
        </div>
        <Tooltip label="GitHub">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <ExternalLink className="size-4" />
          </a>
        </Tooltip>
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
        "relative flex min-h-11 items-center justify-center gap-3 rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground lg:justify-start",
        active && "bg-primary-soft text-primary hover:bg-primary-soft hover:text-primary",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="hidden lg:inline">{label}</span>
    </Link>
  );
}
