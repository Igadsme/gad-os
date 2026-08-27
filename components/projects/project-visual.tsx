import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function Chrome({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="absolute inset-2 overflow-hidden rounded-md border border-white/10 bg-black/25">
      <div className="flex items-center gap-1 border-b border-white/10 px-2 py-1">
        <span className="size-1.5 rounded-full bg-white/25" />
        <span className="size-1.5 rounded-full bg-white/25" />
        <span className="size-1.5 rounded-full bg-white/25" />
        <span className="ml-2 truncate text-[8px] uppercase tracking-[0.16em] text-white/50">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function DevDashPreview() {
  return (
    <Chrome title="DevDash">
      <div className="grid h-[calc(100%-18px)] grid-cols-[42px_1fr] gap-1.5 p-1.5">
        <div className="space-y-1 rounded bg-white/5 p-1">
          <div className="h-2 rounded bg-sky-400/80" />
          <div className="h-2 rounded bg-white/15" />
          <div className="h-2 rounded bg-white/10" />
          <div className="h-2 rounded bg-white/10" />
        </div>
        <div className="grid grid-rows-[auto_1fr] gap-1.5">
          <div className="grid grid-cols-3 gap-1">
            {["1,024", "80%", "PRs"].map((label) => (
              <div key={label} className="rounded bg-white/8 px-1 py-1">
                <div className="h-1 w-6 rounded bg-sky-300/70" />
                <p className="mt-1 text-[8px] font-semibold text-sky-100">{label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1 rounded bg-white/5 p-1.5">
            {["feat: summarize CI", "fix: task rank", "chore: prisma"].map((row) => (
              <div key={row} className="flex items-center gap-1">
                <span className="size-1 rounded-full bg-emerald-400" />
                <span className="h-1.5 flex-1 rounded bg-white/15" />
                <span className="text-[7px] text-white/40">{row}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function CctvPreview() {
  return (
    <Chrome title="Investigator">
      <div className="grid h-[calc(100%-18px)] grid-cols-[1fr_52px] gap-1 p-1.5">
        <div className="relative overflow-hidden rounded bg-[#0b1220]">
          <div className="absolute inset-x-2 top-1.5 h-3 rounded bg-black/50 text-center text-[7px] text-emerald-300">
            CAM-04 · 00:14:22
          </div>
          <div className="absolute left-[18%] top-[28%] h-[38%] w-[28%] rounded-sm border border-emerald-400/80" />
          <div className="absolute right-[16%] top-[40%] h-[22%] w-[18%] rounded-sm border border-amber-300/70" />
          <div className="absolute bottom-1.5 left-1.5 right-1.5 h-2 rounded bg-white/10" />
        </div>
        <div className="space-y-1">
          {["00:12", "00:14", "00:19"].map((stamp, index) => (
            <div
              key={stamp}
              className={cn(
                "rounded px-1 py-1 text-[7px] text-emerald-100",
                index === 1 ? "bg-emerald-500/30" : "bg-white/8",
              )}
            >
              {stamp}
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

function SentinelPreview() {
  return (
    <Chrome title="Sentinel · KQL">
      <div className="flex h-[calc(100%-18px)] flex-col gap-1 p-1.5 font-mono">
        <div className="rounded bg-black/40 px-1.5 py-1 text-[7px] leading-3 text-teal-200">
          CommonSecurityLog
          <br />
          | where DeviceVendor == &quot;Palo Alto&quot;
          <br />
          | summarize count() by Severity
        </div>
        <div className="grid flex-1 grid-cols-4 gap-px overflow-hidden rounded bg-white/10 text-[7px] text-teal-50">
          {["src", "sev", "cef", "hits", "fw-1", "High", "ok", "128", "fw-2", "Med", "ok", "64"].map(
            (cell, index) => (
              <div
                key={`${cell}-${index}`}
                className={cn(
                  "flex items-center px-1",
                  index < 4 ? "bg-teal-500/25" : "bg-black/30",
                )}
              >
                {cell}
              </div>
            ),
          )}
        </div>
      </div>
    </Chrome>
  );
}

function ItsmPreview() {
  return (
    <Chrome title="ServiceNow">
      <div className="flex h-[calc(100%-18px)] items-center justify-center gap-1 p-2">
        {["Intake", "Assign", "Resolve"].map((step, index) => (
          <div key={step} className="flex items-center gap-1">
            <div className="rounded-md bg-violet-400/30 px-1.5 py-2 text-center">
              <div className="mx-auto mb-1 size-2 rounded-full bg-violet-200" />
              <p className="text-[7px] font-medium text-violet-50">{step}</p>
            </div>
            {index < 2 ? <span className="h-px w-3 bg-violet-200/60" /> : null}
          </div>
        ))}
      </div>
    </Chrome>
  );
}

function RagPreview() {
  return (
    <Chrome title="RAG">
      <div className="grid h-[calc(100%-18px)] grid-cols-2 gap-1 p-1.5">
        <div className="space-y-1">
          {["doc-a", "doc-b", "doc-c"].map((doc) => (
            <div key={doc} className="h-4 rounded bg-blue-300/20" />
          ))}
        </div>
        <div className="rounded bg-blue-400/20 p-1.5">
          <div className="h-2 rounded bg-blue-200/70" />
          <div className="mt-1 space-y-1">
            <div className="h-1.5 rounded bg-white/30" />
            <div className="h-1.5 w-2/3 rounded bg-white/20" />
          </div>
          <p className="mt-2 text-[7px] text-blue-100">rank 1 · 0.92</p>
        </div>
      </div>
    </Chrome>
  );
}

function MicroservicesPreview() {
  return (
    <Chrome title="Services">
      <div className="flex h-[calc(100%-18px)] items-center justify-center gap-2 p-2">
        <div className="rounded bg-sky-400/25 px-2 py-2 text-center text-[7px] text-sky-50">
          API
        </div>
        <span className="h-px w-4 bg-sky-200/50" />
        <div className="space-y-1">
          <div className="rounded bg-white/15 px-2 py-1 text-[7px] text-white/80">Redis</div>
          <div className="rounded bg-white/15 px-2 py-1 text-[7px] text-white/80">PG</div>
        </div>
      </div>
    </Chrome>
  );
}

function WebPreview() {
  return (
    <Chrome title="truespice">
      <div className="flex h-[calc(100%-18px)] flex-col p-1.5">
        <div className="mb-1 flex gap-1">
          <div className="h-1.5 w-8 rounded bg-orange-200/70" />
          <div className="h-1.5 flex-1 rounded bg-white/15" />
        </div>
        <div className="flex-1 rounded bg-gradient-to-br from-orange-400/40 to-amber-700/30 p-2">
          <div className="h-2 w-16 rounded bg-white/70" />
          <div className="mt-1 h-1.5 w-24 rounded bg-white/30" />
        </div>
      </div>
    </Chrome>
  );
}

const previews: Record<string, () => ReactNode> = {
  devdash: DevDashPreview,
  "ai-security-camera-investigator": CctvPreview,
  "sentinel-ingestion": SentinelPreview,
  "servicenow-itsm": ItsmPreview,
  "headstarter-rag": RagPreview,
  "upcancer-microservices": MicroservicesPreview,
  "truespice-web": WebPreview,
};

const palettes: Record<string, string> = {
  devdash: "#0b1220",
  "ai-security-camera-investigator": "#07110d",
  "sentinel-ingestion": "#042f2e",
  "servicenow-itsm": "#1e1b4b",
  "headstarter-rag": "#172554",
  "upcancer-microservices": "#0f172a",
  "truespice-web": "#7c2d12",
};

export function ProjectVisual({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Preview = previews[slug] ?? DevDashPreview;
  const background = palettes[slug] ?? "#0f172a";

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background }}
      aria-hidden
    >
      <div className="media-zoom absolute inset-0">
        <Preview />
      </div>
    </div>
  );
}
