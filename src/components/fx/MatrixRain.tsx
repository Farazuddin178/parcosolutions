"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789<>/{}[]=+*";

/**
 * "Digital rain" canvas. Runs at ~24fps, pauses when off-screen or when the
 * tab is hidden, and renders a single still frame under reduced motion.
 */
export function MatrixRain({ className = "", fontSize = 16 }: { className?: string; fontSize?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(width / fontSize);
      drops = Array.from({ length: cols }, () => Math.floor(((Math.random() * 1.6 - 0.6) * height) / fontSize));
      ctx.font = `${fontSize}px ui-monospace, monospace`;
    };

    const step = () => {
      // translucent wipe leaves fading trails
      ctx.fillStyle = "rgba(2, 5, 3, 0.12)";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * fontSize;
        if (y > 0) {
          const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          // bright head, green body
          ctx.fillStyle = Math.random() > 0.94 ? "#e4ffee" : "#39ff88";
          ctx.fillText(ch, i * fontSize, y);
        }
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || t - last < 42) return;
      last = t;
      step();
    };

    resize();
    if (reduce) {
      for (let i = 0; i < 80; i++) step();
      return;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const onVis = () => (visible = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [fontSize]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none block size-full ${className}`} />;
}
