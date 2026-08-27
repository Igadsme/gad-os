"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function FilterPills({
  items,
  value,
  onChange,
  hrefs,
}: {
  items: readonly string[];
  value: string;
  onChange?: (value: string) => void;
  hrefs?: Readonly<Record<string, string>>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = value === item;
        const className = cn(
          "inline-flex min-h-10 items-center rounded-lg border px-3 text-sm font-medium transition-colors",
          active
            ? "border-primary/20 bg-primary-soft text-primary"
            : "border-border bg-surface text-muted hover:border-primary/30 hover:text-foreground",
        );

        if (hrefs?.[item]) {
          return (
            <Link key={item} href={hrefs[item]} className={className}>
              {item}
            </Link>
          );
        }

        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange?.(item)}
            className={className}
            aria-pressed={active}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
