"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { allNav, isActivePath, primaryNav, secondaryNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const mobilePrimary = allNav.filter((item) => item.mobilePrimary);

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-14 items-center justify-between border-b border-border bg-sidebar px-3 py-1 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="brand-mark flex size-8 items-center justify-center rounded-lg text-[11px] font-bold text-white">
            {profile.initials}
          </span>
          <span className="font-display text-sm font-bold">{profile.productName}</span>
        </Link>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-muted hover:bg-surface-muted hover:text-foreground"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-sidebar pb-[env(safe-area-inset-bottom)] md:hidden">
        {mobilePrimary.map((item) => {
          const Icon = item.icon;
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-11 flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium text-muted",
                active && "text-primary",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex min-h-11 flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium text-muted"
        >
          <Menu className="size-4" />
          More
        </button>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom">
          <p className="mb-3 text-sm font-semibold">All destinations</p>
          <div className="grid grid-cols-2 gap-2">
            {[...primaryNav, ...secondaryNav].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm",
                    isActivePath(pathname, item.href) &&
                      "border-primary/30 bg-primary-soft text-primary",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
