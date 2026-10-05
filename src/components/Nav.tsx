"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { nav, services, site } from "@/content/site";

const linkCls =
  "font-pixel text-[11px] uppercase tracking-wider text-bone/85 transition-colors hover:text-signal";

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <Image src="/parco-mark.png" alt="" width={210} height={271} className="h-8 w-auto" priority />
      <span className={`font-pixel text-[11px] uppercase tracking-[0.14em] text-bone ${compact ? "" : "hidden xl:inline"}`}>
        Parco Solutions
      </span>
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  // Close menus on navigation.
  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  // Escape and outside click close the services dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(false), setMenu(false));
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock page scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-5">
      <nav
        aria-label="Main"
        className="mx-auto grid h-14 max-w-[1440px] grid-cols-[1fr_auto] items-center border border-line bg-coal/85 px-4 shadow-[0_10px_40px_rgb(0_0_0/0.45)] backdrop-blur-md lg:grid-cols-[1fr_auto_1fr] lg:px-5"
      >
        {/* Left: links (desktop) or brand (mobile) */}
        <div className="flex items-center gap-7">
          <div className="lg:hidden">
            <Brand compact />
          </div>
          <div ref={wrap} className="relative hidden lg:block" onMouseLeave={() => setOpen(false)}>
            <button
              type="button"
              className={`${linkCls} flex items-center gap-1.5 py-4`}
              aria-expanded={open}
              aria-controls="services-menu"
              onClick={() => setOpen((v) => !v)}
              onMouseEnter={() => setOpen(true)}
            >
              Services <CaretDown size={11} weight="bold" className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <div
              id="services-menu"
              className={`absolute left-0 top-full w-[420px] border border-line bg-coal/95 p-2 shadow-[0_24px_60px_rgb(0_0_0/0.55)] backdrop-blur-md transition-all duration-200 ${
                open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
              }`}
            >
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/service/${s.slug}/`}
                  className="group block px-4 py-3 transition-colors hover:bg-slate focus-visible:bg-slate"
                >
                  <span className="font-pixel text-[11px] uppercase tracking-wider text-bone group-hover:text-signal">
                    {s.name}
                  </span>
                  <span className="mt-1 block text-sm text-fog">{s.short}</span>
                </Link>
              ))}
            </div>
          </div>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={`${linkCls} hidden lg:inline`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Centre: brand (desktop) */}
        <div className="hidden lg:block">
          <Brand />
        </div>

        {/* Right */}
        <div className="flex items-center justify-end gap-5">
          <a href={site.phoneHref} className={`${linkCls} hidden xl:inline`}>
            {site.phone}
          </a>
          <Link href="/contact-us/" className="btn-pixel notch btn-primary hidden !py-2.5 sm:inline-flex">
            Start a project
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center text-bone lg:hidden"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        className={`mx-auto mt-2 max-h-[calc(100dvh-90px)] max-w-[1440px] overflow-y-auto border border-line bg-coal/97 p-5 backdrop-blur-md lg:hidden ${
          menu ? "block" : "hidden"
        }`}
      >
        <p className="font-pixel text-[10px] uppercase tracking-[0.18em] text-dim">Services</p>
        <ul className="mt-3 grid gap-1">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/service/${s.slug}/`} className="block py-2 text-lg text-bone">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="dash my-5" />
        <ul className="grid gap-1">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block py-2 text-lg text-bone">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-3">
          <Link href="/contact-us/" className="btn-pixel notch btn-primary">
            Start a project
          </Link>
          <a href={site.phoneHref} className="btn-pixel notch btn-ghost">
            Call {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
