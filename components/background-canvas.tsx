"use client";

import { useEffect, useRef } from "react";
import {
  isMotionPaused,
  MOTION_EVENT,
  MOTION_STORAGE_KEY,
} from "@/lib/motion";

type PlexusNode = {
  /** Normalized x coordinate in [0, 1] so resize preserves layout */
  nx: number;
  /** Normalized y coordinate in [0, 1] */
  ny: number;
  /** Velocity in CSS pixels per second */
  vx: number;
  vy: number;
  /** Node radius in CSS pixels */
  radius: number;
  /** Whether this node renders an outer hub ring */
  isHub: boolean;
};

function createNodes(count: number): PlexusNode[] {
  const nodes: PlexusNode[] = [];
  // Deterministic-ish seeded distribution mixed with jitter so the field is balanced
  for (let i = 0; i < count; i++) {
    const angle = i * 2.399963229728653; // golden angle
    const r = Math.sqrt((i + 0.5) / count) * 0.48;
    const baseNx = 0.5 + Math.cos(angle) * r;
    const baseNy = 0.5 + Math.sin(angle) * r;

    const nx = Math.min(0.98, Math.max(0.02, baseNx + (Math.random() - 0.5) * 0.14));
    const ny = Math.min(0.98, Math.max(0.02, baseNy + (Math.random() - 0.5) * 0.14));

    const speed = 10 + Math.random() * 16; // slow drifting: 10–26 px/s
    const dir = Math.random() * Math.PI * 2;

    nodes.push({
      nx,
      ny,
      vx: Math.cos(dir) * speed,
      vy: Math.sin(dir) * speed,
      radius: i % 6 === 0 ? 2.4 : 1.35 + (i % 3) * 0.35,
      isHub: i % 7 === 0,
    });
  }
  return nodes;
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const host = canvas.parentElement;

    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const desiredNodeCount = (w: number, h: number) => {
      const area = w * h;
      const estimated = Math.round(area / 22000);
      return Math.max(50, Math.min(80, estimated));
    };

    let nodes: PlexusNode[] = createNodes(desiredNodeCount(cssWidth, cssHeight));

    let raf = 0;
    let lastTime = performance.now();
    let paused = isMotionPaused() || document.hidden;
    let disposed = false;

    const pointer = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };

    const applySize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      cssWidth = rect.width;
      cssHeight = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      const targetCount = desiredNodeCount(cssWidth, cssHeight);
      if (Math.abs(nodes.length - targetCount) > 10) {
        nodes = createNodes(targetCount);
      }

      const pixelWidth = Math.max(1, Math.round(cssWidth * dpr));
      const pixelHeight = Math.max(1, Math.round(cssHeight * dpr));

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
    };

    const renderFrame = (dt: number) => {
      if (cssWidth === 0 || cssHeight === 0) return;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Deep Midnight Blue #153c59 base with subtle radial depth vignette
      ctx.fillStyle = "#153c59";
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      const vignette = ctx.createRadialGradient(
        cssWidth * 0.5,
        cssHeight * 0.45,
        Math.min(cssWidth, cssHeight) * 0.1,
        cssWidth * 0.5,
        cssHeight * 0.5,
        Math.max(cssWidth, cssHeight) * 0.78,
      );
      vignette.addColorStop(0, "rgba(21, 60, 89, 0)");
      vignette.addColorStop(1, "rgba(10, 33, 50, 0.65)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // Smooth pointer damping
      if (pointer.active) {
        if (pointer.x < -1000) {
          pointer.x = pointer.targetX;
          pointer.y = pointer.targetY;
        } else {
          pointer.x += (pointer.targetX - pointer.x) * 0.14;
          pointer.y += (pointer.targetY - pointer.y) * 0.14;
        }
      }

      const count = nodes.length;
      const mobile = cssWidth < 768;
      const maxLinkDist = mobile ? 128 : 162;
      const maxLinkDistSq = maxLinkDist * maxLinkDist;
      const mouseLinkDist = mobile ? 140 : 185;
      const mouseLinkDistSq = mouseLinkDist * mouseLinkDist;
      const repulsionDist = 115;
      const repulsionDistSq = repulsionDist * repulsionDist;

      // 2. Update node positions (frozen when prefers-reduced-motion or paused)
      if (dt > 0) {
        for (let i = 0; i < count; i++) {
          const node = nodes[i];
          let px = node.nx * cssWidth + node.vx * dt;
          let py = node.ny * cssHeight + node.vy * dt;

          // Subtle repulsive force from cursor
          if (pointer.active) {
            const dx = px - pointer.x;
            const dy = py - pointer.y;
            const dSq = dx * dx + dy * dy;
            if (dSq > 1 && dSq < repulsionDistSq) {
              const d = Math.sqrt(dSq);
              const push = (1 - d / repulsionDist) * 28 * dt;
              px += (dx / d) * push;
              py += (dy / d) * push;
            }
          }

          // Soft boundary bounce
          if (px <= 12) {
            px = 12;
            node.vx = Math.abs(node.vx);
          } else if (px >= cssWidth - 12) {
            px = cssWidth - 12;
            node.vx = -Math.abs(node.vx);
          }

          if (py <= 12) {
            py = 12;
            node.vy = Math.abs(node.vy);
          } else if (py >= cssHeight - 12) {
            py = cssHeight - 12;
            node.vy = -Math.abs(node.vy);
          }

          node.nx = px / cssWidth;
          node.ny = py / cssHeight;
        }
      }

      // 3. Render dynamic distance-based tessellation lines in #f5b419
      ctx.lineWidth = 0.85;
      for (let i = 0; i < count; i++) {
        const a = nodes[i];
        const ax = a.nx * cssWidth;
        const ay = a.ny * cssHeight;

        for (let j = i + 1; j < count; j++) {
          const b = nodes[j];
          const bx = b.nx * cssWidth;
          const by = b.ny * cssHeight;

          const dx = ax - bx;
          const dy = ay - by;
          const dSq = dx * dx + dy * dy;

          if (dSq < maxLinkDistSq) {
            const dist = Math.sqrt(dSq);
            const proximity = 1 - dist / maxLinkDist;
            // Map alpha inversely to distance within secondary accent band (up to 0.55)
            const alpha = (0.08 + proximity * 0.48) * proximity;
            ctx.strokeStyle = `rgba(245, 180, 25, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }

        // 4. Interactive cursor constellation connection lines
        if (pointer.active) {
          const mdx = ax - pointer.x;
          const mdy = ay - pointer.y;
          const mdSq = mdx * mdx + mdy * mdy;
          if (mdSq < mouseLinkDistSq) {
            const mDist = Math.sqrt(mdSq);
            const mProx = 1 - mDist / mouseLinkDist;
            const mAlpha = 0.2 + mProx * 0.5; // 0.35–0.70 gold data lines near cursor
            ctx.strokeStyle = `rgba(245, 180, 25, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(ax, ay);
            ctx.stroke();
            ctx.lineWidth = 0.85;
          }
        }
      }

      // 5. Render circular vertices (#f5b419) & hub rings
      for (let i = 0; i < count; i++) {
        const node = nodes[i];
        const x = node.nx * cssWidth;
        const y = node.ny * cssHeight;

        if (node.isHub) {
          ctx.strokeStyle = "rgba(245, 180, 25, 0.35)";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(x, y, node.radius + 3.2, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = "rgba(245, 180, 25, 0.78)";
        ctx.beginPath();
        ctx.arc(x, y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      if (host && host.dataset.ready !== "true") {
        host.dataset.ready = "true";
      }
    };

    const tick = (now: number) => {
      if (disposed || paused) return;
      raf = requestAnimationFrame(tick);

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      renderFrame(dt);
    };

    const start = () => {
      if (raf || disposed) return;
      lastTime = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const syncMotion = () => {
      const nextPaused = isMotionPaused() || document.hidden;
      paused = nextPaused;
      if (paused) {
        stop();
        // Keep the static geometric constellation visible when reduced motion is active
        renderFrame(0);
      } else {
        start();
      }
    };

    // Throttled resize handler
    let resizeTimer: number | null = null;
    const onResize = () => {
      if (resizeTimer !== null) return;
      resizeTimer = window.setTimeout(() => {
        resizeTimer = null;
        applySize();
        renderFrame(0);
      }, 100);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === MOTION_STORAGE_KEY) syncMotion();
    };

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", syncMotion);
    window.addEventListener(MOTION_EVENT, syncMotion);
    window.addEventListener("storage", onStorage);
    reduceQuery.addEventListener("change", syncMotion);

    applySize();
    renderFrame(0);

    if (!paused) {
      start();
    }

    return () => {
      disposed = true;
      stop();
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", syncMotion);
      window.removeEventListener(MOTION_EVENT, syncMotion);
      window.removeEventListener("storage", onStorage);
      reduceQuery.removeEventListener("change", syncMotion);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="background-canvas"
      aria-hidden="true"
    />
  );
}

