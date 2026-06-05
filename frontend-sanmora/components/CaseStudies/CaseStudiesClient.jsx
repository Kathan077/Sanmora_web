"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/Home/ParticleBackground";
import styles from "./CaseStudiesClient.module.css";
import { caseStudiesData } from "./caseStudiesData";

export default function CaseStudiesClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className={styles.page}>
      <ParticleBackground />
      
      <div className={styles.ambientGlowPrimary} />
      <div className={styles.ambientGlowSecondary} />

      <Navbar />

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbActive}>Case Studies</span>
            </div>

            <h1 className={styles.headline}>
              <span className={styles.blinkWord}>OUR</span>
              <br />
              <span className={styles.blinkWord}>CASE STUDIES</span>
            </h1>

            <p className={styles.heroDesc}>
              Discover how we partner with ambitious brands to solve complex challenges, launch new products, and scale businesses.
            </p>
          </motion.div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <motion.div 
          className={styles.container}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className={styles.grid}>
            {caseStudiesData.map((cs, idx) => (
              <motion.div 
                key={cs.id} 
                variants={itemVariants}
                className={styles.cardWrapper}
              >
                <Link href={`/case-studies/${cs.slug}`} className={styles.card}>
                  
                  <div className={styles.cardImagePlaceholder} style={{ background: `linear-gradient(135deg, ${cs.color}15 0%, #FAFAFB 100%)` }}>
                    <div className={styles.cardImageAccent} style={{ backgroundColor: cs.color }} />
                    <div className={styles.cardBadge} style={{ color: cs.color, borderColor: `${cs.color}30` }}>
                      {cs.category}
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.clientName} style={{ color: cs.color }}>{cs.client}</h3>
                    <h2 className={styles.cardTitle}>{cs.title}</h2>
                    <p className={styles.cardSummary}>{cs.summary}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.readMore}>Read Case Study</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.arrow}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
