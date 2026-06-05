"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./careers.module.css";

const jobsData = [
  {
    id: "ui-ux",
    title: "UI/UX Designer",
    type: "Full-Time",
    location: "Offline (At our office)",
    experience: "Freshers welcome",
    brief: "Translate complex software into simple, beautiful, and fluid user interfaces. Freshers are welcome to apply!",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    )
  },
  {
    id: "bde",
    title: "Business Development Executive (BDE)",
    type: "Full-Time",
    location: "Offline (At our office)",
    experience: "Freshers welcome",
    brief: "Drive enterprise customer acquisition and build strategic relations for digital products. Freshers are welcome to apply!",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  }
];

export default function CareersClient() {
  const router = useRouter();

  return (
    <div className={styles.careersPage}>
      {/* Background glow decorations */}
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>

      {/* Careers Hero */}
      <section className={styles.heroSection}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.heroContent}
        >
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbActive}>Careers</span>
          </div>

          <h1 className={styles.headline}>
            <span className={styles.blinkWord}>JOIN OUR</span>
            <br />
            <span className={styles.blinkWord}>CORE TEAM</span>
          </h1>

          <p className={styles.heroDesc}>
            Join our core team of designers, engineers, and product strategists building scalable platforms for global enterprises.
          </p>
        </motion.div>
      </section>

      {/* Openings Grid */}
      <section className={styles.workspaceSection}>
        <div className={styles.jobsGrid}>
          {jobsData.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={styles.jobCard}
              onClick={() => router.push(`/careers/${job.id}`)}
            >
              <div>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    {job.icon}
                  </div>
                </div>

                <h3 className={styles.jobTitle}>{job.title}</h3>
                
                <div className={styles.jobMeta}>
                  <div className={styles.metaItem}>📍 {job.location}</div>
                  <div className={styles.metaItem}>💼 {job.type}</div>
                </div>

                <p className={styles.jobBrief}>{job.brief}</p>
              </div>

              <div className={styles.cardFooter}>
                <div>
                  <span className={styles.salaryLabel}>Experience</span>
                  <span className={styles.salary}>{job.experience}</span>
                </div>
                <button className={styles.viewBtn}>
                  Learn More <span>&rarr;</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
