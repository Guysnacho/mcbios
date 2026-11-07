"use client";

import { useEffect, useRef } from "react";

/** Decorative animated "vein" behind the page. Static when reduced motion is requested. */
export function VeinBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let step = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 28 }, () => ({
      t: Math.random(),
      speed: 0.0004 + Math.random() * 0.0006,
      offset: (Math.random() - 0.5) * 24,
      size: 2 + Math.random() * 3,
      opacity: 0.4 + Math.random() * 0.5,
    }));

    // A smooth, meandering path: layered sine waves give long lazy bends
    // plus a tighter secondary wiggle, with slight horizontal drift of the
    // path in y so the bends feel organic rather than mechanical.
    const pointAt = (t: number, w: number, h: number) => {
      // Slow, wide S-curve (about one bend per screen height). The amplitude
      // exceeds half the width so it sweeps off the edges and back.
      const x =
        w * 0.5 +
        w * 0.55 * Math.sin(t * Math.PI * 2 * 0.9 + step * 0.5) +
        w * 0.08 * Math.sin(t * Math.PI * 2 * 1.7 - step * 0.7 + 1.3);
      const y = h * (-0.05 + 1.1 * t);
      return { x, y };
    };

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      const SAMPLES = 160;
      const spine = Array.from({ length: SAMPLES + 1 }, (_, i) =>
        pointAt(i / SAMPLES, w, h),
      );

      const stroke = (width: number, color: string) => {
        ctx.beginPath();
        spine.forEach((p, i) =>
          i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y),
        );
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = color;
        ctx.stroke();
      };

      stroke(95, "rgba(136, 190, 65, 0.12)");
      stroke(55, "rgba(64, 127, 191, 0.35)");
      stroke(24, "rgba(255, 42, 95, 0.6)");
      stroke(6, "rgba(115, 103, 203, 0.8)");

      particles.forEach((p) => {
        if (!reduceMotion) p.t = (p.t + p.speed) % 1;
        const a = pointAt(p.t, w, h);
        const b = pointAt(Math.min(p.t + 0.01, 1), w, h);
        const angle = Math.atan2(b.y - a.y, b.x - a.x) + Math.PI / 2;
        ctx.beginPath();
        ctx.arc(
          a.x + Math.cos(angle) * p.offset,
          a.y + Math.sin(angle) * p.offset,
          p.size,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(136, 190, 65, ${p.opacity})`;
        ctx.fill();
      });
    };

    const loop = () => {
      step += 0.006;
      draw();
      frame = requestAnimationFrame(loop);
    };

    if (reduceMotion) draw();
    else loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 size-full opacity-70"
    />
  );
}
