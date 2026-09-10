"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  Eye, 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  Award,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import styles from "./VisionMission.module.css";
import IconRenderer from "@/components/Shared/IconRenderer";
import { useRouter } from "next/navigation";

const valuesList = [
  {
    icon: "neural",
    title: "Innovation First",
    desc: "Constantly pushing technological boundaries by adopting next-gen frameworks, AI automation, and cloud-native standards."
  },
  {
    icon: "shield",
    title: "Zero-Compromise Security",
    desc: "Embedding enterprise-grade security protocols, OWASP standards, and data protection into every level of engineering."
  },
  {
    icon: "activity",
    title: "Client ROI & Impact",
    desc: "Focusing strictly on measurable business outcomes, speed to market, user satisfaction, and long-term product durability."
  },
  {
    icon: "brain",
    title: "Radical Transparency",
    desc: "Fostering direct client communication, open Jira boards, bi-weekly demo releases, and honest technical guidance."
  },
  {
    icon: "globe",
    title: "Global Scalability",
    desc: "Designing software architectures capable of scaling effortlessly across regions, users, and high-frequency transactions."
  },
  {
    icon: "lightning",
    title: "Velocity with Quality",
    desc: "Harmonizing rapid agile iteration with strict code coverage, automated testing suites, and continuous delivery."
  }
];

const roadmapItems = [
  {
    year: "2024 - 2025",
    title: "AI-Powered Microservices & Cloud Automation",
    desc: "Integrating autonomous AI code generation tools, automated testing bots, and zero-downtime multi-cloud deployment pipelines for all Sanmora clients."
  },
  {
    year: "2026 - 2027",
    title: "South Africa Expansion & Regional Growth",
    desc: "Completing key enterprise projects in South Africa and establishing our second official branch in the region, which is currently experiencing rapid growth."
  },
  {
    year: "2028 - 2030",
    title: "Autonomous Enterprise Software Ecosystems",
    desc: "Pioneering self-healing cloud platforms and intelligent enterprise software frameworks that dynamically adapt to real-time traffic workloads."
  }
];

export default function VisionMissionPageContent() {
  const router = useRouter();

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
          <Compass size={15} /> Strategic Purpose
        </motion.div>

        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Pioneering the Next Era of <span className={styles.heroGradientText}>Enterprise Technology</span>
        </motion.h1>

        <motion.p 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our vision and mission drive every line of code we write, every architecture we design, and every digital transformation we deliver.
        </motion.p>
      </section>

      {/* Dual Vision vs Mission Showcase */}
      <section className={styles.dualShowcase}>
        {/* Vision Card */}
        <motion.div 
          className={styles.showcaseCard}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.cardGlowBg}></div>
          <div className={styles.cardHeader}>
            <div className={styles.cardIconBox}>
              <Eye size={28} />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--primary)' }}>Future Benchmark</span>
              <h2 className={styles.cardTitle}>OUR VISION</h2>
            </div>
          </div>

          <p className={styles.cardText}>
            To be recognized globally as the ultimate engineering partner for ambitious companies, setting new standards in digital innovation, resilient cloud platforms, and intuitive human-centered design.
          </p>

          <div className={styles.pillList}>
            <div className={styles.pillItem}>
              <ChevronRight size={18} color="var(--primary)" />
              <span>Global Technology Leadership</span>
            </div>
            <div className={styles.pillItem}>
              <ChevronRight size={18} color="var(--primary)" />
              <span>Future-Proof Cloud Architecture</span>
            </div>
            <div className={styles.pillItem}>
              <ChevronRight size={18} color="var(--primary)" />
              <span>Sustainable &amp; Scalable Engineering</span>
            </div>
          </div>
        </motion.div>

        {/* Mission Card */}
        <motion.div 
          className={styles.showcaseCard}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.cardGlowBg} style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)' }}></div>
          <div className={styles.cardHeader}>
            <div className={styles.cardIconBox} style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)' }}>
              <Target size={28} />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#0891B2' }}>Core Commitment</span>
              <h2 className={styles.cardTitle}>OUR MISSION</h2>
            </div>
          </div>

          <p className={styles.cardText}>
            To empower enterprises and high-growth startups by delivering high-velocity software products, AI-driven automation, and seamless user experiences that unlock exponential market value.
          </p>

          <div className={styles.pillList}>
            <div className={styles.pillItem}>
              <ChevronRight size={18} color="#0891B2" />
              <span>Value-Driven Agile Execution</span>
            </div>
            <div className={styles.pillItem}>
              <ChevronRight size={18} color="#0891B2" />
              <span>Zero-Compromise Code Quality</span>
            </div>
            <div className={styles.pillItem}>
              <ChevronRight size={18} color="#0891B2" />
              <span>Transparent Client Growth Synergy</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>The Values That Define Us</h2>
          <p className={styles.sectionDesc}>Principles that guide our engineering culture, client relationships, and technological standards.</p>
        </div>

        <div className={styles.valuesGrid}>
          {valuesList.map((val, idx) => (
            <motion.div
              key={idx}
              className={styles.valueCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div className={styles.valueIcon}>
                <IconRenderer icon={val.icon} />
              </div>
              <h3 className={styles.valueName}>{val.title}</h3>
              <p className={styles.valueDesc}>{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Strategic Roadmap */}
      <section className={styles.roadmapSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>2024 – 2030 Strategic Roadmap</h2>
          <p className={styles.sectionDesc}>Our long-term commitment to advancing enterprise software ecosystems and cloud infrastructure.</p>
        </div>

        <div className={styles.timelineContainer}>
          {roadmapItems.map((item, idx) => (
            <motion.div
              key={idx}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className={styles.timelineDot}></div>
              <span className={styles.timelineYear}>{item.year}</span>
              <h3 className={styles.timelineTitle}>{item.title}</h3>
              <p className={styles.timelineDesc}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
