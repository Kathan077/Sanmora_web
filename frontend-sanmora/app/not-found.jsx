"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/Home/ParticleBackground";
import styles from "./not-found.module.css";
import pageStyles from "./page.module.css";

export default function NotFound() {
  useEffect(() => {
    // Set descriptive page title dynamically in client-side
    document.title = "Page Not Found | Sanmora Technologies";
  }, []);

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom premium easeOut
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <main className={pageStyles.page}>
      {/* Background Interactive Particles */}
      <ParticleBackground />

      {/* Floating Ambient Parallax Glows (matching home page) */}
      <div className={pageStyles.ambientGlowPrimary}></div>
      <div className={pageStyles.ambientGlowSecondary}></div>

      {/* Header Navbar */}
      <Navbar />

      <div className={styles.container}>
        <motion.div
          className={styles.card}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Internal soft background glow */}
          <div className={styles.cardGlow}></div>

          {/* SVG/Dynamic visual of "404" with a pulsing accent dot */}
          <motion.div className={styles.errorVisual} variants={itemVariants}>
            <span className={styles.errorNumber}>
              404
              <span className={styles.glowDot} />
            </span>
          </motion.div>

          <motion.h1 className={styles.title} variants={itemVariants}>
            Page Lost in Orbit
          </motion.h1>

          <motion.p className={styles.description} variants={itemVariants}>
            The digital interface you are trying to reach doesn&apos;t exist or was relocated. Let&apos;s guide you back to our high-performance brand ecosystems.
          </motion.p>

          {/* Main Action CTAs */}
          <motion.div className={styles.actions} variants={itemVariants}>
            <Link href="/" className={styles.primaryBtn}>
              <span>Go Back Home</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link href="/consultation" className={styles.secondaryBtn}>
              <span>Talk to Us</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </Link>
          </motion.div>

          {/* Quick Links Menu */}
          <motion.div className={styles.quickLinksContainer} variants={itemVariants}>
            <h4 className={styles.quickLinksTitle}>Quick Navigation</h4>
            <div className={styles.quickLinks}>
              <Link href="/services" className={styles.quickLink}>
                Services
              </Link>
              <Link href="/case-studies" className={styles.quickLink}>
                Case Studies
              </Link>
              <Link href="/blog" className={styles.quickLink}>
                Insights
              </Link>
              <Link href="/about-us" className={styles.quickLink}>
                About Us
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
