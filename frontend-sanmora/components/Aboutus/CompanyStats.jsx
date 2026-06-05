"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './CompanyStats.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const statsData = [
  { value: 100, label: "Projects Delivered" },
  { value: 50, label: "Happy Clients" },
  { value: 5, label: "Years Experience" },
  { value: 10, label: "Team Members" },
  { value: 15, label: "Countries Served" }
];

export default function CompanyStats() {
  const containerRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Header Animation
      gsap.fromTo(".cs-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.header}`,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Stats Stagger Fade Up
      gsap.fromTo(".cs-stat",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.statsRow}`,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Number Counter Animation
      numberRefs.current.forEach((el, index) => {
        if (!el) return;
        const targetValue = statsData[index].value;
        const proxy = { val: 0 };
        
        gsap.to(proxy, {
          val: targetValue,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.statsRow}`,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            el.innerText = Math.floor(proxy.val);
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <span className={`${styles.label} cs-header`}>OUR IMPACT</span>
          <h2 className={`${styles.headline} cs-header`}>
            Numbers That Reflect<br />Our Commitment.
          </h2>
          <p className={`${styles.subheadline} cs-header`}>
            Every project, partnership, and success story contributes to the growth of our clients and the strength of our digital expertise.
          </p>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          {statsData.map((stat, idx) => (
            <div key={idx} className={`${styles.statItem} cs-stat`}>
              <div className={styles.numberWrapper}>
                <span 
                  className={styles.number} 
                  ref={(el) => (numberRefs.current[idx] = el)}
                >
                  0
                </span>
                <span className={styles.plus}>+</span>
              </div>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
