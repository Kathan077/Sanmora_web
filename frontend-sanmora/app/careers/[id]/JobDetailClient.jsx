"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../careers.module.css";

const DISPOSABLE_DOMAINS = [
  "mailinator.com", "tempmail.com", "temp-mail.org", "10minutemail.com",
  "yopmail.com", "guerrillamail.com", "dispostable.com", "getairmail.com",
  "maildrop.cc", "trashmail.com", "mailnesia.com", "temp-mail.io", "fakemailgenerator.com",
  "generator.email", "disposable.com", "tempmailaddress.com", "throwawaymail.com"
];

const jobsDetails = {
  "ui-ux": {
    title: "UI/UX Designer",
    type: "Full-Time",
    location: "Work in office",
    experience: "Freshers welcome",
    description: "We are looking for a UI/UX Designer who is passionate about creating clean, premium, and human-centered design experiences. Freshers are highly welcome to apply! You will work in our office, collaborating closely with developers and product managers to build sleek SaaS dashboards, mobile apps, and interactive web properties.",
    responsibilities: [
      "Collaborate on the design process: from research, wireframing, to interactive prototyping and design handoffs.",
      "Help build and maintain our premium design systems in Figma.",
      "Design fluid micro-interactions and transitions to make the web feel responsive and alive.",
      "Incorporate team and user feedback to iterate on UI designs."
    ],
    requirements: [
      "Proficiency in Figma, layouts, and typography. A portfolio showcasing UI/UX concepts is required.",
      "Freshers are welcome. Any formal training or internship in UI/UX is a big plus.",
      "Basic understanding of components, auto-layout, and design systems in Figma.",
      "Good communication and a strong desire to learn and collaborate in office."
    ],
    benefits: [
      "Competitive salary and performance bonuses.",
      "In-office mentorship from experienced senior team leads.",
      "Vibrant office culture, regular team lunches, and activities.",
      "State-of-the-art office workspace and equipment."
    ]
  },
  "bde": {
    title: "Business Development Executive (BDE)",
    type: "Full-Time",
    location: "Work in office",
    experience: "Freshers welcome",
    description: "We are looking for an ambitious Business Development Executive (BDE) to join us in our office. Freshers are highly welcome! You will identify growth opportunities, generate high-quality outbound leads, and coordinate with the development team to convert inquiries into enterprise contracts.",
    responsibilities: [
      "Research, identify, and qualify outbound leads within the startup and enterprise space.",
      "Present project pitches and demos to prospective clients alongside technical leads.",
      "Help coordinate proposal submissions and follow-ups in office.",
      "Maintain a database of prospective clients."
    ],
    requirements: [
      "Strong interest in sales, business development, or client coordination. Freshers are welcome!",
      "Exceptional verbal and written communication skills.",
      "Eager learner who can adapt quickly to the tech/agency ecosystem.",
      "Self-motivated and comfortable working in office in a fast-paced environment."
    ],
    benefits: [
      "Base salary + attractive uncapped performance commissions.",
      "Hands-on sales and agency business development training.",
      "Fun, collaborative team environment in the office.",
      "Regular career growth reviews and mentorship."
    ]
  }
};

export default function JobDetailClient({ id }) {
  const router = useRouter();
  const job = jobsDetails[id];
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    jobType: job?.title || "UI/UX Designer",
    portfolio: "",
    resume: null,
    message: ""
  });

  if (!job) {
    return (
      <div className={styles.careersPage} style={{ paddingTop: "120px" }}>
        <div className={styles.workspaceSection} style={{ textAlign: "center" }}>
          <h2 className={styles.jobTitle} style={{ fontSize: "2rem" }}>Job Opening Not Found</h2>
          <button className={styles.applyBtn} style={{ width: "auto", display: "inline-block", marginTop: "24px" }} onClick={() => router.push("/careers")}>
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, resume: file }));
    if (errors.resume) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.resume;
        return updated;
      });
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    
    // Name
    if (!formData.name || formData.name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters long.";
    } else if (!/^[A-Za-z\s\-']+$/.test(formData.name)) {
      tempErrors.name = "Name can only contain letters, spaces, hyphens, and apostrophes.";
    }

    // Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    } else {
      const domain = formData.email.split("@")[1].toLowerCase();
      if (DISPOSABLE_DOMAINS.includes(domain)) {
        tempErrors.email = "Temporary or disposable email addresses are not allowed. Please enter a genuine email.";
      }
    }

    // WhatsApp
    const cleanWhatsapp = formData.whatsapp.replace(/\s|-|\(|\)/g, ""); // strip spaces, hyphens, brackets
    const phoneDigitsOnly = formData.whatsapp.replace(/\D/g, "");
    if (!formData.whatsapp) {
      tempErrors.whatsapp = "WhatsApp number is required.";
    } else if (!/^\+?[0-9\s\-\(\)]+$/.test(formData.whatsapp)) {
      tempErrors.whatsapp = "Please enter a valid WhatsApp number (digits, spaces, hyphens, brackets, or '+' only).";
    } else {
      // Check if it matches an Indian phone number format
      const isIndianLength = phoneDigitsOnly.length === 10;
      const hasIndianPrefix = cleanWhatsapp.startsWith("+91") || cleanWhatsapp.startsWith("91") || (cleanWhatsapp.startsWith("0") && phoneDigitsOnly.length === 11);
      
      if (isIndianLength || hasIndianPrefix) {
        const indianRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
        if (!indianRegex.test(cleanWhatsapp)) {
          tempErrors.whatsapp = "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
        }
      } else {
        if (phoneDigitsOnly.length < 7 || phoneDigitsOnly.length > 15) {
          tempErrors.whatsapp = "WhatsApp number must contain between 7 and 15 digits.";
        }
      }
    }

    // Resume File
    if (!formData.resume) {
      tempErrors.resume = "Please upload your resume.";
    } else {
      const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;
      if (!allowedExtensions.exec(formData.resume.name)) {
        tempErrors.resume = "Only PDF, DOC, and DOCX files are allowed.";
      } else if (formData.resume.size > 10 * 1024 * 1024) {
        tempErrors.resume = "Resume file size must be less than 10MB.";
      }
    }

    // Portfolio
    if (formData.portfolio && formData.portfolio.trim().length > 0) {
      try {
        new URL(formData.portfolio);
      } catch (err) {
        tempErrors.portfolio = "Please enter a valid URL (e.g., https://github.com/username).";
      }
    }

    // Message
    if (!formData.message || formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(tempErrors);
    return tempErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

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

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("whatsapp", formData.whatsapp);
      data.append("portfolio", formData.portfolio);
      data.append("resume", formData.resume);
      data.append("message", formData.message);
      data.append("jobId", id);
      data.append("jobTitle", formData.jobType);

      const response = await fetch(`/api/career-apply`, {
        method: "POST",
        body: data,
      });

      const responseData = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // Clear form
        setFormData({
          name: "",
          email: "",
          whatsapp: "",
          jobType: job.title,
          portfolio: "",
          resume: null,
          message: ""
        });
        setErrors({});
        setTimeout(() => {
          setIsSubmitted(false);
          setIsApplying(false);
          router.push("/careers");
        }, 3000);
      } else {
        setErrorMessage(responseData.error || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Could not connect to the backend server. Please verify it is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.careersPage}>
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>

      {/* Glass Gradient Header Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/careers" className={styles.breadcrumbLink}>Careers</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbActive}>{job.title}</span>
          </div>

          <h1 className={styles.headline}>
            <span className={styles.blinkWord}>JOB</span>
            <br />
            <span className={styles.blinkWord}>REQUIREMENTS</span>
          </h1>

          <p className={styles.heroDesc}>
            Explore the responsibilities, benefits, and submit your application online.
          </p>
        </div>
      </section>

      {/* Main Split Grid Workspace */}
      <section className={styles.workspaceSection}>
        <div className={styles.detailGrid}>
          
          {/* Left Column: Job Details */}
          <div className={styles.detailLeft}>
            {/* About the Role */}
            <div className={styles.detailCard}>
              <h4>
                <span className={styles.iconBadge}>👥</span>
                About the Role
              </h4>
              <p>{job.description}</p>
            </div>

            {/* Key Responsibilities */}
            <div className={styles.detailCard}>
              <h4>
                <span className={styles.iconBadge}>⚡</span>
                Key Responsibilities
              </h4>
              <ul className={styles.detailList}>
                {job.responsibilities.map((resp, i) => (
                  <li key={i}>
                    <span className={styles.listDotIcon} style={{ fontWeight: "800" }}>0{i+1}.</span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Need */}
            <div className={styles.detailCard}>
              <h4>
                <span className={styles.iconBadge}>🔑</span>
                What We Need
              </h4>
              <ul className={styles.detailList}>
                {job.requirements.map((req, i) => (
                  <li key={i}>
                    <svg className={styles.listCheckIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Offer */}
            <div className={styles.detailCard}>
              <h4>
                <span className={styles.iconBadge}>🎁</span>
                What We Offer
              </h4>
              <ul className={styles.detailList}>
                {job.benefits.map((ben, i) => (
                  <li key={i}>
                    <span className={styles.listDotIcon}>✦</span>
                    {ben}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Sticky Floating Widget / Form */}
          <div className={styles.detailRight}>
            <div className={styles.widgetCard}>
              <AnimatePresence mode="wait">
                {!isApplying ? (
                  <motion.div
                    key="widget-summary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className={styles.salaryLabel} style={{ color: "#06b6d4" }}>Hiring Active</span>
                    <h3 className={styles.widgetTitle} style={{ marginTop: "8px" }}>{job.title}</h3>
                    
                    <div className={styles.widgetMeta}>
                      <div className={styles.widgetMetaItem}>
                        <span className={styles.widgetMetaIcon}>📍</span>
                        <span>Location: {job.location}</span>
                      </div>
                      <div className={styles.widgetMetaItem}>
                        <span className={styles.widgetMetaIcon}>💼</span>
                        <span>Job Type: {job.type}</span>
                      </div>
                      <div className={styles.widgetMetaItem}>
                        <span className={styles.widgetMetaIcon}>⚡</span>
                        <span>Experience: {job.experience}</span>
                      </div>
                    </div>

                    <button 
                      className={styles.applyBtn} 
                      onClick={() => setIsApplying(true)}
                    >
                      Apply Now
                    </button>
                  </motion.div>
                ) : isSubmitted ? (
                  <motion.div 
                    key="widget-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.successMessage}
                    style={{ padding: "20px 0" }}
                  >
                    <div className={styles.successIcon}>✓</div>
                    <h3 className={styles.jobTitle} style={{ textAlign: "center", marginBottom: "8px" }}>Application Received!</h3>
                    <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>Thank you for applying. Redirecting you back to careers...</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="widget-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form onSubmit={handleFormSubmit} noValidate>
                      <h4 className={styles.jobTitle} style={{ fontSize: "1.4rem", marginBottom: "20px" }}>Apply for Role</h4>
                       <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div className={styles.formGroup}>
                          <label className={styles.label} htmlFor="jobType">Applying For / Position *</label>
                          <select
                            id="jobType"
                            name="jobType"
                            className={`${styles.formInput} ${errors.jobType ? styles.inputError : ""}`}
                            style={{ cursor: "pointer", background: "rgba(255, 255, 255, 0.75)" }}
                            value={formData.jobType}
                            onChange={handleInputChange}
                          >
                            <option value="UI/UX Designer">UI/UX Designer</option>
                            <option value="Business Development Executive (BDE)">Business Development Executive (BDE)</option>
                          </select>
                          {errors.jobType && (
                            <span className={styles.errorLabel}>
                              ⚠️ {errors.jobType}
                            </span>
                          )}
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.label} htmlFor="name">Full Name *</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className={`${styles.formInput} ${errors.name ? styles.inputError : ""}`}
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                          {errors.name && (
                            <span className={styles.errorLabel}>
                              ⚠️ {errors.name}
                            </span>
                          )}
                        </div>
                        
                        <div className={styles.formGroup}>
                          <label className={styles.label} htmlFor="email">Email Address *</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                          {errors.email && (
                            <span className={styles.errorLabel}>
                              ⚠️ {errors.email}
                            </span>
                          )}
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.label} htmlFor="whatsapp">WhatsApp Number *</label>
                          <input
                            id="whatsapp"
                            name="whatsapp"
                            type="tel"
                            className={`${styles.formInput} ${errors.whatsapp ? styles.inputError : ""}`}
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                          />
                          {errors.whatsapp && (
                            <span className={styles.errorLabel}>
                              ⚠️ {errors.whatsapp}
                            </span>
                          )}
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.label}>Resume / CV (PDF, DOC) *</label>
                          <div style={{
                            position: "relative",
                            border: errors.resume ? "2px dashed #ef4444" : "2px dashed rgba(124, 58, 237, 0.25)",
                            borderRadius: "12px",
                            padding: "16px",
                            textAlign: "center",
                            background: "rgba(255, 255, 255, 0.5)",
                            cursor: "pointer",
                            transition: "border-color 0.2s ease"
                          }}>
                            <input
                              id="resume"
                              name="resume"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              style={{
                                position: "absolute",
                                inset: 0,
                                opacity: 0,
                                cursor: "pointer"
                              }}
                            />
                            <div style={{ color: errors.resume ? "#ef4444" : "#7c3aed", fontSize: "1.25rem", marginBottom: "4px" }}>📁</div>
                            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569" }}>
                              {formData.resume ? formData.resume.name : "Click to upload resume"}
                            </span>
                            <p style={{ margin: "4px 0 0 0", fontSize: "0.7rem", color: "#94a3b8" }}>PDF, DOC, DOCX up to 10MB</p>
                          </div>
                          {errors.resume && (
                            <span className={styles.errorLabel}>
                              ⚠️ {errors.resume}
                            </span>
                          )}
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.label} htmlFor="portfolio">Portfolio / GitHub</label>
                          <input
                            id="portfolio"
                            name="portfolio"
                            type="url"
                            className={`${styles.formInput} ${errors.portfolio ? styles.inputError : ""}`}
                            placeholder="https://myportfolio.com"
                            value={formData.portfolio}
                            onChange={handleInputChange}
                          />
                          {errors.portfolio && (
                            <span className={styles.errorLabel}>
                              ⚠️ {errors.portfolio}
                            </span>
                          )}
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.label} htmlFor="message">Message *</label>
                          <textarea
                            id="message"
                            name="message"
                            rows="3"
                            className={`${styles.formInput} ${errors.message ? styles.inputError : ""}`}
                            placeholder="Why do you want to join Sanmora?"
                            style={{ resize: "none" }}
                            value={formData.message}
                            onChange={handleInputChange}
                          />
                          {errors.message && (
                            <span className={styles.errorLabel}>
                              ⚠️ {errors.message}
                            </span>
                          )}
                        </div>
                      </div>

                      {errorMessage && (
                        <div style={{ color: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "10px", borderRadius: "8px", fontSize: "13px", border: "1px solid rgba(239, 68, 68, 0.2)", marginTop: "12px" }}>
                          ✗ {errorMessage}
                        </div>
                      )}

                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
                        <button type="submit" className={styles.applyBtn} disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </button>
                        <button 
                          type="button" 
                          className={styles.closeBtn} 
                          onClick={() => setIsApplying(false)}
                          disabled={isSubmitting}
                        >
                          Back to Description
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
