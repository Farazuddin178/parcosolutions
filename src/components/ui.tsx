import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function Lamp() {
  return (
    <span className="lamp" aria-hidden>
      <span className="lamp-glow" />
    </span>
  );
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/** Section divider: lamp, dashed rule, gem, numbered title, gem, dashed rule, lamp. */
export function Divider({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-end gap-3 overflow-x-clip sm:gap-5" role="presentation">
      <Lamp />
      <span className="dash mb-[9px] min-w-4 flex-1" />
      <span className="mb-[3px] flex items-center gap-3 font-pixel text-[11px] uppercase tracking-[0.18em] text-fog">
        <span className="gem" />
        <span className="whitespace-nowrap">
          {ROMAN[index - 1]} <span className="text-dim">/</span> {title}
        </span>
        <span className="gem" />
      </span>
      <span className="dash mb-[9px] min-w-4 flex-1" />
      <Lamp />
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="notch inline-block bg-signal/10 px-3 py-1.5 font-pixel text-[11px] uppercase tracking-wider text-signal shadow-[inset_0_0_0_1px_rgb(56_189_248/0.55)]">
      {children}
    </span>
  );
}

type ButtonProps = {
  href: string;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href">;

export function Button({ href, variant = "primary", arrow = false, children, className = "", ...rest }: ButtonProps) {
  const cls = `btn-pixel notch ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight size={14} weight="bold" aria-hidden />}
    </>
  );
  const external = /^(https?:|mailto:|tel:)/.test(href);
  return external ? (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

/** Framed duotone figure with corner brackets and a caption underneath. */
export function Figure({
  src,
  alt,
  caption,
  index,
  className = "",
  ratio = "aspect-[16/10]",
  priority = false,
  live = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  src: string;
  alt: string;
  caption?: string;
  index?: number;
  className?: string;
  ratio?: string;
  priority?: boolean;
  live?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={className}>
      <div className={`duo brackets ${live ? "duo-live" : ""} ${ratio} border border-line`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-3 font-pixel text-[10px] uppercase tracking-[0.16em] text-dim">
          {index ? `Fig. ${ROMAN[index - 1]} - ` : ""}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function SectionIntro({
  tag,
  title,
  body,
  as: As = "h2",
}: {
  tag?: string;
  title: string;
  body?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="max-w-3xl">
      {tag && (
        <div className="mb-6">
          <Tag>{tag}</Tag>
        </div>
      )}
      <As className="display-shadow font-display text-4xl leading-[1.05] tracking-tight text-bone sm:text-5xl lg:text-[3.4rem]">
        {title}
      </As>
      {body && <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-fog sm:text-xl">{body}</p>}
    </div>
  );
}
