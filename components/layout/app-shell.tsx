"use client";

import { SiteChrome } from "@/components/layout/site-chrome";
import { SiteCursor } from "@/components/layout/site-cursor";
import { PageMotion } from "@/components/layout/page-motion";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="grain personality-grid min-h-dvh bg-background">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <SiteChrome />
        <SiteCursor />
        <main id="main-content" tabIndex={-1} className="site-main outline-none">
          <PageMotion>{children}</PageMotion>
        </main>
      </div>
    </TooltipProvider>
  );
}
