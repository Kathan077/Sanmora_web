"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './DigitalGrowth.module.css';

const services = [
  { id: 1, title: "SEO Setup & Optimization", desc: "Rank higher on Google organically.", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { id: 2, title: "Google Business Profile", desc: "Dominate local search results.", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: 3, title: "Social Media Setup", desc: "Establish your brand across platforms.", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
  { id: 4, title: "Social Branding", desc: "Cohesive Instagram, Facebook & LinkedIn.", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { id: 5, title: "Content Strategy", desc: "Engaging content that converts visitors.", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" },
  { id: 6, title: "Website Optimization", desc: "Faster speeds and higher conversions.", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { id: 7, title: "Google & Meta Ads", desc: "Targeted campaigns for instant traffic.", icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" },
  { id: 8, title: "Analytics & Tracking", desc: "Data-driven decisions using GA4.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: 9, title: "Email Marketing", desc: "Nurture leads and boost retention.", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { id: 10, title: "Lead Generation", desc: "Automated funnels to capture prospects.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { id: 11, title: "Brand Identity", desc: "Logos, colors, and visual guidelines.", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
  { id: 12, title: "Reporting Dashboard", desc: "Live ROI and performance tracking.", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }
];

const processSteps = [
  { step: "01", title: "Strategy", desc: "Deep dive into your market and competitors to build a master plan." },
  { step: "02", title: "Setup", desc: "Creating and optimizing accounts, websites, and tracking tools." },
  { step: "03", title: "Growth", desc: "Executing campaigns, creating content, and driving traffic." },
  { step: "04", title: "Optimization", desc: "Analyzing data to refine targeting and scale your results." }
];

export default function DigitalGrowth() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className={styles.growthSection} id="digital-growth">
      <div className={styles.ambientGlow}></div>
      <div className={styles.ambientGlow2}></div>
      
      <div className={styles.container}>
        {/* Header Section */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.badgeWrapper}>
            <span className={styles.badge}>Digital Growth</span>
          </div>
          <h2 className={styles.title}>
            Everything Your Business Needs <br />
            <span className={styles.gradientText}>To Grow Digitally</span>
          </h2>
          <p className={styles.subtitle}>
            From SEO to social media, we build your complete digital presence. No jargon, just transparent strategies that turn clicks into customers.
          </p>
        </motion.div>

        {/* Process Timeline Section */}
        <div className={styles.processContainer}>
          <div className={styles.processLine}></div>
          <div className={styles.processGrid}>
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx} 
                className={styles.processStep}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className={styles.stepIndicator}>
                  <div className={styles.stepDot}></div>
                  <span className={styles.stepNum}>{step.step}</span>
                </div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Services Grid Section */}
        <motion.div 
          className={styles.servicesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants} className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d={service.icon}></path>
                </svg>
              </div>
              <h5 className={styles.serviceTitle}>{service.title}</h5>
              <p className={styles.serviceDesc}>{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
