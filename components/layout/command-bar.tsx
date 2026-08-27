"use client";

import { ChevronDown, Search } from "lucide-react";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

export function CommandBar({
  onSearch,
  className,
}: {
  onSearch: () => void;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:px-6",
        className,
      )}
    >
      <button
        type="button"
        onClick={onSearch}
        className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-border bg-surface px-4 text-left text-sm text-muted shadow-sm"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 truncate">
          Search projects, skills, or experience...
        </span>
        <kbd className="hidden rounded-md border border-border bg-surface-muted px-1.5 py-0.5 text-[11px] font-medium text-muted sm:inline-flex">
          ⌘ K
        </kbd>
      </button>
      <ThemeSwitch className="hidden sm:inline-flex" />
      <div className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium sm:flex">
        <span className="availability-dot size-2 rounded-full bg-success" />
        {profile.availabilityShort}
        <ChevronDown className="size-3.5 text-muted" />
      </div>
    </header>
  );
}
