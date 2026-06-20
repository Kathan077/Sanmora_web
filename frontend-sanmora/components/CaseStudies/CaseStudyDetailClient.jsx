"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/Home/ParticleBackground";
import styles from "./CaseStudyDetailClient.module.css";

export default function CaseStudyDetailClient({ caseStudy }) {
  const { title, client, category, summary, challenge, solution, results, color, image } = caseStudy;

  return (
    <div className={styles.page}>
      <ParticleBackground />
      
      <div className={styles.ambientGlowPrimary} style={{ background: `radial-gradient(circle, ${color}15 0%, transparent 70%)` }} />
      <div className={styles.ambientGlowSecondary} />

      <Navbar />

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.breadcrumb}>
              <Link href="/case-studies">Case Studies</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbActive}>{client}</span>
            </div>

            <h1 className={styles.headline}>
              <span className={styles.blinkWord}>{title}</span>
            </h1>

            <p className={styles.heroDesc}>
              {summary}
            </p>
          </motion.div>
        </div>
      </section>
      <section className={styles.contentSection}>
        <div className={styles.container}>
          {image && (
            <motion.div 
              className={styles.heroImageContainer}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <img src={image} alt={title} className={styles.heroImage} />
            </motion.div>
          )}
          
          <div className={styles.twoColumnGrid}>
            
            {/* Left Column: Brief, Challenge & Solution */}
            <motion.div 
              className={styles.mainContent}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className={styles.contentBlock}>
                <h2 className={styles.sectionTitle} style={{ color: color }}>Project Brief</h2>
                <p className={styles.bodyText}>{summary}</p>
              </div>

              <div className={styles.contentBlock}>
                <h2 className={styles.sectionTitle} style={{ color: color }}>The Challenge</h2>
                <p className={styles.bodyText}>{challenge}</p>
              </div>

              <div className={styles.contentBlock}>
                <h2 className={styles.sectionTitle} style={{ color: color }}>Our Solution</h2>
                <p className={styles.bodyText}>{solution}</p>
              </div>
            </motion.div>

            {/* Right Column: Business Impact Metrics */}
            <motion.div 
              className={styles.metricsSidebar}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className={styles.metricsCard} style={{ borderColor: `${color}20` }}>
                <h3 className={styles.metricsCardTitle}>Business Impact</h3>
                <div className={styles.metricsList}>
                  {results.map((result, idx) => (
                    <div key={idx} className={styles.metricItem}>
                      <span className={styles.metricValue} style={{ color: color }}>{result.value}</span>
                      <span className={styles.metricLabel}>{result.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
