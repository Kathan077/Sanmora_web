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


        <div className={styles.container}>
          {/* ── LEFT ── */}
          <div className={styles.content}>

            <div className={styles.anim2}>
              <h1 className={styles.heading}>
                SANMORA <span className={styles.highlight}>Web-Tech</span>
                <br />
                Web Development &
                <br />
                <span className={styles.gradientText}>Digital Marketing in Ahmedabad</span>
              </h1>
            </div>

            <div className={styles.anim3}>
              <p className={styles.subtext}>
                We are a premium digital marketing company and website development agency engineering high-performance digital ecosystems for modern enterprises. Our team specializes in custom full stack web applications, bespoke software development, performance SEO solutions, and data driven digital growth marketing services crafting flawless, lightning-fast platforms that dominate search rankings from our tech in Ahmedabad, Gujarat.              </p>
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
                width={420}
                height={420}
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