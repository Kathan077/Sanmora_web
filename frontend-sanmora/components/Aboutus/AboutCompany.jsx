"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './AboutCompany.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutCompany() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-reveal",
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        
        {/* Left: Text Content */}
        <div className={styles.textContent}>
          <div className={`tech-reveal`} style={{ marginBottom: '2rem' }}>
            <img
              src="/logo/Samoa in vibrant gradient typography-BoK3SB3d.png"
              alt="Sanmora Technologies Logo"
              style={{ height: '45px', objectFit: 'contain' }}
            />
          </div>
          <h2 className={`${styles.heading} tech-reveal`}>
            Engineering at the core.
          </h2>
          <p className={`${styles.description} tech-reveal`}>
            We are a collective of hardcore engineers and technical architects dedicated to solving complex enterprise problems. Unlike traditional agencies, we treat every project like a scalable software product—building robust ecosystems from the ground up with precision and clean architecture.
          </p>
          
          <div className={`${styles.metricsGrid} tech-reveal`}>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>100%</div>
              <div className={styles.metricLabel}>Code Ownership</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>0</div>
              <div className={styles.metricLabel}>Legacy Debt</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>24/7</div>
              <div className={styles.metricLabel}>System Reliability</div>
            </div>
          </div>
        </div>

        {/* Right: Technical Grid */}
        <div className={styles.techGrid}>
          <div className={`${styles.techCard} tech-reveal`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardId}>01 //</span>
              <h3 className={styles.cardTitle}>Agile Execution</h3>
            </div>
            <p className={styles.cardDesc}>
              Rapid iterative cycles with transparent communication. We deploy early and often, adapting to business needs in real-time without compromising on code quality.
            </p>
          </div>

          <div className={`${styles.techCard} tech-reveal`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardId}>02 //</span>
              <h3 className={styles.cardTitle}>Scalable Architecture</h3>
            </div>
            <p className={styles.cardDesc}>
              Microservices, cloud-native infrastructure, and event-driven patterns. We build systems designed to handle millions of requests flawlessly.
            </p>
          </div>

          <div className={`${styles.techCard} tech-reveal`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardId}>03 //</span>
              <h3 className={styles.cardTitle}>Developer Experience</h3>
            </div>
            <p className={styles.cardDesc}>
              We prioritize CI/CD pipelines, strict typing, and comprehensive documentation so your internal teams can inherit and scale our codebases effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
