"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Home_aboutus.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeAboutUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(
        ".gsap-fade-up",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".gsap-scale-in",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Central abstract object animation
      gsap.to(".gsap-spin-slow", {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "linear"
      });

      gsap.to(".gsap-float", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.aboutSection} id="who-we-are">
      {/* Background ambient elements synced with Hero section */}


      <div className={styles.mainWrapper}>

        {/* --- 1. THE DECORATIVE SHAPE (Banner + Cutouts) --- */}
        <div className={styles.bannerShape}></div>

        <div className={`${styles.cutout} ${styles.cutoutTopLeft}`}></div>
        <div className={`${styles.cutout} ${styles.cutoutTopRight}`}></div>
        <div className={`${styles.cutout} ${styles.cutoutBottomLeft}`}></div>

        {/* --- 2. THE CONTENT --- */}

        {/* Top Left Text */}
        <div className={`${styles.contentBox} ${styles.contentTopLeft}`}>
          <h2 className={`${styles.mainHeading} gsap-fade-up`}>
            WE BUILD DIGITAL EXPERIENCES
          </h2>
        </div>

        {/* Top Right Award */}
        <div className={`${styles.contentBox} ${styles.contentTopRight}`}>
          <div className={`${styles.reviewsWrapper} gsap-fade-up`}>
            <div className={styles.awardContainer}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#a855f7' }}>
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              <div className={styles.awardText}>
                <span className={styles.awardTitle}>AWARD WINNING</span>
                <span className={styles.awardSub}>DIGITAL AGENCY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Inner Content (Gets Purple gradient on mobile) */}
        <div className={styles.bannerContent}>

          <div className={`${styles.leftTextGroup} gsap-fade-up`}>
            <div className={styles.featuresList}>
              <span className={styles.featurePill}>Website Development</span>
              <span className={styles.featurePill}>Digital Marketing</span>
              <span className={styles.featurePill}>Mobile App Development</span>
            </div>
          </div>

          {/* Central Graphic */}
          <div className={`${styles.centralGraphic} gsap-scale-in`}>
            <div className={`${styles.abstractShape} gsap-float`}>
              <div className={styles.glowingCore}></div>
              <div className={`${styles.orbitingRing1} gsap-spin-slow`}></div>
              <div className={`${styles.orbitingRing2} gsap-spin-slow`} style={{ animationDirection: 'reverse' }}></div>

              <div className={styles.floatingTag1}>End-to-End Encrypted</div>
              <div className={styles.floatingTag2}>SSR Optimized</div>
            </div>
          </div>

          <div className={`${styles.rightTextGroup} gsap-fade-up`}>
            <div className={styles.glassCard}>
              <div className={styles.glassIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
                </svg>
              </div>
              <h3 className={styles.glassTitle}>VISUAL INNOVATION</h3>
              <ul className={styles.glassList}>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Frictionless User Journeys
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Accessible & Inclusive Patterns
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Behavioral Analytics Integration
                </li>
              </ul>
            </div>
          </div>

          <a href="#contact" className={`${styles.shopNowBtn} gsap-fade-up`}>WORK WITH US</a>

        </div>

        {/* Bottom Left Info */}
        <div className={`${styles.contentBox} ${styles.contentBottomLeft}`}>
          <div className={`${styles.bottomInfo} gsap-fade-up`}>
            <div className={styles.creativeAccent}></div>
            <h4 className={styles.companyName}>Our Philosophy</h4>
            <p className={styles.companyDesc}>
              Blending avant garde design with engineering excellence. Every line of code and pixel we craft pushes boundaries to elevate your digital presence.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
