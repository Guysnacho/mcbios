"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

/** Decorative animated double helix behind the page. Static when reduced motion is requested. */
export function HelixBackground() {
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

    const TURNS = 5; // helix twists per screen height
    const particles = Array.from({ length: 28 }, () => ({
      t: Math.random(),
      strand: Math.random() < 0.5 ? 1 : -1,
      speed: 0.0004 + Math.random() * 0.0006,
      size: 2 + Math.random() * 3,
      opacity: 0.4 + Math.random() * 0.5,
    }));

    // Slow, wide S-curve that both strands wrap around. The amplitude exceeds
    // half the width so it sweeps off the edges and back.
    const centerAt = (t: number, w: number, h: number): Point => ({
      x:
        w * 0.5 +
        w * 0.55 * Math.sin(t * Math.PI * 2 * 0.9 + step * 0.5) +
        w * 0.08 * Math.sin(t * Math.PI * 2 * 1.7 - step * 0.7 + 1.3),
      y: h * (-0.05 + 1.1 * t),
    });

    // strand = 1 or -1: the two strands are half a turn apart.
    const strandAt = (t: number, strand: number, w: number, h: number) => {
      const c = centerAt(t, w, h);
      const radius = Math.min(w * 0.07, 80);
      const twist = Math.sin(t * Math.PI * 2 * TURNS - step * 2);
      return { x: c.x + strand * radius * twist, y: c.y };
    };

    const trace = (pts: Point[]) => {
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    };

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const SAMPLES = 240;
      const sample = (strand: number) =>
        Array.from({ length: SAMPLES + 1 }, (_, i) =>
          strandAt(i / SAMPLES, strand, w, h),
        );
      const a = sample(1);
      const b = sample(-1);

      // Base-pair rungs between the strands.
      const RUNGS = 70;
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(136, 190, 65, 0.35)";
      for (let i = 0; i <= RUNGS; i++) {
        const t = i / RUNGS;
        const p = strandAt(t, 1, w, h);
        const q = strandAt(t, -1, w, h);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }

      const strokeStrand = (pts: Point[], core: string) => {
        trace(pts);
        ctx.lineWidth = 44;
        ctx.strokeStyle = "rgba(136, 190, 65, 0.12)";
        ctx.stroke();
        trace(pts);
        ctx.lineWidth = 26;
        ctx.strokeStyle = "rgba(64, 127, 191, 0.35)";
        ctx.stroke();
        trace(pts);
        ctx.lineWidth = 12;
        ctx.strokeStyle = core;
        ctx.stroke();
      };

      strokeStrand(a, "rgba(255, 42, 95, 0.6)");
      strokeStrand(b, "rgba(115, 103, 203, 0.8)");

      particles.forEach((p) => {
        if (!reduceMotion) p.t = (p.t + p.speed) % 1;
        const pos = strandAt(p.t, p.strand, w, h);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
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
