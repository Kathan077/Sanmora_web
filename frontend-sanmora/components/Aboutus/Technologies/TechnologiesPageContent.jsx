"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Cpu, 
  Database, 
  Cloud, 
  ShieldCheck, 
  Zap, 
  Server, 
  Layers,
  Sparkles,
  Terminal,
  Activity,
  CheckCircle2
} from "lucide-react";
import styles from "./Technologies.module.css";
import { useRouter } from "next/navigation";

const categories = ["All", "Frontend & Mobile", "Backend & APIs", "Cloud & DevOps", "Databases & Storage", "AI & Security"];

const techStack = [
  {
    name: "React 18 & Next.js 14",
    cat: "Frontend & Mobile",
    icon: "react",
    desc: "Server-side rendering, App Router, React Server Components, and sub-second page loads.",
    metric: "Sub-50ms SSR",
    focus: "Modern Web Apps & Enterprise Portals"
  },
  {
    name: "TypeScript",
    cat: "Frontend & Mobile",
    icon: "typescript",
    desc: "Strict type safety across frontend UI components and backend API data structures.",
    metric: "Zero Type Errors",
    focus: "Codebase Maintainability & Scale"
  },
  {
    name: "Tailwind CSS & CSS Modules",
    cat: "Frontend & Mobile",
    icon: "tailwind",
    desc: "Ultra-fast utility CSS, fluid responsive design tokens, glassmorphism, and dark modes.",
    metric: "60 FPS Render",
    focus: "UI Aesthetics & Design Systems"
  },
  {
    name: "Node.js & Express / NestJS",
    cat: "Backend & APIs",
    icon: "smart-server",
    desc: "High-throughput asynchronous non-blocking event-driven backend microservices.",
    metric: "100k+ RPS",
    focus: "REST & GraphQL API Engine"
  },
  {
    name: "Python & FastAPI / Django",
    cat: "Backend & APIs",
    icon: "python",
    desc: "High-speed backend API services, data processing, machine learning integration, and automation.",
    metric: "< 10ms Latency",
    focus: "AI Integration & Data Pipelines"
  },
  {
    name: "PostgreSQL & Prisma / TypeORM",
    cat: "Databases & Storage",
    icon: "postgresql",
    desc: "ACID-compliant relational database management with automated schema migrations.",
    metric: "99.999% Durability",
    focus: "Relational Enterprise Data"
  },
  {
    name: "MongoDB & Mongoose",
    cat: "Databases & Storage",
    icon: "mongodb",
    desc: "Flexible, scalable NoSQL document database optimized for high-volume unstructured data.",
    metric: "High Velocity",
    focus: "Real-time Data & Content Stores"
  },
  {
    name: "Docker & Kubernetes",
    cat: "Cloud & DevOps",
    icon: "docker",
    desc: "Containerization and automated cluster orchestration for zero-downtime blue/green deployments.",
    metric: "Zero Downtime",
    focus: "Microservices Infrastructure"
  },
  {
    name: "AWS & Google Cloud Platform",
    cat: "Cloud & DevOps",
    icon: "googlecloud",
    desc: "Serverless lambda functions, cloud storage, CDN edge delivery, and managed Kubernetes.",
    metric: "99.99% Uptime",
    focus: "Elastic Cloud Infrastructure"
  },
  {
    name: "OWASP & Enterprise Security",
    cat: "AI & Security",
    icon: "shield",
    desc: "Zero-trust architecture, automated vulnerability scanning, SSL/TLS, and JWT/OAuth 2.0 auth.",
    metric: "SOC2 Ready",
    focus: "End-to-End Encryption"
  }
];

const archLayers = [
  {
    num: "Layer 01",
    title: "Client & Presentation Layer",
    desc: "Next.js 14, React Server Components, Mobile Native Apps, and Progressive Web Apps (PWA).",
    tags: ["Next.js", "React Native", "Framer Motion", "Tailwind CSS"]
  },
  {
    num: "Layer 02",
    title: "API Gateway & Security Mesh",
    desc: "GraphQL & RESTful API Gateways, OAuth 2.0 JWT Authentication, Rate Limiting & Cloudflare WAF.",
    tags: ["GraphQL", "REST APIs", "JWT Auth", "Cloudflare WAF"]
  },
  {
    num: "Layer 03",
    title: "Core Microservices Engine",
    desc: "Event-driven asynchronous services in Node.js, Express, Python FastAPI, and background workers.",
    tags: ["Node.js", "Python FastAPI", "RabbitMQ", "Microservices"]
  },
  {
    num: "Layer 04",
    title: "Persistence & Caching Tier",
    desc: "Distributed relational PostgreSQL databases, NoSQL MongoDB document stores, and Redis cache.",
    tags: ["PostgreSQL", "MongoDB", "Redis Cache", "Prisma ORM"]
  },
  {
    num: "Layer 05",
    title: "Cloud Infra & DevOps Pipeline",
    desc: "Containerized Kubernetes clusters, Docker, AWS ECS/Lambda, Terraform, and GitHub Actions CI/CD.",
    tags: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"]
  }
];

export default function TechnologiesPageContent() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTech = activeCategory === "All" 
    ? techStack 
    : techStack.filter(t => t.cat === activeCategory);

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
          <Cpu size={15} /> Tech Ecosystem
        </motion.div>

        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          State-of-the-Art <span className={styles.heroGradientText}>Engineering Stack</span>
        </motion.h1>

        <motion.p 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We leverage modern open-source frameworks, cloud-native architectures, and robust security standards to build platforms that perform under pressure.
        </motion.p>
      </section>

      {/* Category Filter Bar */}
      <div className={styles.filterBar}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilterBtn : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tech Cards Grid */}
      <motion.section className={styles.techGrid} layout>
        <AnimatePresence>
          {filteredTech.map((tech) => (
            <motion.div
              key={tech.name}
              className={styles.techCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <div>
                <div className={styles.cardHeader}>
                  <span className={styles.techCatBadge}>{tech.cat}</span>
                </div>

                <h3 className={styles.techName}>{tech.name}</h3>
                <p className={styles.techDesc}>{tech.desc}</p>
              </div>

              <div className={styles.techFooter}>
                <span className={styles.metricBadge}>{tech.metric}</span>
                <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', fontWeight: 600 }}>{tech.focus}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>

      {/* Architecture Layers Breakdown */}
      <section className={styles.architectureSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Fullstack System Architecture</h2>
          <p className={styles.sectionDesc}>How we layer client presentation, microservices, databases, and cloud infrastructure for seamless integration.</p>
        </div>

        <div className={styles.layersContainer}>
          {archLayers.map((layer, idx) => (
            <motion.div
              key={idx}
              className={styles.layerCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <span className={styles.layerNum}>{layer.num}</span>
              <div className={styles.layerInfo}>
                <h3 className={styles.layerTitle}>{layer.title}</h3>
                <p className={styles.layerDesc}>{layer.desc}</p>
              </div>
              <div className={styles.layerTags}>
                {layer.tags.map((t, tIdx) => (
                  <span key={tIdx} className={styles.tagPill}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
