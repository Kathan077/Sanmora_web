"use client";

import React from "react";
import styles from "./VisionMission.module.css";
import { motion } from "framer-motion";
import { Target, Eye, ChevronRight } from "lucide-react";

export default function VisionMission() {
  return (
    <section className={styles.section} id="vision-mission">
      <div className={styles.container}
>
        {/* Header */}
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          OUR VISION &amp; MISSION
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Driving the future with bold ideas, sleek design and cutting‑edge technology.
        </motion.p>

        <div className={styles.cardsWrapper}>
          {/* Vision Card */}
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconBadge}>
                <Eye size={24} strokeWidth={2.5} />
              </div>
              <h3>OUR VISION</h3>
            </div>
            <p className={styles.cardDesc}>
              Become a global leader in digital innovation, empowering businesses to thrive through forward‑thinking design and scalable cloud architecture.
            </p>
            <p className={styles.cardDesc}>
              Our vision is to create a sustainable future with cutting‑edge technology.
            </p>
            <ul className={styles.featureList}>
              <li><ChevronRight size={16} className={styles.chevron} /> Global Leadership</li>
              <li><ChevronRight size={16} className={styles.chevron} /> Forward‑Thinking Design</li>
              <li><ChevronRight size={16} className={styles.chevron} /> Scalable Architecture</li>
            </ul>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconBadge}>
                <Target size={24} strokeWidth={2.5} />
              </div>
              <h3>OUR MISSION</h3>
            </div>
            <p className={styles.cardDesc}>
              Deliver seamless, intelligent digital journeys while building modern enterprise platforms that scale, innovate, and create lasting value.
            </p>
            <p className={styles.cardDesc}>
              We strive for excellence in every project, ensuring quality and innovation.
            </p>
            <ul className={styles.featureList}>
              <li><ChevronRight size={16} className={styles.chevron} /> AI‑Powered Automation</li>
              <li><ChevronRight size={16} className={styles.chevron} /> Collaborative Sprints</li>
              <li><ChevronRight size={16} className={styles.chevron} /> Value‑Driven Delivery</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
