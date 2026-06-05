"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './WhyClientsChooseUs.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    id: "01",
    title: "Custom Solutions",
    desc: "Every business is unique. We create tailored strategies, websites, and marketing solutions designed around your goals, audience, and growth objectives."
  },
  {
    id: "02",
    title: "Data-Driven Strategies",
    desc: "Our decisions are guided by analytics, performance insights, and real-world data to ensure measurable results and continuous improvement."
  },
  {
    id: "03",
    title: "Transparent Communication",
    desc: "From project planning to final delivery, we maintain clear communication, detailed reporting, and complete visibility throughout the process."
  },
  {
    id: "04",
    title: "Dedicated Support",
    desc: "Our team remains available beyond launch, providing ongoing assistance, optimization, and technical support whenever you need it."
  },
  {
    id: "05",
    title: "Focus on ROI",
    desc: "Everything we build and execute is designed to generate measurable business value, increase conversions, and maximize return on investment."
  }
];

export default function WhyClientsChooseUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Header Text Fade Up
      gsap.fromTo(".wccu-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.leftCol}`,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Reasons Stagger Fade Up
      const items = gsap.utils.toArray('.wccu-item');
      items.forEach((item) => {
        const textElements = item.querySelectorAll('.wccu-text');
        const divider = item.querySelector(`.${styles.divider}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });

        // Fade up text
        tl.fromTo(textElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );

        // Expand the subtle divider line
        if (divider) {
          tl.to(divider, { scaleX: 1, duration: 1, ease: "power3.inOut" }, "-=0.6");
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        
        {/* Left Sticky Header */}
        <div className={styles.leftCol}>
          <span className={`${styles.label} wccu-header`}>WHY CLIENTS CHOOSE US</span>
          <h2 className={`${styles.headline} wccu-header`}>
            The Difference Behind<br />Every Successful Project.
          </h2>
          <p className={`${styles.subheadline} wccu-header`}>
            We combine strategy, innovation, and execution to deliver solutions that create lasting business impact.
          </p>
        </div>

        {/* Right Scrolling Content */}
        <div className={styles.rightCol}>
          {reasons.map((reason, idx) => (
            <div key={idx} className={`${styles.reasonItem} wccu-item`}>
              
              <div className={`${styles.numberWrapper} wccu-text`}>
                <span className={styles.number}>{reason.id}</span>
              </div>
              
              <h3 className={`${styles.title} wccu-text`}>{reason.title}</h3>
              <p className={`${styles.description} wccu-text`}>{reason.desc}</p>

              {/* Animated expansion line */}
              <div className={styles.divider}></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
