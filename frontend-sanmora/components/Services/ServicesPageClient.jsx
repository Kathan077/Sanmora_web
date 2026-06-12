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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function ServicesPageClient() {
  const featuredService = servicesData[0];
  const regularServices = servicesData.slice(1);

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

      {/* Grid List Framework matching Blog layout */}
      <div className={blogStyles.blogContainer}>
        <motion.div
          className={blogStyles.blogGrid}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Featured Service */}
          {featuredService && (
            <motion.div className={blogStyles.featuredCard} variants={itemVariants}>
              <div className={blogStyles.featuredImageWrapper}>
                <img
                  src="/images/services/WebDevlopment.jpeg"
                  alt={featuredService.name}
                  className={blogStyles.featuredImage}
                />
              </div>
              <div className={blogStyles.featuredContent}>
                <div className={blogStyles.meta}>
                  <span className={blogStyles.category}>Featured Service</span>
                  <span className={blogStyles.readTime}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    Enterprise Scale
                  </span>
                </div>
                <h2 className={blogStyles.postTitle}>{featuredService.name}</h2>
                <p className={blogStyles.postExcerpt}>{featuredService.description}</p>
                <Link href={`/services/${featuredService.slug}`} className={blogStyles.readMoreBtn}>
                  Explore Service
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Regular Services */}
          {regularServices.map((item) => {
            const imageSrc =
              item.slug === "digital-marketing" ? "/images/services/Digital Marketing.jpeg" :
              item.slug === "software-development" ? "/images/services/Software Devlopment.jpeg" :
              item.slug === "application-development" ? "/images/services/Android Devlopment.jpeg" :
              item.slug === "logo-designing" ? "/images/services/Logo Designing.jpeg" :
              `/images/services/${item.slug}.svg`;

            return (
              <motion.div key={item.id} className={blogStyles.regularCard} variants={itemVariants}>
                <div className={blogStyles.regularImageWrapper}>
                  <img src={imageSrc} alt={item.name} className={blogStyles.regularImage} />
                </div>
                <div className={blogStyles.regularContent}>
                  <div className={blogStyles.meta}>
                    <span className={blogStyles.category}>Service</span>
                    <span className={blogStyles.readTime}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      Premium Solution
                    </span>
                  </div>
                  <h3 className={blogStyles.postTitle}>{item.name}</h3>
                  <p className={blogStyles.postExcerpt}>{item.description}</p>
                  <Link href={`/services/${item.slug}`} className={blogStyles.readMoreBtn}>
                    Explore Service
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
