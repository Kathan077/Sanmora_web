"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./ConsultationClient.module.css";
import servicesStyles from "@/app/services/services.module.css";
import ParticleBackground from "@/components/Home/ParticleBackground";

import { servicesData } from "@/components/Navbar/servicesData";

const DISPOSABLE_DOMAINS = [
  "mailinator.com", "tempmail.com", "temp-mail.org", "10minutemail.com",
  "yopmail.com", "guerrillamail.com", "dispostable.com", "getairmail.com",
  "maildrop.cc", "trashmail.com", "mailnesia.com", "temp-mail.io", "fakemailgenerator.com",
  "generator.email", "disposable.com", "tempmailaddress.com", "throwawaymail.com"
];

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const timer = setTimeout(() => {
        setServiceName(decodeURIComponent(serviceParam));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

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
    
    // Service Name
    if (!serviceName) {
      tempErrors.serviceName = "Please select a service of interest.";
    }
    
    // Full Name
    if (!fullName || fullName.trim().length < 2) {
      tempErrors.fullName = "Name must be at least 2 characters long.";
    } else if (!/^[A-Za-z\s\-']+$/.test(fullName)) {
      tempErrors.fullName = "Name can only contain letters, spaces, hyphens, and apostrophes.";
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
        tempErrors.emailId = "Temporary or disposable email addresses are not allowed. Please enter a genuine email.";
      } else if (
        prefixPattern.test(username) || 
        forbiddenSubstrings.some(sub => username.includes(sub)) || 
        /^(.)\1{2,}$/.test(username) || 
        /^\d+$/.test(username)
      ) {
        tempErrors.emailId = "Please enter a genuine, professional email address. Fake or placeholder emails are not allowed.";
      }
    }
    
    // Contact No
    const cleanPhone = contactNo.replace(/\s|-|\(|\)/g, ""); // strip spaces, hyphens, brackets
    const phoneDigitsOnly = contactNo.replace(/\D/g, "");
    if (!contactNo) {
      tempErrors.contactNo = "Contact number is required.";
    } else if (!/^\+?[0-9\s\-\(\)]+$/.test(contactNo)) {
      tempErrors.contactNo = "Please enter a valid phone number (digits, spaces, hyphens, brackets, or '+' only).";
    } else {
      // Check if it matches an Indian phone number format
      const isIndianLength = phoneDigitsOnly.length === 10;
      const hasIndianPrefix = cleanPhone.startsWith("+91") || cleanPhone.startsWith("91") || (cleanPhone.startsWith("0") && phoneDigitsOnly.length === 11);
      
      if (isIndianLength || hasIndianPrefix) {
        const indianRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
        if (!indianRegex.test(cleanPhone)) {
          tempErrors.contactNo = "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
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
        setErrors({});
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
              Let&apos;s discuss your project goals, technical requirements, and how we can bring your vision to life.
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
          <form onSubmit={handleSubmit} className={styles.formGrid} noValidate>
            <div className={styles.formGroupFull}>
              <label className={styles.label} htmlFor="serviceName">Service of Interest</label>
              <select 
                id="serviceName" 
                className={`${styles.input} ${errors.serviceName ? styles.inputError : ""}`} 
                value={serviceName} 
                onChange={(e) => handleFieldChange("serviceName", e.target.value, setServiceName)}
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
              {errors.serviceName && (
                <span className={styles.errorLabel}>
                  ⚠️ {errors.serviceName}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="fullName">Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                className={`${styles.input} ${errors.fullName ? styles.inputError : ""}`} 
                placeholder="John Doe" 
                value={fullName}
                onChange={(e) => handleFieldChange("fullName", e.target.value, setFullName)}
              />
              {errors.fullName && (
                <span className={styles.errorLabel}>
                  ⚠️ {errors.fullName}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="companyName">Company Name</label>
              <input 
                type="text" 
                id="companyName" 
                className={`${styles.input} ${errors.companyName ? styles.inputError : ""}`} 
                placeholder="Acme Corp" 
                value={companyName}
                onChange={(e) => handleFieldChange("companyName", e.target.value, setCompanyName)}
              />
              {errors.companyName && (
                <span className={styles.errorLabel}>
                  ⚠️ {errors.companyName}
                </span>
              )}
            </div>

            <div className={styles.formGroupFull}>
              <label className={styles.label} htmlFor="emailId">Email Address</label>
              <input 
                type="email" 
                id="emailId" 
                className={`${styles.input} ${errors.emailId ? styles.inputError : ""}`} 
                placeholder="john@example.com" 
                value={emailId}
                onChange={(e) => handleFieldChange("emailId", e.target.value, setEmailId)}
              />
              {errors.emailId && (
                <span className={styles.errorLabel}>
                  ⚠️ {errors.emailId}
                </span>
              )}
            </div>

            <div className={styles.formGroupFull}>
              <label className={styles.label} htmlFor="contactNo">Contact Number</label>
              <input 
                type="tel" 
                id="contactNo" 
                className={`${styles.input} ${errors.contactNo ? styles.inputError : ""}`} 
                placeholder="e.g. +91 98765 43210" 
                value={contactNo}
                onChange={(e) => handleFieldChange("contactNo", e.target.value, setContactNo)}
              />
              {errors.contactNo && (
                <span className={styles.errorLabel}>
                  ⚠️ {errors.contactNo}
                </span>
              )}
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
