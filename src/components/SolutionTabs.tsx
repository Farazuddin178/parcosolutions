"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Brain, ChartLineUp, Check, Cloud } from "@phosphor-icons/react";
import { solutions } from "@/content/site";

const ICONS = { cloud: Cloud, brain: Brain, chart: ChartLineUp } as const;

export function SolutionTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const current = solutions[active];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + solutions.length) % solutions.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-10">
      <div
        role="tablist"
        aria-label="Solutions"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
      >
        {solutions.map((s, i) => {
          const Glyph = ICONS[s.icon as keyof typeof ICONS] ?? Cloud;
          const selected = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={selected}
              aria-controls={`panel-${s.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex flex-none items-center gap-4 border px-5 py-4 text-left transition-colors ${
                selected
                  ? "border-signal/60 bg-signal/[0.08] text-bone"
                  : "border-line bg-coal/40 text-fog hover:border-ash hover:text-bone"
              }`}
            >
              <Glyph size={22} weight="duotone" className={selected ? "text-signal" : ""} aria-hidden />
              <span className="font-pixel text-xs uppercase tracking-wide">{s.name}</span>
            </button>
          );
        })}
      </div>

      <div className="frame min-h-[460px] p-5 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 xl:grid-cols-[1fr_1.05fr]"
          >
            <div className="duo brackets relative aspect-[16/10] border border-line xl:aspect-auto xl:min-h-[380px]">
              <Image src={current.image} alt={current.imageAlt} fill sizes="(min-width: 1280px) 440px, 100vw" className="object-cover" />
            </div>
            <div>
              <h3 className="font-display text-3xl text-bone">{current.name}</h3>
              <p className="mt-3 leading-relaxed text-fog">{current.body}</p>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {current.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px] text-bone/85">
                    <Check size={15} weight="bold" className="mt-1 flex-none text-signal" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
