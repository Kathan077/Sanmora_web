"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './WhyChooseUs.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    id: "01",
    title: "Experienced Development & Marketing Team",
    desc: "Our multidisciplinary experts bring years of experience in website development, digital marketing, branding, and growth strategy."
  },
  {
    id: "02",
    title: "Custom Strategies for Every Business",
    desc: "Every solution is tailored to your goals, audience, and industry rather than relying on generic templates or one-size-fits-all approaches."
  },
  {
    id: "03",
    title: "Data-Driven Decision Making",
    desc: "We leverage analytics, customer insights, and performance metrics to guide every strategic decision and maximize outcomes."
  },
  {
    id: "04",
    title: "Modern Technologies & Best Practices",
    desc: "Using the latest tools, frameworks, and industry standards, we create future-ready digital experiences that scale with your business."
  },
  {
    id: "05",
    title: "Transparent Communication",
    desc: "Clear reporting, consistent updates, and collaborative workflows ensure complete visibility throughout every project."
  },
  {
    id: "06",
    title: "Focus on ROI & Business Growth",
    desc: "Our work is centered around generating measurable value, increasing conversions, and delivering sustainable business growth."
  },
  {
    id: "07",
    title: "Ongoing Support & Optimization",
    desc: "We continuously monitor, refine, and improve digital assets to ensure long-term success and peak performance."
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(".wcu-header-elem",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.header}`,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Timeline Items Animation
      const items = gsap.utils.toArray('.wcu-item');
      items.forEach((item, index) => {
        const textCol = item.querySelector('.wcu-text');
        const node = item.querySelector('.wcu-node');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });

        // Soft fade up for the text
        tl.fromTo(textCol,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        // Pop in the node circle
        if (node) {
          tl.fromTo(node,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.8"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <span className={`${styles.label} wcu-header-elem`}>WHY CHOOSE US</span>
          <h2 className={`${styles.headline} wcu-header-elem`}>Built for Growth. Designed for Results.</h2>
          <p className={`${styles.subheadline} wcu-header-elem`}>
            We combine strategy, creativity, and technology to help businesses scale faster, operate smarter, and achieve measurable digital success.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine}></div>
          
          {reasons.map((reason, idx) => (
            <div key={idx} className={`${styles.item} wcu-item`}>
              
              {/* Empty column to maintain the 50/50 split around the timeline */}
              <div className={styles.numberCol}></div>

              {/* Center node with gradient dot */}
              <div className={`${styles.node} wcu-node`}>
                <div className={styles.nodeDot}></div>
              </div>

              <div className={`${styles.textCol} wcu-text`}>
                <h3 className={styles.title}>{reason.title}</h3>
                <p className={styles.description}>{reason.desc}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
