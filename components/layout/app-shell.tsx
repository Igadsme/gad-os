"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { CommandBar } from "@/components/layout/command-bar";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { CommandPalette } from "@/components/navigation/command-palette";
import { PageMotion } from "@/components/layout/page-motion";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background">
      <div className="flex min-h-dvh">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <MobileNav />
          <CommandBar onSearch={() => setSearchOpen(true)} />
          <main className="flex-1 px-4 pb-24 pt-4 md:px-6 md:pb-8 md:pt-6">
            <PageMotion>{children}</PageMotion>
          </main>
        </div>
      </div>
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
