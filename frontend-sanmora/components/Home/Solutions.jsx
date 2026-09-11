"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Solutions.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const solutionsData = [
  {
    title: "SaaS Platforms",
    desc: "Design and build subscription-based platforms with structured workflows, user management, and reliable system architecture.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="gradSaas" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect x="2" y="3" width="20" height="13" rx="2.5" stroke="url(#gradSaas)" />
        <path d="M8 20h8M12 16v4" stroke="url(#gradSaas)" />
        <path d="M6 7.5h12M6 11.5h7" stroke="url(#gradSaas)" />
      </svg>
    ),
  },
  {
    title: "Marketplace Solutions",
    desc: "Develop multi-vendor platforms that connect users, manage transactions, and support smooth operational workflows.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="gradMarket" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle cx="9" cy="20" r="1.5" fill="url(#gradMarket)" stroke="none" />
        <circle cx="18" cy="20" r="1.5" fill="url(#gradMarket)" stroke="none" />
        <path d="M3 3h2l2.2 11.2a2 2 0 002 1.6h8.6a2 2 0 002-1.6L21 6H6" stroke="url(#gradMarket)" />
        <path d="M15 10a3 3 0 01-6 0" stroke="url(#gradMarket)" />
      </svg>
    ),
  },
  {
    title: "Business Systems",
    desc: "Build tailored systems that streamline operations, integrate processes, and support complex business requirements.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="gradBiz" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <rect x="2" y="4" width="20" height="16" rx="3" stroke="url(#gradBiz)" />
        <path d="M6 10h5M6 14h8" stroke="url(#gradBiz)" />
        <circle cx="16" cy="10" r="1.5" fill="url(#gradBiz)" stroke="none" />
      </svg>
    ),
  },
  {
    title: "AI & Automation Solutions",
    desc: "Implement intelligent workflows and automation to improve efficiency, reduce manual effort, and support better decision-making.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="gradAI" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="url(#gradAI)" />
        <circle cx="12" cy="12" r="5" stroke="url(#gradAI)" />
        <circle cx="12" cy="12" r="2" fill="url(#gradAI)" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Modernization & System Upgrades",
    desc: "Upgrade existing systems to improve performance, enhance usability, and align with modern technology standards.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="gradMod" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        <path d="M21 3v5h-5" stroke="url(#gradMod)" />
        <path d="M21 8A9 9 0 104.5 16.5" stroke="url(#gradMod)" />
        <path d="M12 8v4l3 3" stroke="url(#gradMod)" />
      </svg>
    ),
  },
  {
    title: "Data & Analytics Platforms",
    desc: "Create platforms that collect, process, and visualize data to support reporting, insights, and informed decision-making.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="gradData" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        <path d="M3 3v18h18" stroke="url(#gradData)" />
        <path d="M19 9l-5 5-4-4-4 4" stroke="url(#gradData)" />
        <circle cx="19" cy="9" r="2" fill="url(#gradData)" stroke="none" />
        <circle cx="14" cy="14" r="2" fill="url(#gradData)" stroke="none" />
        <circle cx="10" cy="10" r="2" fill="url(#gradData)" stroke="none" />
        <circle cx="6" cy="14" r="2" fill="url(#gradData)" stroke="none" />
      </svg>
    ),
  },
];

export default function Solutions() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in the header
      gsap.fromTo(
        ".gsap-solutions-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Stagger the grid items
      gsap.fromTo(
        ".gsap-solutions-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".gsap-solutions-grid",
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.section} id="solutions">
      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={`${styles.header} gsap-solutions-header`}>
          <h2 className={styles.title}>
            <span className={styles.titleText}>Solutions We Build</span>
          </h2>
          <p className={styles.subtitle}>
            We build solution-oriented digital systems that align with your business goals helping you create, improve, and evolve platforms that support real-world use and long-term growth.
          </p>
        </div>

        {/* The Glassmorphic Grid */}
        <div className={`${styles.gridContainer} gsap-solutions-grid`}>
          {solutionsData.map((item, idx) => (
            <div key={idx} className={`${styles.gridItem} gsap-solutions-item`}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
