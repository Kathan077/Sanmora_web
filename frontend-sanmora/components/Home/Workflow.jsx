"use client";
import React, { useRef } from "react";
import styles from "./Workflow.module.css";
import { motion, useScroll, useSpring } from "framer-motion";

const workflowSteps = [
  {
    title: "Strategy & Alignment",
    desc: "Understanding your business goals, scoping technical requirements, and mapping out a precise project roadmap.",
    color: "#f43f5e" // Rose
  },
  {
    title: "System Design & UX",
    desc: "Structuring database schemas, planning scalable layouts, and mapping out frictionless user flows.",
    color: "#a855f7" // Purple
  },
  {
    title: "Precision Engineering",
    desc: "Writing clean, modular, and benchmark-tested code optimized for rapid loading and effortless elasticity.",
    color: "#06b6d4" // Cyan
  },
  {
    title: "Performance Tuning & QA",
    desc: "Subjecting the platform to strict security audits, unit tests, and multi-device compliance checks.",
    color: "#10b981" // Emerald
  },
  {
    title: "Deployment & Evolution",
    desc: "Deploying to secure cloud environments, setting up CI/CD pipelines, and establishing backup layers.",
    color: "#f59e0b" // Amber
  }
];

export default function Workflow() {
  const containerRef = useRef(null);
  const diagramRef = useRef(null); // Ref specifically for the diagram section
  
  // Track scroll progress purely based on the diagram's position on screen
  const { scrollYProgress } = useScroll({
    target: diagramRef,
    offset: ["start 60%", "end 60%"], // Starts when diagram reaches 60% of viewport, finishes when it leaves
  });

  // Add spring physics for a smoother drawing effect
  const pathLength = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  return (
    <section className={styles.section} id="workflow" ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Our Development Blueprint
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A phase-gate execution framework engineered to ship secure, scalable, and high-performance digital systems on schedule.
          </motion.p>
        </div>
      </div>

      {/* ── DESKTOP VIEW: Edge-to-Edge SVG Wavy Path ── */}
      {/* We attach diagramRef here to strictly track this specific section */}
      <div className={styles.diagramWrapperDesktop} ref={diagramRef}>
        <svg className={styles.svgLine} viewBox="0 0 1000 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="workflowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <motion.path
            d="M -50 240 C 35 240, 35 240, 120 240 C 215 240, 215 160, 310 160 C 405 160, 405 240, 500 240 C 595 240, 595 120, 690 120 C 785 120, 785 200, 880 200 C 965 200, 1050 200, 1050 200"
            fill="none"
            stroke="url(#workflowGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        {workflowSteps.map((step, idx) => (
          <div key={idx} className={`${styles.nodeBox} ${styles[`node${idx + 1}`]}`}>
            <motion.div 
              className={styles.iconWrapper}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 + (idx * 0.15) }}
            >
              <div className={styles.dot} />
            </motion.div>
            <motion.div 
              className={styles.textBlock}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 + (idx * 0.15) }}
            >
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* ── MOBILE VIEW: Vertical Timeline ── */}
      <div className={styles.container}>
        <div className={styles.diagramWrapperMobile}>
          <div className={styles.mobileLine}></div>
          {workflowSteps.map((step, idx) => (
            <div key={idx} className={styles.mobileNode}>
              <div className={styles.iconWrapper}>
                <div className={styles.dot} />
              </div>
              <div className={styles.textBlockMobile}>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
