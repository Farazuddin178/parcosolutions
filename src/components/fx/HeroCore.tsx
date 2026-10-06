"use client";

import dynamic from "next/dynamic";

// Three.js is loaded only in the browser and after first paint, so the hero
// text is never blocked by the 3D bundle.
const DataCore = dynamic(() => import("./DataCore"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <span className="font-pixel text-[11px] uppercase tracking-[0.2em] text-signal/60">Loading core...</span>
    </div>
  ),
});

export function HeroCore() {
  return <DataCore />;
}
