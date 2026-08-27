"use client";

import { cn } from "@/lib/utils";

export type AprilState = "idle" | "listening" | "thinking" | "responding";

export function AprilMark({
  size = 44,
  state = "idle",
  className,
}: {
  size?: number;
  state?: AprilState;
  className?: string;
}) {
  const eyeShift =
    state === "thinking" ? "translate-x-[1px]" : state === "listening" ? "scale-110" : "";

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full april-glow",
        state === "thinking" && "animate-pulse",
        state === "responding" && "ring-2 ring-violet/40",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-[radial-gradient(circle_at_30%_28%,#c4b5fd,transparent_42%),radial-gradient(circle_at_70%_70%,#60a5fa,transparent_46%),linear-gradient(160deg,#312e81,#1d4ed8)]",
        )}
      />
      <span className="absolute inset-[18%] rounded-full bg-black/25" />
      <span
        className={cn(
          "relative flex items-center justify-center gap-[18%]",
          eyeShift,
        )}
        style={{ width: size * 0.46, height: size * 0.22 }}
      >
        <span
          className={cn(
            "h-full w-[28%] rounded-full bg-[#e0f2fe] shadow-[0_0_8px_#93c5fd]",
            state === "listening" && "opacity-100",
            state === "idle" && "opacity-90",
          )}
        />
        <span className="h-full w-[28%] rounded-full bg-[#e0f2fe] shadow-[0_0_8px_#93c5fd]" />
      </span>
    </span>
  );
}
