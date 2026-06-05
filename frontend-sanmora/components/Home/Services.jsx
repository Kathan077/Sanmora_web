"use client";
import React from "react";
import styles from "./Services.module.css";
import { Cpu, PenTool, Code, Smartphone, Megaphone, Palette } from "lucide-react";
import { motion } from "framer-motion";

const servicesData = [
  {
    icon: Code,
    title: "Web Development",
    desc: "We build scalable, high-performance web applications engineered for your specific business needs, delivering seamless user journeys and SSR optimization.",
    color: "#8b5cf6", // Violet
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Scale your online visibility and drive customer acquisition with high-impact SEO, performance content strategy, and data-driven marketing campaigns.",
    color: "#3b82f6", // Blue
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    desc: "We transform complex digital product requirements into intuitive, engaging, and visually stunning interactive designs built for modern users.",
    color: "#ec4899", // Pink
  },
  {
    icon: Palette,
    title: "Logo Design",
    desc: "Crafting unique, memorable visual identity assets, modern typography systems, and vector-perfect logos that distinguish your brand.",
    color: "#06b6d4", // Cyan
  },
  {
    icon: Smartphone,
    title: "Custom Mobile Development",
    desc: "From blueprints to app store deployments, we build native and cross-platform mobile apps for iOS and Android tailored for performance.",
    color: "#f59e0b", // Gold/Amber
  },
  {
    icon: Cpu,
    title: "Software Development",
    desc: "Engineering robust backend architectures, custom database models, cloud sync solutions, and secure API integrations.",
    color: "#10b981", // Emerald
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesData.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                className={styles.card}
                variants={cardVariants}
                style={{ "--accent": item.color }}
              >
                <div className={styles.iconBadge}>
                  <Icon className={styles.icon} size={32} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}