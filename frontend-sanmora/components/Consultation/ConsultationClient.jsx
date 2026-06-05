"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./ConsultationClient.module.css";
import servicesStyles from "@/app/services/services.module.css";
import ParticleBackground from "@/components/Home/ParticleBackground";

import { servicesData } from "@/components/Navbar/servicesData";

export default function ConsultationClient() {
  const searchParams = useSearchParams();
  const [serviceName, setServiceName] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setServiceName(decodeURIComponent(serviceParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          serviceName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Clear form
        setFullName("");
        setCompanyName("");
        setEmailId("");
        setContactNo("");
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrorMessage("Could not connect to the backend server. Please verify it is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={servicesStyles.page}>
      <ParticleBackground />
      
      <div className={servicesStyles.ambientGlowPrimary} />
      <div className={servicesStyles.ambientGlowSecondary} />
      <div className={servicesStyles.ambientGlowTertiary} />

      <section className={servicesStyles.heroSection}>
        <div className={servicesStyles.heroContent}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={servicesStyles.breadcrumb}>
              <Link href="/services" className={servicesStyles.breadcrumbLink}>
                Services
              </Link>
              <span className={servicesStyles.breadcrumbSeparator}>/</span>
              <span className={servicesStyles.breadcrumbActive}>Consultation</span>
            </div>

            <h1 className={servicesStyles.headline}>
              <span className={servicesStyles.blinkWord}>FREE</span>
              <br />
              <span className={servicesStyles.blinkWord}>CONSULTATION</span>
            </h1>

            <p className={servicesStyles.heroDesc}>
              Let's discuss your project goals, technical requirements, and how we can bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      <section className={servicesStyles.workspaceSection}>
        <motion.div 
          className={styles.container}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ margin: "0 auto", marginTop: "2rem" }}
        >
          <form onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.formGroupFull}>
              <label className={styles.label} htmlFor="serviceName">Service of Interest</label>
              <select 
                id="serviceName" 
                className={styles.input} 
                value={serviceName} 
                onChange={(e) => setServiceName(e.target.value)}
                required
              >
                <option value="" disabled>Select a Service</option>
                {servicesData.map(service => (
                  <optgroup key={service.id} label={service.name}>
                    <option value={service.name}>{service.name} (General)</option>
                    {service.categories.map(cat => (
                      <option key={cat.slug} value={cat.name}>{cat.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="fullName">Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                className={styles.input} 
                required 
                placeholder="John Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="companyName">Company Name</label>
              <input 
                type="text" 
                id="companyName" 
                className={styles.input} 
                required 
                placeholder="Acme Corp" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className={styles.formGroupFull}>
              <label className={styles.label} htmlFor="emailId">Email Address</label>
              <input 
                type="email" 
                id="emailId" 
                className={styles.input} 
                required 
                placeholder="john@example.com" 
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            <div className={styles.formGroupFull}>
              <label className={styles.label} htmlFor="contactNo">Contact Number</label>
              <input 
                type="tel" 
                id="contactNo" 
                className={styles.input} 
                required 
                placeholder="+1 (555) 000-0000" 
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </div>

            {submitStatus === "success" && (
              <div className={styles.formGroupFull} style={{ color: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)", padding: "12px", borderRadius: "8px", fontSize: "14px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                ✓ Thank you! Your free consultation request has been submitted successfully. We will email you shortly.
              </div>
            )}

            {submitStatus === "error" && (
              <div className={styles.formGroupFull} style={{ color: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "12px", borderRadius: "8px", fontSize: "14px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                ✗ {errorMessage}
              </div>
            )}

            <div className={styles.formGroupFull}>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
                {!isSubmitting && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
