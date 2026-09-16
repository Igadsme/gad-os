"use client";

import { useEffect, useState } from "react";

export function SiteCursor() {
  const [visible, setVisible] = useState(false);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: MouseEvent) => {
      setPoint({ x: event.clientX, y: event.clientY });
      setVisible(true);
      const target = (event.target as HTMLElement).closest("a, button");
      setLabel(target ? target.getAttribute("data-cursor") ?? "Open" : "");
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      className={`site-cursor ${visible ? "site-cursor--visible" : ""} ${label ? "site-cursor--label" : ""}`}
      style={{ left: point.x, top: point.y }}
      aria-hidden="true"
    >
      {label || "·"}
    </div>
  );
}
