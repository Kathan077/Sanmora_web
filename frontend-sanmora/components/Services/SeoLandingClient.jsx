"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/Home/ParticleBackground";
import IconRenderer from "@/components/Shared/IconRenderer";
import styles from "./SeoLandingClient.module.css";

const DISPOSABLE_DOMAINS = [
  "mailinator.com", "tempmail.com", "temp-mail.org", "10minutemail.com",
  "yopmail.com", "guerrillamail.com", "dispostable.com", "getairmail.com",
  "maildrop.cc", "trashmail.com", "mailnesia.com", "temp-mail.io", "fakemailgenerator.com",
  "generator.email", "disposable.com", "tempmailaddress.com", "throwawaymail.com"
];

export default function SeoLandingClient({ pageData }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Lead Capture Form States
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  if (!pageData) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "8rem 5%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A" }}>Page not found</h2>
          <p style={{ color: "#64748B" }}>The requested page details could not be located.</p>
          <Link href="/services" style={{ marginTop: "8px", padding: "12px 28px", background: "#0F172A", color: "white", borderRadius: "10px", textDecoration: "none", fontWeight: 700 }}>
            ← Back to Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const {
    slug,
    title,
    parentService,
    parentSlug,
    color,
    icon,
    headline,
    subtitle,
    overview,
    features,
    benefits,
    techStack,
    faqs
  } = pageData;

  const handleFieldChange = (field, value, setter) => {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    
    // Full Name
    if (!fullName || fullName.trim().length < 2) {
      tempErrors.fullName = "Name must be at least 2 characters long.";
    } else if (!/^[A-Za-z\s\-']+$/.test(fullName)) {
      tempErrors.fullName = "Name can only contain letters and spaces.";
    }
    
    // Company Name
    if (!companyName || companyName.trim().length === 0) {
      tempErrors.companyName = "Company name is required.";
    }
    
    // Email ID
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailId) {
      tempErrors.emailId = "Email address is required.";
    } else if (!emailRegex.test(emailId)) {
      tempErrors.emailId = "Please enter a valid email address.";
    } else {
      const parts = emailId.split("@");
      const username = parts[0].toLowerCase();
      const domain = parts[1].toLowerCase();

      const fakePrefixes = ["abc", "xyz", "qwe", "asd", "zxc", "jkl", "qwerty", "test", "testing", "dummy", "example", "fake", "demo", "noreply", "no-reply", "null", "none", "temp"];
      const prefixPattern = new RegExp(`^(${fakePrefixes.join("|")})[._-]?\\d*$`);
      const forbiddenSubstrings = ["testing", "fakeemail", "exampleemail", "dummyemail"];

      if (DISPOSABLE_DOMAINS.includes(domain)) {
        tempErrors.emailId = "Temporary email addresses are not allowed.";
      } else if (
        prefixPattern.test(username) || 
        forbiddenSubstrings.some(sub => username.includes(sub)) || 
        /^(.)\1{2,}$/.test(username) || 
        /^\d+$/.test(username)
      ) {
        tempErrors.emailId = "Please enter a genuine business email address.";
      }
    }
    
    // Contact No
    const cleanPhone = contactNo.replace(/\s|-|\(|\)/g, "");
    const phoneDigitsOnly = contactNo.replace(/\D/g, "");
    if (!contactNo) {
      tempErrors.contactNo = "Contact number is required.";
    } else if (!/^\+?[0-9\s\-\(\)]+$/.test(contactNo)) {
      tempErrors.contactNo = "Please enter a valid phone number.";
    } else {
      const isIndianLength = phoneDigitsOnly.length === 10;
      const hasIndianPrefix = cleanPhone.startsWith("+91") || cleanPhone.startsWith("91") || (cleanPhone.startsWith("0") && phoneDigitsOnly.length === 11);
      
      if (isIndianLength || hasIndianPrefix) {
        const indianRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
        if (!indianRegex.test(cleanPhone)) {
          tempErrors.contactNo = "Enter a valid 10-digit Indian mobile number.";
        }
      } else {
        if (phoneDigitsOnly.length < 7 || phoneDigitsOnly.length > 15) {
          tempErrors.contactNo = "Contact number must contain between 7 and 15 digits.";
        }
      }
    }

    setErrors(tempErrors);
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/consultation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          companyName,
          emailId,
          contactNo,
          serviceName: `${headline} (SEO Landing Page)`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFullName("");
        setCompanyName("");
        setEmailId("");
        setContactNo("");
        setErrors({});
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrorMessage("Could not connect to the server. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured FAQ Schema for rich search results
  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className={styles.page}>
      <ParticleBackground />

      {/* Structured SEO Schema Markup */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Decorative Ambient Radial Glow */}
      <div 
        className={styles.ambientGlowPrimary} 
        style={{ background: `radial-gradient(circle, ${color}16 0%, transparent 70%)` }} 
      />
      <div className={styles.ambientGlowSecondary} />

      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Breadcrumbs */}
            <div className={styles.breadcrumb}>
              <Link href="/services" className={styles.breadcrumbLink}>
                Services
              </Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <Link href={`/services/${parentSlug}`} className={styles.breadcrumbLink}>
                {parentService}
              </Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbActive}>{headline}</span>
            </div>

            <h1 className={styles.headline}>
              <span className={styles.blinkWord}>{headline}</span>
            </h1>

            {subtitle && (
              <p className={styles.heroSubtitle}>{subtitle}</p>
            )}

            <p className={styles.heroDesc}>
              {overview}
            </p>

            <div className={styles.heroCtaGroup}>
              <button 
                onClick={() => {
                  const formElement = document.getElementById("leadFormContainer");
                  formElement?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={styles.btnPrimary}
              >
                <span style={{ position: "relative", zIndex: 2 }}>Get Free Consultation</span>
                <span className={styles.btnShine}></span>
                <svg className={styles.btnArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <Link href="/case-studies" className={styles.btnSecondary}>
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Offerings (Features) ── */}
      <section className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Key Offerings & Focus</h2>
          <p className={styles.sectionSubtitle}>
            Specific capabilities designed to target and resolve your core technological bottlenecks.
          </p>
        </div>

        <div className={styles.twoColRow}>
          {/* Feature List Column */}
          <div className={styles.featuresList}>
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                className={styles.featureCard}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              >
                <span className={styles.bulletDot} style={{ background: `linear-gradient(135deg, ${color} 0%, #06b6d4 100%)` }} />
                <p className={styles.featureText}>{feat}</p>
              </motion.div>
            ))}
          </div>

          {/* Value Proposition Box */}
          <motion.div
            style={{ 
              background: "#FFFFFF", 
              border: `1px solid rgba(0,0,0,0.05)`, 
              borderRadius: "24px", 
              padding: "40px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
            }}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: "inline-flex", padding: "12px", background: `${color}15`, color: color, borderRadius: "12px", marginBottom: "20px" }}>
              <IconRenderer icon={icon} style={{ width: 24, height: 24 }} />
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", margin: "0 0 12px" }}>Why Partner With Us?</h3>
            <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 24px" }}>
              At Sanmora Studio, we combine specialized skills with direct communication. You work directly with engineers and planners to ship performant, high-yielding interfaces.
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {benefits.map((benefit, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: 600 }}>{benefit}</span>
                </div>
              ))}
            </div>

            {techStack && techStack.length > 0 && (
              <>
                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", margin: "24px 0 12px" }}>Technologies We Use</h4>
                <div className={styles.techGrid}>
                  {techStack.map((tech, idx) => (
                    <span key={idx} className={styles.techBadge} style={{ border: `1px solid ${color}25` }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ Accordion Section ── */}
      {faqs && faqs.length > 0 && (
        <section className={styles.sectionContainer} style={{ background: "rgba(0,0,0,0.01)", borderTop: "1px solid rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.02)" }}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to know about our approach, turnaround time, and technical standards.
            </p>
          </div>

          <div className={styles.faqContainer}>
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                  style={{ borderLeft: isOpen ? `4px solid ${color}` : "1px solid rgba(0,0,0,0.05)" }}
                >
                  <button 
                    className={styles.faqTrigger}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.faqQuestion}>{faq.question}</span>
                    <svg 
                      className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ""}`} 
                      style={{ color: isOpen ? color : "#64748B" }}
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className={styles.faqAnswerWrapper}
                      >
                        <p className={styles.faqAnswer}>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Lead Capture / Consultation Form ── */}
      <section className={styles.sectionContainer} id="leadFormContainer">
        <motion.div 
          className={styles.ctaBox}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-85px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Info Side */}
          <div>
            <h2 className={styles.ctaHeading}>Let&apos;s Build Something Premium</h2>
            <p className={styles.ctaDesc}>
              Ready to double your conversions and rank higher? Leave a message below, and our experts will schedule a free consult calls to discuss strategy.
            </p>

            <div className={styles.contactPointList}>
              <div className={styles.contactPointItem}>
                <div className={styles.contactIconBg} style={{ color: color, background: `${color}10` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h5 className={styles.contactLabel}>Email Us</h5>
                  <p className={styles.contactValue}>info@sanmorastudio.com</p>
                </div>
              </div>
              
              <div className={styles.contactPointItem}>
                <div className={styles.contactIconBg} style={{ color: color, background: `${color}10` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h5 className={styles.contactLabel}>Call Our Experts</h5>
                  <p className={styles.contactValue}>+91 95864 74211</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div>
            <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  className={styles.inputField} 
                  placeholder="John Doe" 
                  value={fullName}
                  onChange={(e) => handleFieldChange("fullName", e.target.value, setFullName)}
                />
                {errors.fullName && (
                  <span style={{ color: "#ef4444", fontSize: "0.75rem", fontWeight: 650 }}>
                    ⚠️ {errors.fullName}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="companyName">Company Name</label>
                <input 
                  type="text" 
                  id="companyName" 
                  className={styles.inputField} 
                  placeholder="Acme Corp" 
                  value={companyName}
                  onChange={(e) => handleFieldChange("companyName", e.target.value, setCompanyName)}
                />
                {errors.companyName && (
                  <span style={{ color: "#ef4444", fontSize: "0.75rem", fontWeight: 650 }}>
                    ⚠️ {errors.companyName}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="emailId">Business Email</label>
                <input 
                  type="email" 
                  id="emailId" 
                  className={styles.inputField} 
                  placeholder="john@example.com" 
                  value={emailId}
                  onChange={(e) => handleFieldChange("emailId", e.target.value, setEmailId)}
                />
                {errors.emailId && (
                  <span style={{ color: "#ef4444", fontSize: "0.75rem", fontWeight: 650 }}>
                    ⚠️ {errors.emailId}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="contactNo">Contact Number</label>
                <input 
                  type="tel" 
                  id="contactNo" 
                  className={styles.inputField} 
                  placeholder="e.g. +91 98765 43210" 
                  value={contactNo}
                  onChange={(e) => handleFieldChange("contactNo", e.target.value, setContactNo)}
                />
                {errors.contactNo && (
                  <span style={{ color: "#ef4444", fontSize: "0.75rem", fontWeight: 650 }}>
                    ⚠️ {errors.contactNo}
                  </span>
                )}
              </div>

              {submitStatus === "success" && (
                <div className={styles.successMessage}>
                  ✓ Request submitted successfully! We will contact you shortly.
                </div>
              )}

              {submitStatus === "error" && (
                <div style={{ color: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.08)", padding: "12px", borderRadius: "8px", fontSize: "0.85rem", border: "1px dashed rgba(239, 68, 68, 0.3)", textAlign: "center", fontWeight: 600 }}>
                  ✗ {errorMessage}
                </div>
              )}

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={isSubmitting}
                style={{ background: `linear-gradient(135deg, ${color} 0%, #06b6d4 100%)`, boxShadow: `0 10px 20px -6px ${color}35` }}
              >
                {isSubmitting ? "Submitting..." : "Send Consultation Request"}
                {!isSubmitting && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
