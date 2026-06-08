"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/Home/ParticleBackground";
import ServiceVisual from "@/components/Services/ServiceVisual";
import { getCategoryDetailPrimaryImagePath, getCategoryDetailSecondaryImagePath } from "@/components/Services/serviceImages";
import styles from "@/app/services/services.module.css";

export default function CategoryDetailClient({ service, category }) {
  if (!service || !category) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "8rem 5%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A" }}>Page not found</h2>
          <p style={{ color: "#64748B" }}>This category could not be located.</p>
          <Link href="/services" style={{ marginTop: "8px", padding: "12px 28px", background: "#0F172A", color: "white", borderRadius: "10px", textDecoration: "none", fontWeight: 700 }}>
            ← Back to Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { name: serviceName, slug: serviceSlug, color } = service;
  const { name: catName, description: catDesc } = category;
  const categoryPrimaryImage = getCategoryDetailPrimaryImagePath(serviceSlug, category.slug);
  const categorySecondaryImage = getCategoryDetailSecondaryImagePath(serviceSlug, category.slug);
  const catNameParts = catName.split(" ");

  const heroText = category.longDescription ?? catDesc;
  const deliverOverview = category.overview ?? `Specialized ${catName.toLowerCase()} solutions tailored to your goals.`;
  const impactOverview = category.impactOverview ?? "Measurable outcomes built for your industry and growth stage.";

  const featureList = category.features?.length ? category.features : (service.features ?? []);
  const techList = category.techStack?.length ? category.techStack : (service.techStack ?? []);
  const benefitList = category.benefits?.length ? category.benefits : (service.benefits ?? []);

  return (
    <div className={styles.page}>
      <ParticleBackground />

      <div className={styles.ambientGlowPrimary} style={{ background: `radial-gradient(circle, ${color}18 0%, transparent 70%)` }} />
      <div className={styles.ambientGlowSecondary} />
      <div className={styles.ambientGlowTertiary} />

      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
              <Link href="/services" className={styles.breadcrumbLink}>
                Services
              </Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <Link href={`/services/${serviceSlug}`} className={styles.breadcrumbLink}>
                {serviceName}
              </Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbActive}>{catName}</span>
            </div>

            <h1 className={styles.headline}>
              <span className={styles.blinkWord}>{catName}</span>
            </h1>

            <p className={styles.heroDesc}>
              {heroText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Detail Content ── */}
      <section className={styles.workspaceSection}>
        <div className={styles.servicesListContainer} style={{ gap: "60px" }}>

          {/* Row 1 — Illustration + What We Deliver */}
          <motion.div
            className={styles.serviceRow}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <ServiceVisual
              src={categoryPrimaryImage}
              alt={`${catName} — ${serviceName}`}
              priority
            />

            {/* What We Deliver */}
            <div className={styles.serviceContentBox}>
              <h2 className={styles.serviceRowTitle}>What We Deliver</h2>
              <p className={styles.serviceRowSubtitle}>{deliverOverview}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", marginBottom: "36px" }}>
                {featureList.length > 0 ? featureList.map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "16px 20px", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)", boxShadow: "0 0 8px rgba(124, 58, 237, 0.4), 0 0 12px rgba(6, 182, 212, 0.2)", flexShrink: 0, marginTop: "6px" }} />
                    <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#334155", margin: 0, lineHeight: 1.5 }}>{feat}</p>
                  </div>
                )) : (
                  <p style={{ color: "#94a3b8" }}>Detailed features coming soon.</p>
                )}
              </div>

              <Link
                href={`/consultation?service=${encodeURIComponent(catName)}`}
                className={styles.serviceRowCta}
              >
                <span style={{ position: "relative", zIndex: 2 }}>Get a Free Consultation</span>
                <span className={styles.btnShine} />
                <svg className={styles.serviceRowCtaArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Row 2 — Benefits + Tech Stack */}
          <motion.div
            className={styles.serviceRowReverse}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <ServiceVisual
              src={categorySecondaryImage}
              alt={`${catName} technology stack`}
            />

            {/* Business Benefits + Tech */}
            <div className={styles.serviceContentBox}>
              <h2 className={styles.serviceRowTitle}>Why It Matters</h2>
              <p className={styles.serviceRowSubtitle}>{impactOverview}</p>

              {/* Benefits */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", marginBottom: "28px" }}>
                {benefitList.map((benefit, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)", boxShadow: "0 0 8px rgba(124, 58, 237, 0.4), 0 0 12px rgba(6, 182, 212, 0.2)", flexShrink: 0, marginTop: "8px" }} />
                    <p style={{ fontSize: "0.95rem", color: "#475569", margin: 0, lineHeight: 1.6, fontWeight: 500 }}>{benefit}</p>
                  </div>
                ))}
              </div>

              {/* Tech Stack badges */}
              {techList.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {techList.map((tech, i) => (
                    <span key={i} style={{ padding: "8px 16px", background: "#FFFFFF", border: "1px solid rgba(124, 58, 237, 0.15)", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
