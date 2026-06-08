"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/Home/ParticleBackground";
import ServiceVisual from "@/components/Services/ServiceVisual";
import { getCategoryImagePath } from "@/components/Services/serviceImages";
import styles from "@/app/services/services.module.css";

export default function SubServiceClient({ service }) {
  if (!service) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "8rem 5%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A" }}>Service not found</h2>
          <p style={{ color: "#64748B" }}>The requested service could not be located.</p>
          <Link href="/services" style={{ marginTop: "8px", padding: "12px 28px", background: "#0F172A", color: "white", borderRadius: "10px", textDecoration: "none", fontWeight: 700 }}>
            ← Back to Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { name, slug, color, description, subtitle, categories } = service;

  return (
    <div className={styles.page}>
      <ParticleBackground />

      <div
        className={styles.ambientGlowPrimary}
        style={{ background: `radial-gradient(circle, ${color}18 0%, transparent 70%)` }}
      />
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
              <span className={styles.breadcrumbActive}>{name}</span>
            </div>

            <h1 className={styles.headline}>
              <span className={styles.blinkWord}>{name}</span>
            </h1>

            {subtitle && (
              <p className={styles.heroSubtitle}>{subtitle}</p>
            )}

            <p className={styles.heroDesc}>{description}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Specializations ── */}
      <section className={styles.workspaceSection}>
        <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 5%" }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 900, color: "#0F172A" }}>
            Specializations
          </h2>
          <p style={{ color: "#64748B", marginTop: "12px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            Each focus area has its own deliverables, tools, and outcomes — choose the path that matches your project.
          </p>
        </div>

        <div className={styles.servicesListContainer}>
          {categories && categories.length > 0 ? (
            categories.map((cat, index) => {
              const isReverse = index % 2 !== 0;
              const catFeatures = cat.features?.slice(0, 4) ?? [];
              const bodyText = cat.longDescription ?? cat.description;

              return (
                <motion.div
                  key={cat.slug}
                  className={isReverse ? styles.serviceRowReverse : styles.serviceRow}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <ServiceVisual
                    src={getCategoryImagePath(slug, cat.slug)}
                    alt={`${cat.name} — ${name}`}
                  />

                  <div className={styles.serviceContentBox}>
                    <h2 className={styles.serviceRowTitle}>{cat.name}</h2>
                    <p className={styles.serviceRowSubtitle}>{cat.description}</p>
                    <p className={styles.serviceRowDesc}>{bodyText}</p>

                    {catFeatures.length > 0 && (
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                        {catFeatures.map((feat, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "#475569", lineHeight: 1.5 }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)", boxShadow: "0 0 8px rgba(124, 58, 237, 0.4), 0 0 12px rgba(6, 182, 212, 0.2)", flexShrink: 0, marginTop: "6px" }} />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`/services/${slug}/${cat.slug}`}
                      className={styles.serviceRowCta}
                    >
                      <span style={{ position: "relative", zIndex: 2 }}>View Details</span>
                      <span className={styles.btnShine} />
                      <svg className={styles.serviceRowCtaArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>
              No categories available for this service yet.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
