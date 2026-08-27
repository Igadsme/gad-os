"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { allNav, isActivePath, primaryNav, secondaryNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <aside className="sticky top-0 hidden h-dvh w-[72px] shrink-0 flex-col border-r border-border bg-sidebar md:flex lg:w-[220px]">
      <Link href="/" className="flex items-center gap-3 px-3 py-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-foreground text-xs font-bold text-background">
          {profile.initials}
        </span>
        <span className="hidden text-sm font-semibold tracking-tight lg:inline">
          {profile.productName}
        </span>
      </Link>
      <nav className="flex flex-1 flex-col gap-1 px-2">
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
        <button
          type="button"
          aria-label="Toggle theme"
          className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-foreground"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <Sun className="size-4 dark:hidden" />
          <Moon className="hidden size-4 dark:block" />
        </button>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-foreground"
        >
          <ExternalLink className="size-4" />
        </a>
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
        "flex items-center justify-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground lg:justify-start",
        active && "bg-primary-soft text-primary hover:bg-primary-soft hover:text-primary",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="hidden lg:inline">{label}</span>
    </Link>
  );
}
