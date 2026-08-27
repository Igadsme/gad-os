"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { searchPortfolio } from "@/lib/search";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchPortfolio(query, 14), [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
        <DialogTitle className="sr-only">Search Gad OS</DialogTitle>
        <Command className="bg-surface" shouldFilter={false}>
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search projects, skills, or experience..."
            className="h-12 w-full border-b border-border bg-transparent px-4 text-sm outline-none"
          />
          <Command.List className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 && (
              <div className="px-3 py-8 text-center text-sm text-muted">
                No matches in the résumé-backed index.
              </div>
            )}
            {results.map((result) => (
              <Command.Item
                key={result.id}
                value={result.id}
                onSelect={() => {
                  router.push(result.href);
                  onOpenChange(false);
                  setQuery("");
                }}
                onMouseDown={(event) => {
                  event.preventDefault();
                  router.push(result.href);
                  onOpenChange(false);
                  setQuery("");
                }}
                className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm data-[selected=true]:bg-primary-soft"
              >
                <span>
                  <span className="block font-medium">{result.title}</span>
                  <span className="text-xs text-muted">{result.subtitle}</span>
                </span>
                <span className="text-[11px] uppercase tracking-wide text-muted">
                  {result.type}
                </span>
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
