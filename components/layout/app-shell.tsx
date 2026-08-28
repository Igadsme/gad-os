"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { CommandBar } from "@/components/layout/command-bar";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { CommandPalette } from "@/components/navigation/command-palette";
import { PageMotion } from "@/components/layout/page-motion";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="personality-grid min-h-dvh bg-background">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <div className="flex min-h-dvh">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <MobileNav />
            <CommandBar onSearch={() => setSearchOpen(true)} />
            <main id="main-content" tabIndex={-1} className="flex-1 px-4 pb-24 pt-6 outline-none md:px-7 md:pb-8 md:pt-8">
              <PageMotion>{children}</PageMotion>
            </main>
          </div>
        </div>
        <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      </div>
    </TooltipProvider>
  );
}
