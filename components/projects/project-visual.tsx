import { cn } from "@/lib/utils";

const palettes: Record<string, { bg: string; accent: string; label: string }> = {
  devdash: { bg: "#0f172a", accent: "#38bdf8", label: "DevDash" },
  "ai-security-camera-investigator": {
    bg: "#111827",
    accent: "#34d399",
    label: "CCTV",
  },
  "sentinel-ingestion": { bg: "#042f2e", accent: "#2dd4bf", label: "Sentinel" },
  "servicenow-itsm": { bg: "#1e1b4b", accent: "#a78bfa", label: "ITSM" },
  "headstarter-rag": { bg: "#1e3a8a", accent: "#93c5fd", label: "RAG" },
  "upcancer-microservices": { bg: "#1e293b", accent: "#60a5fa", label: "API" },
  "truespice-web": { bg: "#7c2d12", accent: "#fdba74", label: "Web" },
};

export function ProjectVisual({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const palette = palettes[slug] ?? {
    bg: "#0f172a",
    accent: "#60a5fa",
    label: "Gad OS",
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: palette.bg }}
      aria-hidden
    >
      <div className="absolute inset-3 rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="mb-3 flex gap-1">
          <span className="size-1.5 rounded-full bg-white/30" />
          <span className="size-1.5 rounded-full bg-white/30" />
          <span className="size-1.5 rounded-full bg-white/30" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 h-8 rounded" style={{ background: palette.accent, opacity: 0.85 }} />
          <div className="h-8 rounded bg-white/10" />
          <div className="h-14 rounded bg-white/10" />
          <div className="h-14 rounded" style={{ background: palette.accent, opacity: 0.35 }} />
          <div className="h-14 rounded bg-white/10" />
        </div>
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
          {palette.label}
        </p>
      </div>
    </div>
  );
}
