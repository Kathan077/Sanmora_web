"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  Target,
  ShieldCheck,
  Headphones,
  TrendingUp,
  Search,
  Award,
  Smartphone,
  Rocket,
  Cpu,
  Sparkles,
  Layers,
  CheckCircle2,
  Code2,
} from "lucide-react";
import styles from "./PendulumCta.module.css";

/**
 * Renders the matching Lucide SVG vector icon
 */
function renderChipIcon(iconName) {
  const props = { size: 22, strokeWidth: 2.2 };
  switch (iconName) {
    case "TrendingUp":
      return <TrendingUp {...props} />;
    case "Search":
      return <Search {...props} />;
    case "Award":
      return <Award {...props} />;
    case "Smartphone":
      return <Smartphone {...props} />;
    case "Rocket":
      return <Rocket {...props} />;
    case "Cpu":
      return <Cpu {...props} />;
    case "Sparkles":
      return <Sparkles {...props} />;
    case "Layers":
      return <Layers {...props} />;
    case "CheckCircle2":
      return <CheckCircle2 {...props} />;
    case "Code2":
      return <Code2 {...props} />;
    case "Target":
      return <Target {...props} />;
    case "ShieldCheck":
      return <ShieldCheck {...props} />;
    case "Headphones":
      return <Headphones {...props} />;
    case "Zap":
    default:
      return <Zap {...props} />;
  }
}

/**
 * Intelligent helper to dynamically resolve subpage-specific messaging and trust chips
 */
export function getPendulumData(service, category) {
  const catSlug = (category?.slug || "").toLowerCase();
  const srvSlug = (service?.slug || "").toLowerCase();
  const catName = category?.name || "";
  const srvName = service?.name || "";

  // 1. Digital Marketing Subpages
  if (catSlug === "seo-optimization") {
    return {
      headline: "NEED SEO OPTIMIZATION?",
      badge: "Google Rank #1 • Organic Growth",
      pitch: "Climb to the top of Google search results with technical site health, deep intent mapping, and high-quality backlink pipelines.",
      accentColor: "#0ea5e9",
      chips: [
        { icon: "TrendingUp", theme: "chipIconZap", title: "Top Google Rankings", subtitle: "Data-driven organic search dominance" },
        { icon: "Target", theme: "chipIconTarget", title: "High-Intent Conversions", subtitle: "Turn search traffic into paying clients" },
        { icon: "Search", theme: "chipIconShield", title: "100% Technical Health", subtitle: "Zero crawl errors, perfect site indexing" },
        { icon: "Award", theme: "chipIconSupport", title: "Authority Link Building", subtitle: "High-domain-rating backlink pipelines" },
      ],
    };
  }
  if (catSlug === "ppc-campaigns") {
    return {
      headline: "NEED HIGH-ROI PPC ADS?",
      badge: "Paid Search & Meta Ads",
      pitch: "Scale your revenue profitably with data-driven PPC campaigns, automated bidding strategies, and high-converting landing funnels.",
      accentColor: "#f59e0b",
      chips: [
        { icon: "Target", theme: "chipIconZap", title: "Laser-Targeted Ads", subtitle: "High-intent audience acquisition" },
        { icon: "TrendingUp", theme: "chipIconTarget", title: "Maximum ROI & ROAS", subtitle: "Data-optimized bidding funnels" },
        { icon: "Zap", theme: "chipIconShield", title: "Real-Time Ad Tuning", subtitle: "A/B tested creative optimization" },
        { icon: "Headphones", theme: "chipIconSupport", title: "Transparent Analytics", subtitle: "Live multi-channel attribution" },
      ],
    };
  }
  if (catSlug === "social-media-marketing") {
    return {
      headline: "NEED SOCIAL MEDIA GROWTH?",
      badge: "Brand Virality & Retention",
      pitch: "Cultivate loyal online communities and generate consistent qualified inbound leads across Instagram, LinkedIn, and YouTube.",
      accentColor: "#ec4899",
      chips: [
        { icon: "Sparkles", theme: "chipIconZap", title: "Viral Content Strategy", subtitle: "High-engagement reels & carousels" },
        { icon: "Target", theme: "chipIconTarget", title: "Targeted Inbound Leads", subtitle: "Monetize brand attention into sales" },
        { icon: "Award", theme: "chipIconShield", title: "Brand Authority Building", subtitle: "Consistent multi-channel presence" },
        { icon: "Headphones", theme: "chipIconSupport", title: "Active Community Growth", subtitle: "Rapid follower & engagement lift" },
      ],
    };
  }
  if (catSlug === "content-marketing") {
    return {
      headline: "NEED CONTENT STRATEGY?",
      badge: "Authority & Thought Leadership",
      pitch: "Engage your ideal customers with high-converting copy, compelling thought leadership, and strategic editorial workflows.",
      accentColor: "#8b5cf6",
      chips: [
        { icon: "Layers", theme: "chipIconZap", title: "High-Converting Copy", subtitle: "Turn readers into loyal customers" },
        { icon: "Search", theme: "chipIconTarget", title: "SEO Editorial Strategy", subtitle: "Keyword-rich authoritative content" },
        { icon: "CheckCircle2", theme: "chipIconShield", title: "Thought Leadership", subtitle: "Establish undisputed brand authority" },
        { icon: "Headphones", theme: "chipIconSupport", title: "Omnichannel Distribution", subtitle: "Blogs, whitepapers, and guides" },
      ],
    };
  }

  // 2. Website Development Subpages
  if (catSlug === "static-website") {
    return {
      headline: "NEED A STATIC WEBSITE?",
      badge: "Blazing-Fast Web Experience",
      pitch: "Lightning-fast Next.js landing pages with perfect 100/100 Google Lighthouse scores, bulletproof security, and zero server lag.",
      accentColor: "#0ea5e9",
      chips: [
        { icon: "Zap", theme: "chipIconZap", title: "100/100 Lighthouse Score", subtitle: "Sub-second load times & instant speed" },
        { icon: "Target", theme: "chipIconTarget", title: "Conversion-First UX", subtitle: "Engineered to maximize qualified leads" },
        { icon: "Code2", theme: "chipIconShield", title: "Clean Semantic Code", subtitle: "Modern Next.js edge deployment" },
        { icon: "Headphones", theme: "chipIconSupport", title: "24/7 Dedicated Support", subtitle: "Direct access to senior tech leads" },
      ],
    };
  }
  if (catSlug === "dynamic-website") {
    return {
      headline: "NEED A DYNAMIC WEB APP?",
      badge: "Data-Driven Web Platform",
      pitch: "Feature-rich web applications with secure OAuth logins, custom administration dashboards, and real-time database sync.",
      accentColor: "#3b82f6",
      chips: [
        { icon: "Cpu", theme: "chipIconZap", title: "Real-Time Sync", subtitle: "Event-driven WebSocket architecture" },
        { icon: "Target", theme: "chipIconTarget", title: "Interactive Dashboards", subtitle: "Custom client & admin workflows" },
        { icon: "ShieldCheck", theme: "chipIconShield", title: "Secure Authentication", subtitle: "OAuth, JWT & role-based permissions" },
        { icon: "Headphones", theme: "chipIconSupport", title: "24/7 Dedicated Support", subtitle: "Direct access to senior tech leads" },
      ],
    };
  }
  if (catSlug === "e-commerce") {
    return {
      headline: "NEED AN E-COMMERCE STORE?",
      badge: "High-Conversion Storefront",
      pitch: "Frictionless shopping experiences engineered to convert cold visitors into repeat buyers with instant, secure global checkouts.",
      accentColor: "#10b981",
      chips: [
        { icon: "Zap", theme: "chipIconZap", title: "Instant Checkout Speed", subtitle: "Sub-second product catalog search" },
        { icon: "Target", theme: "chipIconTarget", title: "Cart Abandonment Drop", subtitle: "Optimized multi-gateway checkouts" },
        { icon: "ShieldCheck", theme: "chipIconShield", title: "Global Payment Gateways", subtitle: "Stripe, Razorpay & PayPal ready" },
        { icon: "Headphones", theme: "chipIconSupport", title: "Flash Sale Scalability", subtitle: "Engineered for high traffic spikes" },
      ],
    };
  }
  if (catSlug === "custom-website-development" || srvSlug === "website-development") {
    return {
      headline: "NEED A HIGH-PERFORMANCE WEBSITE?",
      badge: "Modern Web Engineering",
      pitch: "Fast, clean, conversion-focused websites engineered with modern Next.js and React technology.",
      accentColor: "#0ea5e9",
      chips: [
        { icon: "Zap", theme: "chipIconZap", title: "100/100 Core Web Vitals", subtitle: "Engineered for sub-second page loads" },
        { icon: "Target", theme: "chipIconTarget", title: "Conversion-Obsessed UX", subtitle: "Crafted to turn visitors into active clients" },
        { icon: "Code2", theme: "chipIconShield", title: "Clean Next.js Architecture", subtitle: "Zero bloated code, pure performance" },
        { icon: "Headphones", theme: "chipIconSupport", title: "24/7 Dedicated Support", subtitle: "Direct access to senior tech leads" },
      ],
    };
  }

  // 3. Application Development Subpages
  if (
    catSlug === "flutter" ||
    catSlug === "react-native" ||
    catSlug === "ios-development" ||
    catSlug === "android-development" ||
    srvSlug === "application-development"
  ) {
    const platform = catName || "Mobile";
    return {
      headline: `NEED A ${platform.toUpperCase()} APP?`,
      badge: "iOS & Android Engineering",
      pitch: "Native-quality mobile applications with buttery smooth 60fps animations, intuitive navigation, and battle-tested API backends.",
      accentColor: "#8b5cf6",
      chips: [
        { icon: "Smartphone", theme: "chipIconZap", title: "iOS & Android Ready", subtitle: "Native-grade cross-platform builds" },
        { icon: "Zap", theme: "chipIconTarget", title: "Silky 60 FPS Fluid UX", subtitle: "Smooth gesture transitions & animations" },
        { icon: "Rocket", theme: "chipIconShield", title: "Store Launch Support", subtitle: "App Store & Google Play compliance" },
        { icon: "ShieldCheck", theme: "chipIconSupport", title: "Offline-First Sync", subtitle: "Local database caching & API sync" },
      ],
    };
  }

  // 4. Software Development Subpages
  if (
    catSlug.includes("saas") ||
    catSlug.includes("erp") ||
    catSlug.includes("cloud") ||
    srvSlug === "software-development"
  ) {
    return {
      headline: "NEED CUSTOM SOFTWARE?",
      badge: "Enterprise SaaS & Cloud Systems",
      pitch: "Streamline complex operations with custom ERPs, CRMs, and robust cloud microservices engineered to scale without bottlenecks.",
      accentColor: "#06b6d4",
      chips: [
        { icon: "Cpu", theme: "chipIconZap", title: "Custom Cloud Architecture", subtitle: "Built specifically for your business logic" },
        { icon: "ShieldCheck", theme: "chipIconShield", title: "Enterprise-Grade Security", subtitle: "Zero-vulnerability architecture & APIs" },
        { icon: "TrendingUp", theme: "chipIconTarget", title: "Infinite Scalability", subtitle: "Engineered to handle high-volume spikes" },
        { icon: "Headphones", theme: "chipIconSupport", title: "24/7 Dedicated Support", subtitle: "Direct access to senior tech leads" },
      ],
    };
  }

  // 5. Logo & Brand Identity Subpages
  if (
    catSlug.includes("logo") ||
    catSlug.includes("brand") ||
    catSlug.includes("typography") ||
    srvSlug === "logo-designing"
  ) {
    return {
      headline: "NEED A BRAND IDENTITY?",
      badge: "Timeless Identity & Logo Systems",
      pitch: "Craft memorable brand identities, custom typography, and comprehensive design systems that command immediate industry respect.",
      accentColor: "#f43f5e",
      chips: [
        { icon: "Sparkles", theme: "chipIconZap", title: "100% Bespoke Concepts", subtitle: "Handcrafted identity, zero templates" },
        { icon: "Layers", theme: "chipIconTarget", title: "Brand Design Systems", subtitle: "Comprehensive color & typography kits" },
        { icon: "CheckCircle2", theme: "chipIconShield", title: "Full Vector Asset Suite", subtitle: "Print & digital ready (SVG, AI, EPS)" },
        { icon: "Award", theme: "chipIconSupport", title: "Timeless Brand Appeal", subtitle: "Engineered to command market authority" },
      ],
    };
  }

  // 6. Main Digital Marketing Page
  if (srvSlug === "digital-marketing") {
    return {
      headline: "NEED DIGITAL MARKETING?",
      badge: "Revenue-Driven Growth",
      pitch: "Turn search engines and social algorithms into your 24/7 revenue acquisition engine with proven tactical campaigns.",
      accentColor: "#8b5cf6",
      chips: [
        { icon: "TrendingUp", theme: "chipIconZap", title: "Top Search Rankings", subtitle: "Multi-channel organic visibility" },
        { icon: "Target", theme: "chipIconTarget", title: "High-Intent Lead Funnels", subtitle: "Turn cold prospects into paying clients" },
        { icon: "Award", theme: "chipIconShield", title: "Authority Brand Building", subtitle: "Position as the clear industry leader" },
        { icon: "Headphones", theme: "chipIconSupport", title: "Transparent ROI Reports", subtitle: "Full attribution on every dollar" },
      ],
    };
  }

  // General fallback
  const resolvedTitle = catName || srvName || "A DIGITAL SOLUTION";
  return {
    headline: `NEED ${resolvedTitle.toUpperCase()}?`,
    badge: "Engineered For Rapid Growth",
    pitch: "Elevate your enterprise with Sanmora's elite software engineering, visual aesthetics, and performance optimization.",
    accentColor: service?.color || "#7c3aed",
    chips: [
      { icon: "Zap", theme: "chipIconZap", title: "Sub-Second Performance", subtitle: "Engineered for speed and high conversions" },
      { icon: "Target", theme: "chipIconTarget", title: "Conversion-Obsessed UX", subtitle: "Crafted to turn visitors into active clients" },
      { icon: "ShieldCheck", theme: "chipIconShield", title: "Enterprise Reliability", subtitle: "Robust, clean, production-grade code" },
      { icon: "Headphones", theme: "chipIconSupport", title: "24/7 Dedicated Support", subtitle: "Direct access to senior tech leads" },
    ],
  };
}

export default function PendulumCta({
  service,
  category,
  titleOverride,
  subtextOverride,
  customChips,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const data = getPendulumData(service, category);

  const headline = titleOverride || data.headline;
  const pitch = subtextOverride || data.pitch;
  const badge = data.badge;
  const chips = customChips || data.chips;

  const phoneNumber = "+91 87800 05326";
  const rawPhone = "918780005326";
  const inquiryText = encodeURIComponent(
    `Hello Sanmora Team, I am interested in inquiring about ${category?.name || service?.name || "your digital solutions"}.`
  );

  // Auto-flip every 5.5 seconds unless user is actively hovering/interacting
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5500);

    return () => clearInterval(timer);
  }, [isHovered]);

  const handleFlipToggle = (e) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  return (
    <section className={styles.pendulumSection} aria-label="Interactive Service CTA">
      {/* Background Ambient Glow */}
      <div
        className={styles.ambientGlow}
        style={{
          background: `radial-gradient(circle, ${data.accentColor}25 0%, transparent 70%)`,
        }}
      />

      {/* ── Background Kinetic Typography Marquee (GPU Accelerated, Zero Lag) ── */}
      <div className={styles.bgTypographyLayer} aria-hidden="true">
        <div className={styles.marqueeRow}>
          <div className={styles.marqueeTrackLeft}>
            <span className={styles.marqueeText}>✦ SANMORA TECH SOLUTIONS</span>
            <span className={`${styles.marqueeText} ${styles.marqueeTextSolid}`}>SPEED & CONVERSIONS</span>
            <span className={styles.marqueeText}>✦ ENTERPRISE ARCHITECTURE</span>
            <span className={`${styles.marqueeText} ${styles.marqueeTextSolid}`}>HIGH-PERFORMANCE WEB</span>
            <span className={styles.marqueeText}>✦ SANMORA TECH SOLUTIONS</span>
            <span className={`${styles.marqueeText} ${styles.marqueeTextSolid}`}>SPEED & CONVERSIONS</span>
            <span className={styles.marqueeText}>✦ ENTERPRISE ARCHITECTURE</span>
            <span className={`${styles.marqueeText} ${styles.marqueeTextSolid}`}>HIGH-PERFORMANCE WEB</span>
          </div>
        </div>
        <div className={styles.marqueeRow}>
          <div className={styles.marqueeTrackRight}>
            <span className={`${styles.marqueeText} ${styles.marqueeTextSolid}`}>✦ SCALABLE APIS</span>
            <span className={styles.marqueeText}>NEXT-GEN DIGITAL PRODUCTS</span>
            <span className={`${styles.marqueeText} ${styles.marqueeTextSolid}`}>✦ ZERO DOWNTIME</span>
            <span className={styles.marqueeText}>RAPID SHIPMENT & SUPPORT</span>
            <span className={`${styles.marqueeText} ${styles.marqueeTextSolid}`}>✦ SCALABLE APIS</span>
            <span className={styles.marqueeText}>NEXT-GEN DIGITAL PRODUCTS</span>
            <span className={`${styles.marqueeText} ${styles.marqueeTextSolid}`}>✦ ZERO DOWNTIME</span>
            <span className={styles.marqueeText}>RAPID SHIPMENT & SUPPORT</span>
          </div>
        </div>
      </div>

      {/* ── Background Tech Radar Rings ── */}
      <div className={styles.radarContainer} aria-hidden="true">
        <div className={styles.radarRing1} />
        <div className={styles.radarRing2} />
        <div className={styles.radarRing3} />
      </div>

      {/* Header Label */}
      

      {/* ── Main Stage Area: Side Cards + Center Pendulum ── */}
      <div className={styles.stageWrapper}>

        {/* Left Side Floating Trust Chips */}
        <div className={styles.sideColumn}>
          {chips[0] && (
            <div className={`${styles.floatingChip} ${styles.floatAnim1}`}>
              <div className={`${styles.chipIconBox} ${styles[chips[0].theme] || styles.chipIconZap}`}>
                {renderChipIcon(chips[0].icon)}
              </div>
              <div>
                <div className={styles.chipTitle}>{chips[0].title}</div>
                <div className={styles.chipSubtitle}>{chips[0].subtitle}</div>
              </div>
            </div>
          )}

          {chips[1] && (
            <div className={`${styles.floatingChip} ${styles.floatAnim2}`}>
              <div className={`${styles.chipIconBox} ${styles[chips[1].theme] || styles.chipIconTarget}`}>
                {renderChipIcon(chips[1].icon)}
              </div>
              <div>
                <div className={styles.chipTitle}>{chips[1].title}</div>
                <div className={styles.chipSubtitle}>{chips[1].subtitle}</div>
              </div>
            </div>
          )}
        </div>

        {/* Central Pendulum Rig */}
        <div className={styles.pendulumStage}>
          {/* Ceiling Mount */}
          <div className={styles.ceilingMount}>
            <div className={styles.mountPlate}>
              <span className={styles.mountRivet} />
              <span className={styles.mountRivet} />
            </div>
            <div className={styles.mountHook} />
          </div>

          {/* Swinging Arm */}
          <div
            className={`${styles.pendulumArm} ${isHovered ? styles.isHovered : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleFlipToggle}
            title="Click to flip tag"
          >
            {/* Cord */}
            <div className={styles.suspensionCord}>
              <div className={styles.cordCarabiner} />
            </div>

            {/* 3D Double-Sided Flipping Tag */}
            <div className={styles.tagCardContainer}>
              <div className={`${styles.tagCardFlipper} ${isFlipped ? styles.isFlipped : ""}`}>
                
                {/* ── FRONT FACE ── */}
                <div className={`${styles.cardFace} ${styles.faceFront}`}>
                  {/* Top Eyelet */}
                  <div className={styles.cardEyeletWrapper}>
                    <div className={styles.cardEyelet} />
                  </div>

                  <div className={styles.frontTopBar}>
                    <div className={styles.brandPill}>
                      <img
                        src="/logo/sanmora-logo.png"
                        alt="Sanmora"
                        className={styles.brandLogoSmall}
                      />
                      <span className={styles.brandTagText}>Sanmora Tech</span>
                    </div>
                    <span className={styles.frontCategoryBadge} style={{ color: data.accentColor, background: `${data.accentColor}12` }}>
                      {badge}
                    </span>
                  </div>

                  <div className={styles.frontBody}>
                    <h3 className={styles.frontHeadline}>
                      {headline}
                    </h3>
                    <p className={styles.frontPitch}>
                      {pitch}
                    </p>
                  </div>

                  <div className={styles.frontFooter}>
                    <button
                      type="button"
                      className={styles.flipTriggerBtn}
                      onClick={handleFlipToggle}
                      aria-label="Flip for direct sales and phone number"
                    >
                      <span>For Sales & Direct Contact</span>
                      <svg
                        className={styles.flipIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                      </svg>
                    </button>
                    <span className={styles.flipSubHint}>
                      ↻ Tap or hover card to flip
                    </span>
                  </div>
                </div>

                {/* ── BACK FACE (Sales & Contact) ── */}
                <div className={`${styles.cardFace} ${styles.faceBack}`}>
                  {/* Top Eyelet */}
                  <div className={styles.cardEyeletWrapper}>
                    <div className={styles.cardEyelet} />
                  </div>

                  <div className={styles.backTopBar}>
                    <div className={styles.liveBeacon}>
                      <span className={styles.beaconDot} />
                      <span>Sales Desk Active</span>
                    </div>
                    <span className={styles.frontCategoryBadge}>
                      Instant Connect
                    </span>
                  </div>

                  <div>
                    <h4 className={styles.backTitle}>Ready To Scale?</h4>
                    <p className={styles.backSubtitle}>
                      Speak directly with our senior engineering & growth leads:
                    </p>
                  </div>

                  {/* Highlight Phone Box */}
                  <div className={styles.phoneHighlightBox}>
                    <span className={styles.phoneLabel}>Direct Hotline / WhatsApp</span>
                    <a
                      href={`tel:${rawPhone}`}
                      className={styles.phoneNumber}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>{phoneNumber}</span>
                    </a>
                    <span className={styles.phoneOfficeBadge}>
                      India Office • Global Delivery
                    </span>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className={styles.backActionGrid} onClick={(e) => e.stopPropagation()}>
                    <a
                      href={`tel:${rawPhone}`}
                      className={styles.callNowBtn}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>Call Sales Directly</span>
                    </a>

                    <a
                      href={`https://wa.me/${rawPhone}?text=${inquiryText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappBtn}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12.017 0C5.385 0 0 5.339 0 11.923c0 2.107.551 4.165 1.6 5.975L0 24l6.335-1.644c1.731.935 3.678 1.427 5.674 1.427 6.633 0 12.018-5.337 12.018-11.922C24.027 5.34 18.647 0 12.017 0zm.019 21.902c-1.792 0-3.553-.477-5.1-1.378l-.365-.213-3.793.985.999-3.659-.235-.371a9.78 9.78 0 01-1.503-5.263c.001-5.4 4.416-9.792 9.833-9.792 2.623 0 5.09 1.011 6.945 2.85 1.854 1.839 2.875 4.288 2.872 6.897-.003 5.4-4.417 9.792-9.83 9.792zM17.37 14.54c-.292-.144-1.727-.842-1.993-.938-.266-.096-.46-.144-.653.144-.193.288-.748.938-.918 1.13-.17.192-.34.216-.632.072-.292-.144-1.232-.448-2.347-1.43-.867-.764-1.453-1.708-1.624-1.995-.17-.287-.018-.442.128-.585.13-.13.292-.336.438-.504.146-.168.194-.288.292-.48.097-.192.048-.36-.024-.504-.073-.144-.653-1.554-.895-2.125-.236-.557-.497-.482-.678-.49-.175-.008-.376-.01-.577-.01s-.527.074-.803.37c-.276.297-1.054 1.018-1.054 2.484 0 1.466 1.08 2.883 1.23 3.076.15.193 2.125 3.208 5.148 4.492.719.306 1.28.489 1.718.627.722.227 1.38.195 1.9.117.58-.086 1.728-.696 1.97-.1.242-.51.242-.947.168-1.024-.074-.076-.27-.12-.562-.264z" />
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </a>

                    <Link
                      href={`/consultation?service=${encodeURIComponent(category?.name || service?.name || "General")}`}
                      className={styles.consultationLink}
                    >
                      <span>Book Free Consultation</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  <button
                    type="button"
                    className={styles.flipBackBtn}
                    onClick={handleFlipToggle}
                  >
                    <span>↻ Back to Service Overview</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Dynamic Floor Shadow Synchronized with Swing */}
          <div className={styles.pendulumFloorShadow} />
        </div>

        {/* Right Side Floating Trust Chips */}
        <div className={styles.sideColumn}>
          {chips[2] && (
            <div className={`${styles.floatingChip} ${styles.floatAnim2}`}>
              <div className={`${styles.chipIconBox} ${styles[chips[2].theme] || styles.chipIconShield}`}>
                {renderChipIcon(chips[2].icon)}
              </div>
              <div>
                <div className={styles.chipTitle}>{chips[2].title}</div>
                <div className={styles.chipSubtitle}>{chips[2].subtitle}</div>
              </div>
            </div>
          )}

          {chips[3] && (
            <div className={`${styles.floatingChip} ${styles.floatAnim1}`}>
              <div className={`${styles.chipIconBox} ${styles[chips[3].theme] || styles.chipIconSupport}`}>
                {renderChipIcon(chips[3].icon)}
              </div>
              <div>
                <div className={styles.chipTitle}>{chips[3].title}</div>
                <div className={styles.chipSubtitle}>{chips[3].subtitle}</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
