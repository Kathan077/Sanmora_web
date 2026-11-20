"use client";
import React, { useEffect, useRef } from "react";
import styles from "./ParticleBackground.module.css";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId;
    let isRunning = true;

    const isMobile = W < 768;
    const count = isMobile ? 16 : 48; // High performance count
    const CONN = isMobile ? 70 : 120;
    const REPEL_R = isMobile ? 55 : 100;
    const REPEL_F = isMobile ? 2.0 : 3.0;

    // Particles array
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.4,
      dx: (Math.random() - 0.5) * (isMobile ? 0.22 : 0.32),
      dy: (Math.random() - 0.5) * (isMobile ? 0.22 : 0.32),
      ox: 0,
      oy: 0,
      opacity: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? 270 : 185,
    }));

    let mouseTicking = false;
    const onMouseMove = (e) => {
      if (!mouseTicking) {
        requestAnimationFrame(() => {
          mouseRef.current = { x: e.clientX, y: e.clientY };
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Pause when user scrolls deep or tab is inactive
    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animId = requestAnimationFrame(draw);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    function draw() {
      if (!isRunning) return;

      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;

      // Particle physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const ddx = mx - p.x;
        const ddy = my - p.y;
        const dist = Math.hypot(ddx, ddy);
        if (dist < REPEL_R && dist > 0) {
          const force = ((REPEL_R - dist) / REPEL_R) * REPEL_F;
          p.ox -= (ddx / dist) * force;
          p.oy -= (ddy / dist) * force;
        }
        p.ox *= 0.88;
        p.oy *= 0.88;
        p.x = ((p.x + p.dx + p.ox) % W + W) % W;
        p.y = ((p.y + p.dy + p.oy) % H + H) % H;
      }

      // Fast connections without creating CanvasGradient objects
      ctx.lineWidth = 0.65;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < CONN) {
            const alpha = (1 - d / CONN) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].hue === 270 
              ? `rgba(168, 85, 247, ${alpha})` 
              : `rgba(6, 182, 212, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Fast particles render without expensive shadowBlur
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const prox = Math.hypot(mx - p.x, my - p.y);
        const boost = prox < 120 ? 1 + (1 - prox / 120) * 1.3 : 1;

        // Outer glow halo (10x faster than shadowBlur)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.2 * boost, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 75%, 65%, ${p.opacity * 0.22 * boost})`;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * boost, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity * boost})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
