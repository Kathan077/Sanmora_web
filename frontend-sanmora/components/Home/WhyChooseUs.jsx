"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Zap,
  Globe2,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
  Layers,
  Lock,
  Activity,
  Terminal,
  Clock,
  Rocket,
  Server,
} from "lucide-react";
import styles from "./WhyChooseUs.module.css";

const METRICS_DATA = [
  {
    icon: Rocket,
    color: "#8b5cf6",
    val: "150",
    accent: "+",
    label: "Enterprise Deployments",
    sub: "AI, Web & Scalable Cloud Assets",
  },
  {
    icon: ShieldCheck,
    color: "#10b981",
    val: "99.98",
    accent: "%",
    label: "Infrastructure Uptime SLA",
    sub: "Zero-Downtime Cloud Architecture",
  },
  {
    icon: Zap,
    color: "#f59e0b",
    val: "3.5",
    accent: "x",
    label: "Faster Time to Market",
    sub: "14-Day Agile Sprint Velocity",
  },
  {
    icon: Globe2,
    color: "#2563eb",
    val: "12",
    accent: "+",
    label: "Countries Served Globally",
    sub: "Dual Hubs: India & South Africa",
  },
];

export default function WhyChooseUs() {
  const router = useRouter();
  const [timeIndia, setTimeIndia] = useState("");
  const [timeSA, setTimeSA] = useState("");

  // Live clocks for India & South Africa hubs
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimeIndia(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setTimeSA(
        now.toLocaleTimeString("en-US", {
          timeZone: "Africa/Johannesburg",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section} id="why-choose-us">
      {/* Background ambient lighting */}
      <div className={styles.glowSpot1} />
      <div className={styles.glowSpot2} />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>THE SANMORA ADVANTAGE</span>
          </div>
          <h2 className={styles.title}>
            Engineered for Scale. <br />
            <span className={styles.gradientTitle}>Built for Market Leaders.</span>
          </h2>
          <p className={styles.subtitle}>
            We combine high-order artificial intelligence, architectural precision, and global agile delivery across 
            <strong> India & South Africa</strong> to engineer digital assets that outperform industry standards.
          </p>
        </div>

        {/* Live Metrics Proof Ticker - Clean 4-Column Pro Layout */}
        <div className={styles.metricsBar}>
          {METRICS_DATA.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className={styles.metricItem}>
                <div 
                  className={styles.metricIconWrap} 
                  style={{ "--metric-accent": item.color }}
                >
                  <IconComponent size={20} />
                </div>
                <div className={styles.metricContent}>
                  <div className={styles.metricVal}>
                    {item.val}<span className={styles.metricAccent}>{item.accent}</span>
                  </div>
                  <div className={styles.metricLabel}>{item.label}</div>
                  <div className={styles.metricSub}>{item.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {/* Card 1 (Span 2): AI-Native Architecture */}
          <div className={`${styles.bentoCard} ${styles.colSpan2}`}>
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.iconBox} style={{ "--icon-color": "#8b5cf6" }}>
                  <Cpu size={22} />
                </div>
                <div>
                  <span className={styles.cardTag}>CORE ENGINE</span>
                  <h3 className={styles.cardTitle}>AI-Native Engineering & Cognitive Automation</h3>
                </div>
              </div>
              <span className={styles.liveModelBadge}>
                <Activity size={12} className={styles.spinSlow} /> v4.2 Production
              </span>
            </div>
            
            <div className={styles.cardBody}>
              <p className={styles.cardDesc}>
                We do not just wrap LLM APIs. We construct proprietary neural pipelines, enterprise RAG frameworks, 
                and automated cognitive agents that transform complex enterprise operations into high-velocity revenue engines.
              </p>

              {/* Interactive Pipeline Showcase */}
              <div className={styles.pipelineVisual}>
                <div className={styles.pipelineNode}>
                  <Terminal size={14} />
                  <span>Enterprise Request</span>
                </div>
                <div className={styles.pipelineArrow}>
                  <div className={styles.flowLine} />
                </div>
                <div className={`${styles.pipelineNode} ${styles.activeNode}`}>
                  <Activity size={14} className={styles.spinPulse} />
                  <span>Sanmora AI Engine (38ms)</span>
                </div>
                <div className={styles.pipelineArrow}>
                  <div className={styles.flowLine} />
                </div>
                <div className={styles.pipelineNode}>
                  <Zap size={14} />
                  <span>Edge CDN Output</span>
                </div>
              </div>

              <div className={styles.cardFooterStats}>
                <div className={styles.statPill}>
                  <span className={styles.greenDot} />
                  <span>Latency: <strong>&lt; 40ms Global</strong></span>
                </div>
                <div className={styles.statPill}>
                  <CheckCircle2 size={13} className={styles.accentCheck} />
                  <span>Zero Data Leaks Guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 (Span 1): Dual Global Hubs */}
          <div className={styles.bentoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.iconBox} style={{ "--icon-color": "#2563eb" }}>
                  <Globe2 size={22} />
                </div>
                <div>
                  <span className={styles.cardTag}>24/7 SCALE</span>
                  <h3 className={styles.cardTitle}>Dual Global Hubs</h3>
                </div>
              </div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardDesc}>
                Dual delivery centers in <strong>India</strong> and <strong>South Africa</strong> operating in continuous agile synchrony.
              </p>

              <div className={styles.timeHubWrapper}>
                <div className={styles.timeHub}>
                  <div className={styles.hubTitle}>
                    <span className={styles.flagIcon}>🇮🇳</span>
                    <div>
                      <strong>India Hub</strong>
                      <span className={styles.hubCity}>New Delhi • Innovation</span>
                    </div>
                  </div>
                  <div className={styles.hubTimeBox}>
                    <span className={styles.liveTag}>LIVE</span>
                    <span className={styles.hubTime}>{timeIndia || "04:30 PM"}</span>
                  </div>
                </div>

                <div className={styles.timeHub}>
                  <div className={styles.hubTitle}>
                    <span className={styles.flagIcon}>🇿🇦</span>
                    <div>
                      <strong>South Africa Hub</strong>
                      <span className={styles.hubCity}>Johannesburg • Strategy</span>
                    </div>
                  </div>
                  <div className={styles.hubTimeBox}>
                    <span className={styles.liveTag}>LIVE</span>
                    <span className={styles.hubTime}>{timeSA || "01:00 PM"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 (Span 1): Enterprise Security */}
          <div className={styles.bentoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.iconBox} style={{ "--icon-color": "#10b981" }}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <span className={styles.cardTag}>GOVERNANCE</span>
                  <h3 className={styles.cardTitle}>Bank-Grade Security</h3>
                </div>
              </div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardDesc}>
                Zero-trust network architecture adhering to POPIA, GDPR, and DPDP compliance standards.
              </p>

              <div className={styles.securityStack}>
                <div className={styles.secItem}>
                  <Lock size={15} className={styles.secIcon} />
                  <div>
                    <strong>AES-256 & TLS 1.3</strong>
                    <span>End-to-End Encryption</span>
                  </div>
                </div>
                <div className={styles.secItem}>
                  <ShieldCheck size={15} className={styles.secIcon} />
                  <div>
                    <strong>SOC-2 & ISO 27001</strong>
                    <span>Audit Ready Architecture</span>
                  </div>
                </div>
                <div className={styles.secItem}>
                  <Server size={15} className={styles.secIcon} />
                  <div>
                    <strong>Automated Failover</strong>
                    <span>Multi-Region Cloud Backups</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 (Span 1): High Performance Stack */}
          <div className={styles.bentoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.iconBox} style={{ "--icon-color": "#f59e0b" }}>
                  <Layers size={22} />
                </div>
                <div>
                  <span className={styles.cardTag}>VELOCITY</span>
                  <h3 className={styles.cardTitle}>Sub-Second Next.js Core</h3>
                </div>
              </div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardDesc}>
                Microservices, SSR-driven optimization, and edge caching designed for flawless 100/100 Lighthouse performance.
              </p>

              <div className={styles.lighthouseScore}>
                <div className={styles.scoreCircle}>
                  <span className={styles.scoreNumber}>100</span>
                  <span className={styles.scoreGrade}>OPTIMAL</span>
                </div>
                <div className={styles.scoreDetails}>
                  <div className={styles.scoreMetric}>
                    <span>First Contentful Paint</span>
                    <strong>0.38s</strong>
                  </div>
                  <div className={styles.scoreMetric}>
                    <span>SEO & Best Practices</span>
                    <strong className={styles.greenText}>100 / 100</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 (Span 2): Direct Senior Engineer Collaboration */}
          <div className={`${styles.bentoCard} ${styles.colSpan2}`}>
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.iconBox} style={{ "--icon-color": "#ec4899" }}>
                  <Code2 size={22} />
                </div>
                <div>
                  <span className={styles.cardTag}>COLLABORATION</span>
                  <h3 className={styles.cardTitle}>Direct Senior Architect Access — Zero Bureaucracy</h3>
                </div>
              </div>
              <span className={styles.sprintTag}>14-Day Iterations</span>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.flexRow}>
                <div className={styles.flexCol}>
                  <p className={styles.cardDesc}>
                    Skip non-technical account managers and junior hand-offs. You communicate directly with 
                    principal engineers and lead system designers via dedicated Slack/Teams channels.
                  </p>
                  <ul className={styles.featurePoints}>
                    <li><CheckCircle2 size={16} className={styles.checkIcon} /> <strong>14-Day Sprint Milestones</strong> with live demos</li>
                    <li><CheckCircle2 size={16} className={styles.checkIcon} /> <strong>100% IP & Clean Code Ownership</strong> from day one</li>
                    <li><CheckCircle2 size={16} className={styles.checkIcon} /> <strong>Dedicated CI/CD Staging</strong> environments</li>
                  </ul>
                </div>

                <div className={styles.sprintCard}>
                  <div className={styles.sprintTop}>
                    <Clock size={16} className={styles.sprintClock} />
                    <span>Current Sprint Velocity</span>
                    <span className={styles.sprintActive}>Sprint #14</span>
                  </div>
                  <div className={styles.sprintBar}>
                    <div className={styles.sprintFill} style={{ width: "92%" }} />
                  </div>
                  <div className={styles.sprintMeta}>
                    <span>Milestone 4 of 4 Verified</span>
                    <strong className={styles.velocityTag}>92% Shipped</strong>
                  </div>
                  <div className={styles.sprintLog}>
                    <span className={styles.logDot} /> Production Staging: <strong>PASSED (0 Errors)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaGlow} />
          <div className={styles.ctaContent}>
            <h3>Ready to scale your next digital venture with Sanmora?</h3>
            <p>Schedule a 30-minute technical discovery session with our senior engineering architects.</p>
          </div>
          <button 
            className={styles.ctaButton} 
            onClick={() => router.push("/consultation")}
          >
            <span>Book Discovery Call</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
