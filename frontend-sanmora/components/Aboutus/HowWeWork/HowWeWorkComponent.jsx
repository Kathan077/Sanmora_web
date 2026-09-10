"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Clock, 
  ArrowRight,
  Code2,
  FileCheck,
  Terminal,
  Activity
} from "lucide-react";
import styles from "./HowWeWork.module.css";
import IconRenderer from "@/components/Shared/IconRenderer";
import { useRouter } from "next/navigation";

const stepsData = [
  {
    id: 1,
    title: "1. Strategic Discovery & Technical Architecture",
    badge: "Phase 01 • Architecture",
    desc: "We analyze product specs, perform security audits, design data schemas, and formulate a scalable microservices architecture before writing a line of code.",
    deliverables: [
      "Technical Blueprint & Architecture Spike",
      "Database ERD & API Contract Specifications",
      "Cloud Infrastructure & Security Risk Assessment",
      "Sprint Milestones & Delivery SLA Roadmap"
    ]
  },
  {
    id: 2,
    title: "2. Precision UI/UX & Design Systems",
    badge: "Phase 02 • Product Design",
    desc: "Crafting modern glassmorphic UI components, design tokens, and fluid interactions aligned with brand identity and high user engagement.",
    deliverables: [
      "Figma Design Tokens & Reusable UI Kit",
      "Interactive High-Fidelity Prototypes",
      "Responsive Layout Grid Specifications",
      "Micro-Animations & Motion Design Curves"
    ]
  },
  {
    id: 3,
    title: "3. Modular Agile Sprints & Fullstack Build",
    badge: "Phase 03 • Engineering",
    desc: "Clean modular React/Next.js frontend integration combined with robust Node.js/Python microservices, GraphQL/REST endpoints, and CI/CD pipelines.",
    deliverables: [
      "Bi-Weekly Production Build Releases",
      "Modular React / Next.js Clean Architecture",
      "Automated CI/CD Deployment Pipeline",
      "Live Staging Demo Environment Access"
    ]
  },
  {
    id: 4,
    title: "4. Rigorous QA, Security & Performance Audit",
    badge: "Phase 04 • Quality Assurance",
    desc: "Zero-compromise testing pipeline comprising stress-testing, automated E2E tests, vulnerability scanning, and cross-device optimization.",
    deliverables: [
      "Automated E2E Integration Suite",
      "Load & Penetration Testing Reports",
      "Lighthouse 95+ Performance Audit",
      "Multi-Browser & Cross-Device QA Signoff"
    ]
  },
  {
    id: 5,
    title: "5. Production Launch & 24/7 Managed Growth",
    badge: "Phase 05 • Deployment & Scale",
    desc: "Seamless zero-downtime deployment to AWS/GCP cloud environments, automated database backups, continuous monitoring, and instant bug fixes.",
    deliverables: [
      "Zero-Downtime Blue/Green Production Rollout",
      "Real-time Telemetry & Error Tracking Setup",
      "SLA Guarantee with 24/7 Incident Response",
      "Post-Launch Scaling & Maintenance Sprints"
    ]
  }
];

const slas = [
  {
    icon: "lightning",
    title: "99.99% Uptime Guarantee",
    desc: "Every platform built by Sanmora is deployed across auto-scaling cloud infrastructure with fault tolerance."
  },
  {
    icon: "cpu",
    title: "2-Week Sprint Velocity",
    desc: "Predictable, transparent bi-weekly release cycles with clear deliverables and live demo reviews."
  },
  {
    icon: "shield",
    title: "Bank-Grade Security",
    desc: "Built-in encryption at rest and in transit, penetration testing, and zero-trust API architecture."
  },
  {
    icon: "activity",
    title: "Transparent Communication",
    desc: "Direct Slack/Teams channel integration, weekly syncs, and real-time Jira project board visibility."
  }
];

const engagementModels = [
  {
    title: "Autonomous Dedicated Team",
    subtitle: "Full-stack engineering squad tailored for long-term product development and continuous scaling.",
    featured: true,
    features: [
      "Dedicated Solution Architect & Project Lead",
      "Senior Fullstack, UI/UX & DevOps Engineers",
      "Direct Slack/Teams & Daily Standups",
      "Flexible Sprint Velocity Scaling"
    ]
  },
  {
    title: "Fixed-Scope Sprint Delivery",
    subtitle: "Ideal for well-defined MVPs, platform refactoring, or specific feature milestones.",
    featured: false,
    features: [
      "Guaranteed Delivery Milestone Timelines",
      "Fixed Budget with Detailed Scope Specs",
      "Comprehensive Handover & Documentation",
      "30-Day Post-Launch Bug Warranty"
    ]
  },
  {
    title: "Managed Cloud & Advisory",
    subtitle: "Continuous maintenance, infrastructure optimization, security audits, and performance tuning.",
    featured: false,
    features: [
      "24/7 Server & API Monitoring",
      "Monthly Security Patching & Audit",
      "Lighthouse & Database Query Optimization",
      "Guaranteed SLA Response Times"
    ]
  }
];

export default function HowWeWorkComponent() {
  const [activeStepId, setActiveStepId] = useState(1);
  const router = useRouter();
  const activeStep = stepsData.find(s => s.id === activeStepId);

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
          <Zap size={15} /> Execution Methodology
        </motion.div>

        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Engineered for <span className={styles.heroGradientText}>Speed, Precision</span> &amp; Enterprise Scale
        </motion.h1>

        <motion.p 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover how Sanmora turns complex business requirements into high-performance, battle-tested software using agile sprints and zero-compromise engineering.
        </motion.p>
      </section>

      {/* Interactive Process Stepper */}
      <section className={styles.processSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our 5-Stage Delivery Pipeline</h2>
          <p className={styles.sectionDesc}>Click through our interactive methodology stages to inspect deliverables, SLAs, and technical focus.</p>
        </div>

        {/* Stepper Tabs */}
        <div className={styles.stepperTabs}>
          {stepsData.map((step) => {
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                className={`${styles.stepTabBtn} ${isActive ? styles.activeStepTab : ""}`}
                onClick={() => setActiveStepId(step.id)}
              >
                <span className={styles.stepNumber}>0{step.id}</span>
                <span>{step.title.split(". ")[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepId}
            className={styles.stepDetailCard}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className={styles.stepDetailLeft}>
              <span className={styles.stepBadge}>{activeStep.badge}</span>
              <h3 className={styles.stepDetailTitle}>{activeStep.title}</h3>
              <p className={styles.stepDetailDesc}>{activeStep.desc}</p>

              <div className={styles.deliverablesList}>
                <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-tertiary)', fontWeight: 800 }}>Key Deliverables &amp; Artifacts</h4>
                {activeStep.deliverables.map((item, idx) => (
                  <div key={idx} className={styles.deliverableItem}>
                    <div className={styles.deliverableCheck}>
                      <CheckCircle2 size={14} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Engineering SLAs */}
      <section className={styles.slaSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Engineering Principles &amp; SLAs</h2>
          <p className={styles.sectionDesc}>We maintain strict quality guarantees and operational standards for every project.</p>
        </div>

        <div className={styles.slaGrid}>
          {slas.map((item, idx) => (
            <motion.div 
              key={idx} 
              className={styles.slaCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.slaIcon}>
                <IconRenderer icon={item.icon} />
              </div>
              <h3 className={styles.slaTitle}>{item.title}</h3>
              <p className={styles.slaDesc}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Engagement Models */}
      <section className={styles.modelsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Flexible Engagement Models</h2>
          <p className={styles.sectionDesc}>Choose the collaboration structure that fits your roadmap and growth trajectory.</p>
        </div>

        <div className={styles.modelsGrid}>
          {engagementModels.map((model, idx) => (
            <motion.div 
              key={idx}
              className={`${styles.modelCard} ${model.featured ? styles.modelCardFeatured : ""}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {model.featured && <span className={styles.featuredBadge}>Most Popular</span>}
              <div className={styles.modelHeader}>
                <h3 className={styles.modelTitle}>{model.title}</h3>
                <p className={styles.modelSubtitle}>{model.subtitle}</p>
              </div>

              <div className={styles.modelFeatures}>
                {model.features.map((feat, fIdx) => (
                  <div key={fIdx} className={styles.modelFeatureItem}>
                    <CheckCircle2 size={16} color="var(--primary)" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button className={styles.modelCtaBtn} onClick={() => router.push('/consultation')}>
                Start Project Consultation
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
