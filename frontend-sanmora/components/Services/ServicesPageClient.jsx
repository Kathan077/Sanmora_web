"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/Home/ParticleBackground";
import { servicesData } from "@/components/Navbar/servicesData";
import blogStyles from "@/components/Blog/BlogClient.module.css";
import servicesStyles from "@/app/services/services.module.css";

export default function ServicesPageClient() {
  return (
    <div className={servicesStyles.page}>
      <ParticleBackground />

      {/* Floating Ambient Glows */}
      <div className={servicesStyles.ambientGlowPrimary}></div>
      <div className={servicesStyles.ambientGlowSecondary}></div>
      <div className={servicesStyles.ambientGlowTertiary}></div>

      <Navbar />

      {/* Page Hero */}
      <section className={blogStyles.heroSection}>
        <div className={blogStyles.container}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={blogStyles.heroContent}
          >
            <div className={blogStyles.breadcrumb}>
              <Link href="/">Home</Link>
              <span className={blogStyles.breadcrumbSeparator}>/</span>
              <span className={blogStyles.breadcrumbActive}>Services</span>
            </div>

            <h1 className={blogStyles.headline}>
              <span className={blogStyles.blinkWord}>OUR SERVICES</span>
            </h1>

            <p className={blogStyles.heroDesc}>
              End-to-end digital solutions crafted to elevate your brand, accelerate growth, and deliver lasting results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alternating Row Services Layout */}
      <section className={servicesStyles.workspaceSection}>
        <div className={servicesStyles.servicesListContainer}>
          {servicesData.map((item, index) => {
            const isReverse = index % 2 !== 0;
            return (
              <motion.div
                key={item.id}
                className={isReverse ? servicesStyles.serviceRowReverse : servicesStyles.serviceRow}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className={servicesStyles.serviceVisualBox}>
                  <div className={servicesStyles.serviceImageCard}>
                    <img
                      src={
                        item.slug === "website-development" ? "/images/services/WebDevlopment.jpeg" :
                        item.slug === "digital-marketing" ? "/images/services/Digital Marketing.jpeg" :
                        item.slug === "software-development" ? "/images/services/Software Devlopment.jpeg" :
                        item.slug === "application-development" ? "/images/services/Android Devlopment.jpeg" :
                        item.slug === "logo-designing" ? "/images/services/Logo Designing.jpeg" :
                        `/images/services/${item.slug}.svg`
                      }
                      alt={item.name}
                      className={servicesStyles.serviceImage}
                    />
                  </div>
                </div>

                {/* Clean Typographic Content Block */}
                <div className={servicesStyles.serviceContentBox}>
                  <h2 className={servicesStyles.serviceRowTitle}>{item.name}</h2>
                  <h4 className={servicesStyles.serviceRowSubtitle}>{item.subtitle}</h4>
                  <p className={servicesStyles.serviceRowDesc}>{item.description}</p>

                  {item.features?.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                      {item.features.slice(0, 3).map((feat, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "#475569", lineHeight: 1.5 }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)", boxShadow: "0 0 8px rgba(124, 58, 237, 0.4), 0 0 12px rgba(6, 182, 212, 0.2)", flexShrink: 0, marginTop: "6px" }} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={`/services/${item.slug}`}
                    className={servicesStyles.serviceRowCta}
                  >
                    <span style={{ position: "relative", zIndex: 2 }}>Explore Service Details</span>
                    <span className={servicesStyles.btnShine}></span>
                    <svg className={servicesStyles.serviceRowCtaArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
