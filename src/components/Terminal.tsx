"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { buildServices, site, work } from "@/content/site";

type Line = { kind: "in" | "out"; body: ReactNode };

const linkCls = "text-signal underline underline-offset-4 hover:text-signal-hi";

const COMMANDS: Record<string, { help: string; run: () => ReactNode }> = {
  help: {
    help: "list commands",
    run: () => (
      <ul className="grid gap-0.5">
        {Object.entries(COMMANDS).map(([name, c]) => (
          <li key={name}>
            <span className="inline-block w-24 text-signal">{name}</span>
            {c.help}
          </li>
        ))}
      </ul>
    ),
  },
  about: {
    help: "who we are",
    run: () => site.description,
  },
  services: {
    help: "what we build",
    run: () => (
      <ul className="grid gap-0.5">
        {buildServices.map((s) => (
          <li key={s.slug}>
            <span className="text-dim">-</span>{" "}
            <Link href={`/service/${s.slug}/`} className={linkCls}>
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    ),
  },
  work: {
    help: "recent client projects",
    run: () => (
      <ul className="grid gap-0.5">
        {work.map((w) => (
          <li key={w.slug}>
            <span className="text-signal">{w.client}</span> <span className="text-dim">{"//"}</span>{" "}
            {w.deliverables.join(", ")}
          </li>
        ))}
      </ul>
    ),
  },
  contact: {
    help: "how to reach us",
    run: () => (
      <span>
        <a href={site.phoneHref} className={linkCls}>
          {site.phone}
        </a>{" "}
        <span className="text-dim">|</span>{" "}
        <a href={`mailto:${site.email}`} className={linkCls}>
          {site.email}
        </a>{" "}
        <span className="text-dim">|</span>{" "}
        <Link href="/contact-us/" className={linkCls}>
          start a project
        </Link>
      </span>
    ),
  },
  clear: { help: "clear the screen", run: () => null },
};

const SUGGESTIONS = ["help", "services", "work", "contact"];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", body: "Parco Solutions terminal. Type help and press Enter, or tap a command below." },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const screen = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    screen.current?.scrollTo({ top: screen.current.scrollHeight });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 20));
    setCursor(-1);
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const entry = COMMANDS[cmd];
    setLines((l) => [
      ...l,
      { kind: "in", body: cmd },
      { kind: "out", body: entry ? entry.run() : `command not found: ${cmd}. Try help.` },
    ]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(value);
    setValue("");
  }

  return (
    <div className="notch overflow-hidden bg-[#010402] shadow-[inset_0_0_0_1px_rgb(57_255_136/0.25),0_0_40px_rgb(57_255_136/0.08)]">
      <div className="flex items-center gap-2 border-b border-signal/20 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f56]" />
        <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="size-2.5 rounded-full bg-signal" />
        <span className="ml-3 font-pixel text-[11px] text-dim">guest@parco: ~</span>
      </div>

      <div
        ref={screen}
        className="h-56 overflow-y-auto px-4 py-3 font-pixel text-[13px] leading-relaxed text-bone/90"
        onClick={() => input.current?.focus()}
        role="log"
        aria-live="polite"
      >
        {lines.map((line, i) =>
          line.kind === "in" ? (
            <p key={i} className="mt-2 text-signal-hi">
              <span className="text-signal">guest@parco:~$</span> {line.body}
            </p>
          ) : (
            <div key={i} className="text-fog">
              {line.body}
            </div>
          ),
        )}
        <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
          <label htmlFor="term-input" className="flex-none text-signal">
            guest@parco:~$
          </label>
          <input
            id="term-input"
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && history.length) {
                e.preventDefault();
                const next = Math.min(cursor + 1, history.length - 1);
                setCursor(next);
                setValue(history[next]);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = cursor - 1;
                setCursor(next);
                setValue(next >= 0 ? history[next] : "");
              }
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal command"
            className="min-w-0 flex-1 bg-transparent text-signal-hi caret-signal outline-none"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-signal/15 px-4 py-3">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => run(s)}
            className="border border-signal/30 px-2.5 py-1 font-pixel text-[11px] text-signal transition-colors hover:bg-signal hover:text-ink"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
