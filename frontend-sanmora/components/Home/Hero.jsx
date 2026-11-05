"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Hero.module.css";
import heroImg from "./image (1).png";

/* ─── Main Hero ───────────────────────────────────────── */
export default function HeroSection() {
  const router = useRouter();

  return (
    <>
      <section className={styles.hero}>

        {/* ── Global Network Background with Subtle Ambient Node Glow ── */}
        <div className={styles.bgImage}>
          <svg
            viewBox="0 0 1024 392"
            preserveAspectRatio="xMidYMax slice"
            className={styles.ambientGlowSvg}
          >
            <defs>
              {/* Core luminous backdrop halo for smooth back-glow */}
              <radialGradient id="softBackdropGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.75" />
                <stop offset="55%" stopColor="#818cf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </radialGradient>

              {/* Wide ambient background glow aura */}
              <radialGradient id="wideAmbientGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="45%" stopColor="#6366f1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </radialGradient>

              {/* Optical Gaussian blur filters */}
              <filter id="softGlowBlur" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3.5" />
              </filter>
              <filter id="wideAuraBlur" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>

            {/* 1. Americas Node */}
            <g className={styles.nodeGroup}>
              <circle cx="439" cy="339" r="24" fill="url(#wideAmbientGlow)" filter="url(#wideAuraBlur)">
                <animate attributeName="r" values="18;28;18" dur="3.5s" repeatCount="indefinite" begin="0s" />
                <animate attributeName="opacity" values="0.35;0.75;0.35" dur="3.5s" repeatCount="indefinite" begin="0s" />
              </circle>
              <circle cx="439" cy="339" r="13" fill="url(#softBackdropGlow)" filter="url(#softGlowBlur)">
                <animate attributeName="r" values="9;15;9" dur="3.5s" repeatCount="indefinite" begin="0s" />
                <animate attributeName="opacity" values="0.45;0.9;0.45" dur="3.5s" repeatCount="indefinite" begin="0s" />
              </circle>
            </g>

            {/* 2. West Africa Node */}
            <g className={styles.nodeGroup}>
              <circle cx="558" cy="303" r="24" fill="url(#wideAmbientGlow)" filter="url(#wideAuraBlur)">
                <animate attributeName="r" values="18;28;18" dur="3.5s" repeatCount="indefinite" begin="0.8s" />
                <animate attributeName="opacity" values="0.35;0.75;0.35" dur="3.5s" repeatCount="indefinite" begin="0.8s" />
              </circle>
              <circle cx="558" cy="303" r="13" fill="url(#softBackdropGlow)" filter="url(#softGlowBlur)">
                <animate attributeName="r" values="9;15;9" dur="3.5s" repeatCount="indefinite" begin="0.8s" />
                <animate attributeName="opacity" values="0.45;0.9;0.45" dur="3.5s" repeatCount="indefinite" begin="0.8s" />
              </circle>
            </g>

            {/* 3. Africa Node (Under Bulb) */}
            <g className={styles.nodeGroup}>
              <circle cx="720" cy="327" r="28" fill="url(#wideAmbientGlow)" filter="url(#wideAuraBlur)">
                <animate attributeName="r" values="20;32;20" dur="3s" repeatCount="indefinite" begin="1.6s" />
                <animate attributeName="opacity" values="0.4;0.85;0.4" dur="3s" repeatCount="indefinite" begin="1.6s" />
              </circle>
              <circle cx="720" cy="327" r="15" fill="url(#softBackdropGlow)" filter="url(#softGlowBlur)">
                <animate attributeName="r" values="10;17;10" dur="3s" repeatCount="indefinite" begin="1.6s" />
                <animate attributeName="opacity" values="0.55;1;0.55" dur="3s" repeatCount="indefinite" begin="1.6s" />
              </circle>
            </g>

            {/* 4. India / Arabia Node */}
            <g className={styles.nodeGroup}>
              <circle cx="781" cy="341" r="26" fill="url(#wideAmbientGlow)" filter="url(#wideAuraBlur)">
                <animate attributeName="r" values="18;30;18" dur="3.2s" repeatCount="indefinite" begin="0.4s" />
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.2s" repeatCount="indefinite" begin="0.4s" />
              </circle>
              <circle cx="781" cy="341" r="14" fill="url(#softBackdropGlow)" filter="url(#softGlowBlur)">
                <animate attributeName="r" values="9;16;9" dur="3.2s" repeatCount="indefinite" begin="0.4s" />
                <animate attributeName="opacity" values="0.5;0.95;0.5" dur="3.2s" repeatCount="indefinite" begin="0.4s" />
              </circle>
            </g>

            {/* 5. East Asia Node */}
            <g className={styles.nodeGroup}>
              <circle cx="851" cy="325" r="24" fill="url(#wideAmbientGlow)" filter="url(#wideAuraBlur)">
                <animate attributeName="r" values="18;28;18" dur="3.5s" repeatCount="indefinite" begin="1.2s" />
                <animate attributeName="opacity" values="0.35;0.75;0.35" dur="3.5s" repeatCount="indefinite" begin="1.2s" />
              </circle>
              <circle cx="851" cy="325" r="13" fill="url(#softBackdropGlow)" filter="url(#softGlowBlur)">
                <animate attributeName="r" values="9;15;9" dur="3.5s" repeatCount="indefinite" begin="1.2s" />
                <animate attributeName="opacity" values="0.45;0.9;0.45" dur="3.5s" repeatCount="indefinite" begin="1.2s" />
              </circle>
            </g>
          </svg>
        </div>

        {/* ── Decorative Glass Crystal Balls — Light & Translucent ── */}
        {/* Top-left cluster */}
        <div className={styles.ball1} />
        <div className={styles.ball2} />
        {/* Bottom-right cluster */}
        <div className={styles.ball3} />
        <div className={styles.ball4} />
        {/* Extra balls scattered */}
        <div className={styles.ball5} />
        <div className={styles.ball6} />
        <div className={styles.ball7} />

        <div className={styles.container}>
          {/* ── LEFT ── */}
          <div className={styles.content}>

            <div className={styles.anim2}>
              <h1 className={styles.heading}>
                <span className={styles.brandTitle}>SANMORA</span>{" "}
                <span className={styles.gradientText}>AI-Powered</span>
                <br />
                <span className={styles.gradientText}>Digital Innovation in</span>
                <br />
                <span className={styles.gradientText}>India &amp; South Africa</span>
              </h1>
            </div>

            <div className={styles.anim3}>
              <p className={styles.subtext}>
               We are a premium technology and digital solutions company engineering high performance digital ecosystems for modern businesses. From custom websites, full stack applications, and bespoke software solutions to SEO, digital marketing, AI &amp; ML, automation, and cloud technologies, we deliver end to end solutions built around innovation, performance, and scalability. With a technology driven approach and global perspective, we transform complex business challenges into intelligent, scalable, and future ready digital experiences, with a strong presence through our branches in India and South Africa.
         </p>
            </div>

            <div className={styles.anim4}>
              <div className={styles.actions}>
                <button className={styles.primaryBtn} onClick={() => router.push("/consultation")}>
                  <span className={styles.btnText}>Speak With a Specialist</span>
                  <div className={styles.btnShine} />
                  <div className={styles.btnGlow} />
                </button>
                <button className={styles.secondaryBtn} onClick={() => router.push("/case-studies")}>
                  <span>See Our Work</span>
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className={styles.visual}>
            {/* Concentric rings */}
            <div className={styles.ring1} />
            <div className={styles.ring2} />
            <div className={styles.ring3} />
            <div className={styles.ring4} />

            {/* Image with aura */}
            <div className={styles.imageWrapper}>
              <div className={styles.aura} />
              <div className={styles.aura2} />
              <div className={styles.aura3} />
              <Image
                src={heroImg}
                alt="Tecno – lightbulb with business ideas"
                className={styles.heroImage}
                width={400}
                height={490}
                priority
              />
            </div>

            {/* Floating chips */}
            <div className={`${styles.chip} ${styles.chip1}`}>
              <span className={styles.chipDot} />
              <span>Dynamic Scalability</span>
            </div>
            <div className={`${styles.chip} ${styles.chip2}`}>
              <span className={styles.chipDot} style={{ background: "#06b6d4" }} />
              <span>10x Faster Development</span>
            </div>
            <div className={`${styles.chip} ${styles.chip3}`}>
              <span className={styles.chipDot} style={{ background: "#f59e0b" }} />
              <span>Industries Ready</span>
            </div>

            {/* Live badge */}
            <div className={styles.liveBadge}>
              <span className={styles.liveDot} />
              <span>Live Projects: 200+</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
