"use client";

import { useEffect, useRef } from "react";

const COMMANDS = [
  "parco build --type=management-system --client=legal",
  "parco build --type=website --client=hospital",
  "parco deploy --secure --backups=daily",
  "parco build --type=custom-app --mobile=android,ios",
];

/** A terminal prompt that types, pauses and erases commands in a loop. */
export function TypeLoop({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = COMMANDS[0];
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    let cmd = 0;
    let i = 0;
    let deleting = false;

    const tick = () => {
      const full = COMMANDS[cmd];
      i += deleting ? -1 : 1;
      el.textContent = full.slice(0, i);
      let wait = deleting ? 18 : 38 + Math.random() * 40;
      if (!deleting && i === full.length) {
        deleting = true;
        wait = 1800;
      } else if (deleting && i === 0) {
        deleting = false;
        cmd = (cmd + 1) % COMMANDS.length;
        wait = 400;
      }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className={`flex min-w-0 items-center gap-2 ${className}`} aria-hidden>
      <span className="text-signal-hi">$</span>
      <span ref={ref} className="truncate" />
      <span className="inline-block h-[1.1em] w-[0.55em] flex-none animate-pulse bg-signal" />
    </p>
  );
}
