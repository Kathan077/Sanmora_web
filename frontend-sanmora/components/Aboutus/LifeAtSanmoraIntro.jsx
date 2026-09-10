"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './LifeAtSanmoraIntro.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LifeAtSanmoraIntro() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".lsi-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef} id="life-at-sanmora-intro">
      {/* Ambient background glows */}
      <div className={styles.ambientOrb}></div>
      <div className={styles.ambientOrb2}></div>

      <div className={styles.container}>
        <div className={styles.contentBox}>
          
          {/* Sanmora Signature Badge */}
          <div className={`${styles.badge} lsi-reveal`}>
            <span className={styles.badgePulse}></span>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span className={styles.badgeText}>LIFE AT SANMORA</span>
          </div>

          {/* Heading */}
          <h2 className={`${styles.mainHeading} lsi-reveal`}>
            Vibrant Culture. <span className={styles.gradientText}>Extraordinary People.</span>
          </h2>

          {/* Authentic Text Paragraphs */}
          <p className={`${styles.paragraph} lsi-reveal`}>
            Life at Sanmora is supportive, collaborative, and deeply fulfilling. Our team thrives on strong mutual support, open communication, and an encouraging environment where everyone is helped to learn, solve complex engineering challenges, and grow together.
          </p>

          <p className={`${styles.paragraph} lsi-reveal`}>
            Work is balanced with fun! Every month, our team goes out for movie screenings, gourmet restaurant dinners, weekend trips, and joyful celebrations building lasting friendships while creating great products.
          </p>

          {/* Sanmora Signature Animated Button */}
          <div className={`${styles.btnWrapper} lsi-reveal`}>
            <Link href="/careers" className={styles.sanmoraPrimaryBtn}>
              <span className={styles.btnText}>WORK WITH US</span>
              <ArrowRight size={18} className={styles.btnIcon} />
              <div className={styles.btnShine} />
              <div className={styles.btnGlow} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
