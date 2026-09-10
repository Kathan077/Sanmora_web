"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Users, 
  Sparkles, 
  Coffee, 
  GraduationCap, 
  Calendar, 
  Film, 
  Award,
  ArrowRight,
  Smile
} from "lucide-react";
import styles from "./LifeAtSanmoraHub.module.css";
import SanmoraPerks from "@/components/Aboutus/SanmoraPerks";
import DownTheMemoryLane from "@/components/Aboutus/DownTheMemoryLane";
import Link from "next/link";

const bentoItems = [
  {
    large: true,
    tag: "Collaborative Spirit",
    title: "Pair Programming & Innovation Sprints",
    desc: "We foster an encouraging engineering environment where team members learn together, review code constructively, and tackle complex software challenges as one cohesive team."
  },
  {
    large: false,
    tag: "Work-Life Balance",
    title: "Flexible & Supportive Workstation",
    desc: "Hybrid options, ergonomic setups, and a culture that respects personal time, mental well-being, and individual productivity."
  },
  {
    large: false,
    tag: "Team Bonding",
    title: "Monthly Dinners, Movies & Outings",
    desc: "Every month we step out for team dinners, movie screenings, weekend picnics, and festive celebrations building genuine friendships."
  },
  {
    large: true,
    tag: "Career Growth",
    title: "Continuous Learning & Personality Growth",
    desc: "Dedicated training budgets for cloud certifications, tech conferences, soft-skills workshops, and personalized leadership coaching."
  }
];

export default function LifeAtSanmoraHubComponent() {
  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <motion.div 
          className={styles.heroBadge}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heart size={15} /> Culture &amp; Team Vibe
        </motion.div>

        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Life at Sanmora: <span className={styles.heroGradientText}>Innovate &amp; Elevate Together</span>
        </motion.h1>

        <motion.p 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Experience a supportive, vibrant engineering culture where talent thrives, work is celebrated, and friendships last a lifetime.
        </motion.p>
      </section>

      {/* Bento Culture Grid */}
      <section className={styles.bentoGrid}>
        {bentoItems.map((item, idx) => (
          <motion.div
            key={idx}
            className={`${styles.bentoCard} ${item.large ? styles.bentoCardLarge : ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <span className={styles.cardTag}>{item.tag}</span>
            <div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Perks Component Integration */}
      <section className={styles.subSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Perks &amp; Employee Benefits</h2>
          <p className={styles.sectionDesc}>We take care of our team with thoughtful perks that promote learning, health, and fun.</p>
        </div>
        <SanmoraPerks />
      </section>

      {/* Down The Memory Lane Photo Gallery */}
      <section className={styles.subSection}>
        <DownTheMemoryLane />
      </section>

      {/* Careers Call to Action */}
      <section className={styles.subSection}>
        <div className={styles.careersCtaCard}>
          <h2 className={styles.ctaTitle}>Ready to Build Great Products with Us?</h2>
          <p className={styles.ctaDesc}>We are always looking for passionate software engineers, UI/UX designers, and cloud architects to join the Sanmora family.</p>
          <Link href="/careers" className={styles.ctaBtn}>
            <span>View Open Positions</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
