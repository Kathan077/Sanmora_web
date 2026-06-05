"use client";
import React, { useEffect, useRef } from "react";
import styles from "./ParticleBackground.module.css";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId;

    const isMobile = W < 768;
    const count = isMobile ? 25 : 90;
    const CONN = isMobile ? 80 : 130;
    const REPEL_R = isMobile ? 60 : 110;
    const REPEL_F = isMobile ? 2.5 : 3.5;

    // Particles array
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.38),
      dy: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.38),
      ox: 0,
      oy: 0,
      opacity: Math.random() * 0.55 + 0.2,
      hue: Math.random() > 0.5 ? 270 : 185,
    }));

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;

      // Particle physics
      particles.forEach((p) => {
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
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < CONN) {
            const alpha = (1 - d / CONN) * 0.2;
            const grad = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            grad.addColorStop(0, `hsla(${particles[i].hue},75%,65%,${alpha})`);
            grad.addColorStop(1, `hsla(${particles[j].hue},75%,65%,${alpha})`);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw Particles
      particles.forEach((p) => {
        const prox = Math.hypot(mx - p.x, my - p.y);
        const boost = prox < 140 ? 1 + (1 - prox / 140) * 1.4 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * boost, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},75%,65%,${p.opacity * boost})`;
        ctx.shadowBlur = 8 * boost;
        ctx.shadowColor = `hsla(${p.hue},80%,65%,0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
