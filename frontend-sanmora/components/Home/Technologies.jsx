"use client";
import React from "react";
import styles from "./Technologies.module.css";
import { motion } from "framer-motion";
import { 
  MonitorSmartphone, Server, Smartphone, CloudCog, Code, Database, 
  Terminal, Globe, Cpu, Layers, LayoutTemplate, ShieldCheck 
} from "lucide-react";

const topRowTech = [
  { name: "React", icon: Code, color: "#61dafb" },
  { name: "Next.js", icon: Globe, color: "#1a1a1a" },
  { name: "Vue.js", icon: LayoutTemplate, color: "#4fc08d" },
  { name: "Tailwind CSS", icon: Layers, color: "#38bdf8" },
  { name: "Figma", icon: MonitorSmartphone, color: "#f24e1e" },
  { name: "React Native", icon: Smartphone, color: "#61dafb" },
  { name: "Flutter", icon: Smartphone, color: "#02569b" },
];

const bottomRowTech = [
  { name: "Node.js", icon: Server, color: "#339933" },
  { name: "Python", icon: Terminal, color: "#3776ab" },
  { name: "AWS", icon: CloudCog, color: "#ff9900" },
  { name: "Docker", icon: Layers, color: "#2496ed" },
  { name: "Kubernetes", icon: Server, color: "#326ce5" },
  { name: "PostgreSQL", icon: Database, color: "#336791" },
  { name: "GraphQL", icon: Cpu, color: "#e10098" },
  { name: "Cybersecurity", icon: ShieldCheck, color: "#10b981" },
];

const TechGroup = ({ items }) => (
  <div className={styles.techGroup}>
    {items.map((tech, idx) => {
      const Icon = tech.icon;
      return (
        <div key={idx} className={styles.techCard} style={{ "--tech-color": tech.color }}>
          <Icon className={styles.techIcon} />
          <span className={styles.techName}>{tech.name}</span>
        </div>
      );
    })}
  </div>
);

export default function Technologies() {
  return (
    <section className={styles.section} id="technologies">
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technologies & Platforms
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We leverage cutting-edge tools and frameworks to build scalable, robust, and future-proof digital solutions tailored to your business needs.
          </motion.p>
        </div>
      </div>

      <div className={styles.marqueeContainer}>
        {/* Top Row: Scrolls Left */}
        <div className={styles.marqueeRow}>
          <div className={`${styles.marqueeTrack} ${styles.scrollLeft}`}>
            <TechGroup items={topRowTech} />
            <TechGroup items={topRowTech} />
            <TechGroup items={topRowTech} />
          </div>
        </div>

        {/* Bottom Row: Scrolls Right */}
        <div className={styles.marqueeRow}>
          <div className={`${styles.marqueeTrack} ${styles.scrollRight}`}>
            <TechGroup items={bottomRowTech} />
            <TechGroup items={bottomRowTech} />
            <TechGroup items={bottomRowTech} />
          </div>
        </div>
      </div>
    </section>
  );
}
