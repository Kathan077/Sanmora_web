"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './AboutServices.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "Enterprise Engineering",
    description: "We create efficient and scalable architectures to maximize the use of technology and ensure robust performance."
  },
  {
    title: "UI/UX Design",
    description: "From concept development to final implementation, we handle all aspects of user experience and visual design."
  },
  {
    title: "Cloud Architecture",
    description: "We design and craft unique cloud infrastructure tailored to specific client needs, creating powerful systems."
  },
  {
    title: "Project Management",
    description: "We oversee the entire development process, ensuring projects are completed on time and within budget."
  }
];

export default function AboutServices() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".stagger-reveal",
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      {/* Decorative Glowing Orb */}
      <div className={styles.glowingOrb}></div>

      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={`${styles.header} stagger-reveal`}>
          <div className={styles.badge}>
            <svg viewBox="0 0 24 24" fill="none" className={styles.badgeIcon}>
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>SANMORA TECHNOLOGIES</span>
          </div>
          <h2 className={styles.heading}>
            Our core <span className={styles.highlight}>services</span> for you.
          </h2>
          <p className={styles.description}>
            Get expert guidance powered by our elite team specializing in Enterprise, Design, and Cloud architecture. Choose the service that suits your needs.
          </p>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={`${styles.card} stagger-reveal`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <div className={styles.iconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <p className={styles.cardDesc}>{service.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
