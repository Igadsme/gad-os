import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Sparkline({ color = "#3b82f6", points = "0,42 18,34 36,38 54,20 72,28 90,8 108,16 126,4" }) {
  return (
    <svg viewBox="0 0 126 48" className="h-full w-full" preserveAspectRatio="none">
      <path d="M0 46H126" stroke="currentColor" strokeOpacity=".1" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      {points.split(" ").map((point) => {
        const [cx, cy] = point.split(",");
        return <circle key={point} cx={cx} cy={cy} r="1.8" fill={color} />;
      })}
    </svg>
  );
}

function DarkShell({ name, section, accent = "#3b82f6", nav = ["Overview", "Projects", "Commits", "Reports", "Settings"], children }: { name: string; section: string; accent?: string; nav?: string[]; children: ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#08111c] text-white">
      <div className="flex h-full">
        <aside className="w-[24%] shrink-0 border-r border-white/[0.08] bg-[#0b1623] p-[4%]">
          <div className="mb-[22%] flex items-center gap-1.5"><span className="grid size-4 place-items-center rounded bg-violet-500 text-[6px] font-black">{name.slice(0, 1)}</span><span className="text-[8px] font-bold tracking-tight">{name}</span></div>
          <div className="space-y-1.5">{nav.map((item, index) => <div key={item} className={cn("flex items-center gap-1.5 rounded px-1.5 py-1 text-[6px]", index === 0 ? "bg-white/[0.1] text-white" : "text-slate-400")}><span className="size-1.5 rounded-[2px] border" style={{ borderColor: index === 0 ? accent : "#526173" }} />{item}</div>)}</div>
        </aside>
        <main className="min-w-0 flex-1 p-[4%]">
          <div className="mb-[5%] flex items-center justify-between"><p className="text-[9px] font-semibold">{section}</p><span className="rounded border border-white/10 px-1.5 py-1 text-[5px] text-slate-400">Last 7 days⌄</span></div>
          {children}
        </main>
      </div>
    </div>
  );
}

function LightShell({ name, section, children }: { name: string; section: string; children: ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#fbfcff] text-[#111827]">
      <div className="flex h-full">
        <aside className="w-[23%] shrink-0 border-r border-slate-200 bg-[#f7f9fc] p-[4%]">
          <div className="mb-[22%] flex items-center gap-1.5"><span className="grid size-4 place-items-center rounded bg-[#4968ed] text-[6px] font-black text-white">{name.slice(0, 1)}</span><span className="text-[7px] font-bold">{name}</span></div>
          {["Dashboard", "Activity", "Analytics", "Settings"].map((item, index) => <div key={item} className={cn("mb-1.5 rounded px-1.5 py-1 text-[6px]", index === 0 ? "bg-indigo-50 text-indigo-600" : "text-slate-400")}>{item}</div>)}
        </aside>
        <main className="min-w-0 flex-1 p-[4%]">
          <div className="mb-[5%] flex items-center justify-between"><div><p className="text-[9px] font-bold">{section}</p><p className="text-[5px] text-slate-400">Live operational overview</p></div><span className="rounded bg-indigo-600 px-2 py-1 text-[5px] font-semibold text-white">+ New</span></div>
          {children}
        </main>
      </div>
    </div>
  );
}

function Metric({ label, value, change, dark = true }: { label: string; value: string; change: string; dark?: boolean }) {
  return <div className={cn("rounded-md border p-[7%]", dark ? "border-white/[0.07] bg-white/[0.035]" : "border-slate-200 bg-white")}><p className="truncate text-[5px] text-slate-400">{label}</p><div className="mt-1 flex items-end justify-between gap-1"><strong className="text-[10px] leading-none">{value}</strong><span className="text-[4px] text-emerald-500">{change}</span></div></div>;
}

function DevDashPreview() {
  return <DarkShell name="DevDash" section="Overview">
    <div className="grid grid-cols-4 gap-1.5"><Metric label="Commits" value="156" change="↗ 12%" /><Metric label="PRs Merged" value="28" change="↗ 8%" /><Metric label="Issues Closed" value="34" change="↗ 22%" /><Metric label="Focus Time" value="18.4h" change="↗ 6%" /></div>
    <div className="mt-2 rounded-md border border-white/[0.07] bg-white/[0.025] p-2"><p className="text-[6px] font-semibold">Activity</p><div className="mt-1.5 h-[54px]"><Sparkline /></div><div className="flex justify-between text-[4px] text-slate-500"><span>Apr 22</span><span>Apr 24</span><span>Apr 26</span><span>Apr 28</span></div></div>
    <div className="mt-2 grid grid-cols-[1.25fr_1fr] gap-2"><div className="rounded-md border border-white/[0.07] p-2 text-[5px]"><p className="mb-1.5 font-semibold">Top Repositories</p><div className="flex justify-between text-slate-400"><span>devdash/web</span><span>1,234</span></div><div className="mt-1 flex justify-between text-slate-400"><span>devdash/api</span><span>642</span></div></div><div className="rounded-md border border-white/[0.07] p-2 text-[5px]"><p className="font-semibold">Languages</p><p className="mt-1.5 text-slate-400">TypeScript 52%</p><div className="mt-1 h-1 rounded bg-white/10"><div className="h-full w-3/4 rounded bg-blue-500" /></div><p className="mt-1.5 text-slate-400">Python 21%</p><div className="mt-1 h-1 rounded bg-white/10"><div className="h-full w-1/3 rounded bg-blue-500" /></div></div></div>
  </DarkShell>;
}

function CameraPreview() {
  return <DarkShell name="LensAI" section="Investigation Center" accent="#22c55e" nav={["Overview", "Cameras", "Detections", "Search", "Settings"]}>
    <div className="grid grid-cols-3 gap-1.5"><Metric label="Cameras" value="12" change="All online" /><Metric label="Detections" value="248" change="↗ 18%" /><Metric label="Matches" value="37" change="92% conf." /></div>
    <div className="mt-2 grid grid-cols-[1.45fr_.75fr] gap-2"><div className="relative h-[94px] overflow-hidden rounded-md border border-white/10 bg-gradient-to-b from-[#1c3340] to-[#0c141b]"><div className="absolute inset-x-0 top-0 flex justify-between bg-black/40 px-2 py-1 text-[5px] text-emerald-300"><span>CAM 04 · North Hall</span><span>LIVE</span></div><div className="absolute bottom-0 left-1/4 h-2/3 w-px -skew-x-[28deg] bg-white/10" /><div className="absolute bottom-0 right-1/4 h-2/3 w-px skew-x-[28deg] bg-white/10" /><div className="absolute left-[30%] top-[32%] h-[47%] w-[20%] border border-emerald-400"><span className="absolute -top-2 left-0 bg-emerald-500 px-1 text-[4px] text-black">person 94%</span></div><div className="absolute right-[16%] top-[48%] h-[28%] w-[18%] border border-amber-400"><span className="absolute -top-2 left-0 bg-amber-400 px-1 text-[4px] text-black">bag 81%</span></div></div><div className="space-y-1.5">{[["00:14:22", "Person"], ["00:13:58", "Vehicle"], ["00:12:41", "Object"]].map(([time, item], i) => <div key={time} className={cn("rounded border p-1.5", i === 0 ? "border-emerald-500/40 bg-emerald-500/10" : "border-white/[0.07]")}><p className="text-[5px] font-semibold">{item}</p><p className="text-[4px] text-slate-400">{time} · ranked</p></div>)}</div></div>
    <div className="mt-2 rounded-md border border-white/[0.07] p-2"><div className="flex justify-between text-[5px]"><span>Embedding search confidence</span><span className="text-emerald-400">92%</span></div><div className="mt-1.5 h-1 rounded bg-white/10"><div className="h-full w-[92%] rounded bg-emerald-500" /></div></div>
  </DarkShell>;
}

function SentinelPreview() {
  const nodes = [[50, 50], [22, 28], [79, 24], [18, 68], [82, 72], [50, 12], [50, 88]];
  return <DarkShell name="Sentinel" section="Security Overview" accent="#8b5cf6" nav={["Overview", "Alerts", "Incidents", "Threat Intel", "Playbooks"]}>
    <div className="grid grid-cols-4 gap-1.5"><Metric label="Alerts" value="24" change="↘ 17%" /><Metric label="Incidents" value="3" change="↘ 25%" /><Metric label="Events" value="1,231" change="↗ 18%" /><Metric label="Sources" value="12" change="100%" /></div>
    <div className="mt-2 grid grid-cols-[1.35fr_.8fr] gap-2"><div className="relative h-[104px] rounded-md border border-white/[0.07] bg-[#09131f]"><p className="absolute left-2 top-2 text-[5px] font-semibold">Attack graph</p><svg viewBox="0 0 100 100" className="absolute inset-4 top-5 h-[78%] w-[80%]">{nodes.slice(1).map(([x,y], i) => <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="#31598b" strokeWidth="1" />)}{nodes.map(([x,y], i) => <circle key={`${x}-${y}`} cx={x} cy={y} r={i === 0 ? 8 : 4} fill={i === 0 ? "#ef4444" : "#17385e"} stroke={i === 0 ? "#fca5a5" : "#60a5fa"} strokeWidth="1" />)}<circle cx="50" cy="50" r="2" fill="white" /></svg></div><div className="rounded-md border border-white/[0.07] p-2"><p className="text-[5px] font-semibold">Top alerts</p>{["Brute Force", "Suspicious Login", "Data Exfiltration", "Malware"].map((x,i)=><div key={x} className="mt-2 flex items-center gap-1 text-[4px]"><span className={cn("size-1.5 rounded-full", i<2 ? "bg-red-500" : "bg-amber-400")} /><span className="min-w-0 flex-1 truncate text-slate-300">{x}</span><span className="text-slate-500">High</span></div>)}</div></div>
  </DarkShell>;
}

function ItsmPreview() {
  return <LightShell name="FlowDesk" section="IT service operations">
    <div className="grid grid-cols-3 gap-1.5"><Metric label="Open tickets" value="20" change="↓ 75%" dark={false} /><Metric label="Resolved" value="280" change="↑ 34%" dark={false} /><Metric label="SLA met" value="96%" change="↑ 8%" dark={false} /></div>
    <div className="mt-2 rounded-md border border-slate-200 bg-white p-2"><div className="flex justify-between text-[5px]"><b>Backlog trend</b><span className="text-emerald-600">80 → 20</span></div><div className="mt-1 h-[52px]"><Sparkline color="#6d5dfc" points="0,5 18,9 36,14 54,19 72,27 90,34 108,39 126,43" /></div></div>
    <div className="mt-2 rounded-md border border-slate-200 bg-white p-2 text-[5px]"><div className="grid grid-cols-[1fr_.6fr_.45fr] font-semibold text-slate-400"><span>Request</span><span>Owner</span><span>Status</span></div>{[["Access approval","S. Kim","Done"],["Device enrollment","M. Lee","Review"],["App request","A. Jones","Done"]].map(r=><div key={r[0]} className="mt-1.5 grid grid-cols-[1fr_.6fr_.45fr]"><span>{r[0]}</span><span className="text-slate-400">{r[1]}</span><span className="text-emerald-600">{r[2]}</span></div>)}</div>
  </LightShell>;
}

function RagPreview() {
  return <DarkShell name="RAGLab" section="Evaluation Overview" accent="#a855f7" nav={["Overview", "Datasets", "Experiments", "Models", "Settings"]}>
    <div className="grid grid-cols-4 gap-1.5"><Metric label="Faithfulness" value="94%" change="↗ 4%" /><Metric label="Recall@5" value="89%" change="↗ 7%" /><Metric label="Queries" value="1.8K" change="↗ 21%" /><Metric label="Latency" value="420ms" change="↘ 12%" /></div>
    <div className="mt-2 grid grid-cols-[1.25fr_.9fr] gap-2"><div className="rounded-md border border-white/[0.07] p-2"><p className="text-[5px] font-semibold">Retrieval quality</p><div className="mt-2 h-[68px]"><Sparkline color="#a855f7" points="0,39 18,31 36,34 54,20 72,25 90,12 108,17 126,5" /></div></div><div className="rounded-md border border-white/[0.07] p-2"><p className="text-[5px] font-semibold">Top sources</p>{[["docs/api.pdf","0.96"],["guide.md","0.91"],["notes.pdf","0.87"]].map(([x,v])=><div key={x} className="mt-2 rounded bg-white/[0.04] p-1.5 text-[4px]"><div className="flex justify-between"><span>{x}</span><span className="text-violet-400">{v}</span></div><div className="mt-1 h-0.5 rounded bg-violet-500/70" /></div>)}</div></div>
    <div className="mt-2 flex gap-1.5 text-[4px] text-slate-400"><span className="rounded border border-white/10 px-2 py-1">LLM-as-Judge</span><span className="rounded border border-white/10 px-2 py-1">RAGAS</span><span className="rounded border border-white/10 px-2 py-1">A/B Test</span></div>
  </DarkShell>;
}

function MicroservicesPreview() {
  return <LightShell name="UpCancer" section="Platform health">
    <div className="grid grid-cols-3 gap-1.5"><Metric label="Requests/min" value="2.4K" change="↑ 18%" dark={false} /><Metric label="P95 latency" value="86ms" change="↓ 12%" dark={false} /><Metric label="Availability" value="99.9%" change="Healthy" dark={false} /></div>
    <div className="mt-2 grid grid-cols-[1.2fr_.9fr] gap-2"><div className="rounded-md border border-slate-200 bg-white p-2"><p className="text-[5px] font-semibold">Service topology</p><div className="relative mt-2 h-[72px]"><div className="absolute left-[36%] top-[28%] rounded bg-indigo-600 px-2 py-1.5 text-[5px] text-white">API</div>{[["Auth","2%","left-0 top-0"],["Patient","8%","right-0 top-0"],["Redis","4%","left-0 bottom-0"],["Postgres","6%","right-0 bottom-0"]].map(([x,v,pos])=><div key={x} className={cn("absolute rounded border border-indigo-100 bg-indigo-50 px-2 py-1 text-[4px] text-indigo-700",pos)}>{x}<br/><b>{v}</b></div>)}</div></div><div className="rounded-md border border-slate-200 bg-white p-2"><p className="text-[5px] font-semibold">Traffic</p><div className="mt-2 h-[66px]"><Sparkline color="#4968ed" /></div><p className="text-[4px] text-slate-400">Stable across 6 services</p></div></div>
    <div className="mt-2 flex justify-between rounded-md border border-emerald-100 bg-emerald-50 p-2 text-[5px]"><span>All systems operational</span><b className="text-emerald-600">6 / 6</b></div>
  </LightShell>;
}

function WebPreview() {
  return <LightShell name="TrueSpice" section="Website performance">
    <div className="grid grid-cols-4 gap-1.5"><Metric label="Performance" value="98" change="Good" dark={false} /><Metric label="Accessibility" value="100" change="Passed" dark={false} /><Metric label="SEO" value="96" change="↑ 4" dark={false} /><Metric label="Visitors" value="8.2K" change="↑ 18%" dark={false} /></div>
    <div className="mt-2 grid grid-cols-[1.25fr_.8fr] gap-2"><div className="rounded-md border border-slate-200 bg-white p-2"><div className="flex justify-between text-[5px]"><b>Page traffic</b><span className="text-orange-500">Last 30 days</span></div><div className="mt-2 h-[70px]"><Sparkline color="#f97316" points="0,40 18,35 36,36 54,25 72,29 90,14 108,20 126,6" /></div></div><div className="rounded-md border border-slate-200 bg-white p-2"><p className="text-[5px] font-semibold">Core Web Vitals</p>{[["LCP","1.2s","w-[88%]"],["INP","84ms","w-[94%]"],["CLS","0.02","w-[98%]"]].map(([x,v,w])=><div key={x} className="mt-2 text-[4px]"><div className="flex justify-between"><span>{x}</span><b className="text-emerald-600">{v}</b></div><div className="mt-1 h-1 rounded bg-slate-100"><div className={cn("h-full rounded bg-orange-400",w)} /></div></div>)}</div></div>
    <div className="mt-2 rounded-md bg-gradient-to-r from-orange-500 to-amber-400 px-3 py-2 text-white"><p className="text-[6px] font-bold">Fast, accessible, search-ready.</p><p className="mt-0.5 text-[4px] text-white/80">Optimized experience across every device.</p></div>
  </LightShell>;
}

const previews: Record<string, () => ReactNode> = { devdash: DevDashPreview, "ai-security-camera-investigator": CameraPreview, "sentinel-ingestion": SentinelPreview, "servicenow-itsm": ItsmPreview, "headstarter-rag": RagPreview, "upcancer-microservices": MicroservicesPreview, "truespice-web": WebPreview };

export function ProjectVisual({
  slug,
  imageUrl,
  imageAlt,
  className,
}: {
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
}) {
  if (imageUrl) {
    return (
      <div className={cn("relative overflow-hidden bg-[#08111c]", className)}>
        <Image
          src={imageUrl}
          alt={imageAlt ?? `${slug} project dashboard`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="media-zoom object-cover object-center"
        />
      </div>
    );
  }

  const Preview = previews[slug] ?? DevDashPreview;
  return <div className={cn("relative overflow-hidden", className)} aria-hidden><div className="media-zoom absolute inset-0"><Preview /></div></div>;
}
