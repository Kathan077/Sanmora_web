"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Journey.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Journey() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered fade and slide up for bento boxes
      gsap.fromTo(
        ".gsap-bento-box",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Subtle float animations inside cards
      gsap.to(".gsap-float", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="journey">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.sparkle}>✦</span> 
            Our Engineering Process
          </h2>
          <p className={styles.subtitle}>
            A completely transparent, high-velocity methodology. We don&apos;t just build software, we architect digital ecosystems engineered for scale.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className={styles.bentoGrid}>
          
          {/* Box 1: Discovery (Large Wide) */}
          <div className={`${styles.bentoBox} ${styles.boxDiscovery} gsap-bento-box`}>
            <div className={styles.boxContent}>
              <div className={styles.stepBadge}>01</div>
              <h3 className={styles.boxTitle}>Discovery & Architecture</h3>
              <p className={styles.boxDesc}>
                We map your enterprise ecosystem, identify automation bottlenecks, and architect a scalable, future-proof blueprint.
              </p>
              
              <div className={styles.techStack}>
                <span className={styles.techBadge}>System Audits</span>
                <span className={styles.techBadge}>AI Strategy</span>
                <span className={styles.techBadge}>Prototyping</span>
              </div>
            </div>

            {/* Visual Flair for Box 1 */}
            <div className={styles.visualContainer1}>
              <div className={`${styles.glowingOrb} gsap-float`}></div>
              <div className={styles.glassLayer}></div>
            </div>
          </div>

          {/* Box 2: Engineering (Tall Vertical) */}
          <div className={`${styles.bentoBox} ${styles.boxEngineering} gsap-bento-box`}>
            <div className={styles.boxContent}>
              <div className={styles.stepBadge}>02</div>
              <h3 className={styles.boxTitle}>Agile Engineering</h3>
              <p className={styles.boxDesc}>
                Rapid, iterative development sprints leveraging edge computing and intelligent automation to build robust platforms.
              </p>
              
              <div className={styles.verticalTags}>
                <div className={styles.vTag}>
                  <div className={styles.dotCyan}></div> Cloud Native
                </div>
                <div className={styles.vTag}>
                  <div className={styles.dotPurple}></div> Machine Learning
                </div>
                <div className={styles.vTag}>
                  <div className={styles.dotPink}></div> API Ecosystems
                </div>
              </div>
            </div>

            {/* Visual Flair for Box 2 */}
            <div className={styles.visualContainer2}>
              <div className={styles.gridPattern}></div>
            </div>
          </div>

          {/* Box 3: Scale (Short Wide) */}
          <div className={`${styles.bentoBox} ${styles.boxScale} gsap-bento-box`}>
            <div className={styles.boxContent}>
              <div className={styles.stepBadge}>03</div>
              <div>
                <h3 className={styles.boxTitle}>Scale & Evolution</h3>
                <p className={styles.boxDesc}>
                  Seamless deployment followed by continuous optimization, performance monitoring, and adaptive scaling strategies.
                </p>
              </div>
            </div>

            {/* Visual Flair for Box 3 */}
            <div className={styles.visualContainer3}>
              <div className={styles.dashboardMock}>
                <div className={styles.dashBar} style={{ width: '85%' }}></div>
                <div className={styles.dashBar} style={{ width: '60%', background: '#a855f7' }}></div>
                <div className={styles.dashBar} style={{ width: '95%', background: '#ec4899' }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
