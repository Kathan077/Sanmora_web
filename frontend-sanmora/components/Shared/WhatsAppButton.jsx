"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const handleLocationClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleModal}
        className={`${styles.whatsappFloat} ${isOpen ? styles.activeFloat : ""}`}
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          className={styles.whatsappIcon}
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
        >
          <path d="M12.017 0C5.385 0 0 5.339 0 11.923c0 2.107.551 4.165 1.6 5.975L0 24l6.335-1.644c1.731.935 3.678 1.427 5.674 1.427 6.633 0 12.018-5.337 12.018-11.922C24.027 5.34 18.647 0 12.017 0zm.019 21.902c-1.792 0-3.553-.477-5.1-1.378l-.365-.213-3.793.985.999-3.659-.235-.371a9.78 9.78 0 01-1.503-5.263c.001-5.4 4.416-9.792 9.833-9.792 2.623 0 5.09 1.011 6.945 2.85 1.854 1.839 2.875 4.288 2.872 6.897-.003 5.4-4.417 9.792-9.83 9.792zM17.37 14.54c-.292-.144-1.727-.842-1.993-.938-.266-.096-.46-.144-.653.144-.193.288-.748.938-.918 1.13-.17.192-.34.216-.632.072-.292-.144-1.232-.448-2.347-1.43-.867-.764-1.453-1.708-1.624-1.995-.17-.287-.018-.442.128-.585.13-.13.292-.336.438-.504.146-.168.194-.288.292-.48.097-.192.048-.36-.024-.504-.073-.144-.653-1.554-.895-2.125-.236-.557-.497-.482-.678-.49-.175-.008-.376-.01-.577-.01s-.527.074-.803.37c-.276.297-1.054 1.018-1.054 2.484 0 1.466 1.08 2.883 1.23 3.076.15.193 2.125 3.208 5.148 4.492.719.306 1.28.489 1.718.627.722.227 1.38.195 1.9.117.58-.086 1.728-.696 1.97-.1.242-.51.242-.947.168-1.024-.074-.076-.27-.12-.562-.264z" />
        </svg>
      </button>

      {/* Center Screen Modal Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
            <motion.div
              className={styles.modalCard}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Linear Gradient Accent Bar */}
              <div className={styles.topAccentBar} />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeBtn}
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Header */}
              <div className={styles.modalHeader}>
                <div className={styles.waBadgeIcon}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12.017 0C5.385 0 0 5.339 0 11.923c0 2.107.551 4.165 1.6 5.975L0 24l6.335-1.644c1.731.935 3.678 1.427 5.674 1.427 6.633 0 12.018-5.337 12.018-11.922C24.027 5.34 18.647 0 12.017 0zm.019 21.902c-1.792 0-3.553-.477-5.1-1.378l-.365-.213-3.793.985.999-3.659-.235-.371a9.78 9.78 0 01-1.503-5.263c.001-5.4 4.416-9.792 9.833-9.792 2.623 0 5.09 1.011 6.945 2.85 1.854 1.839 2.875 4.288 2.872 6.897-.003 5.4-4.417 9.792-9.83 9.792zM17.37 14.54c-.292-.144-1.727-.842-1.993-.938-.266-.096-.46-.144-.653.144-.193.288-.748.938-.918 1.13-.17.192-.34.216-.632.072-.292-.144-1.232-.448-2.347-1.43-.867-.764-1.453-1.708-1.624-1.995-.17-.287-.018-.442.128-.585.13-.13.292-.336.438-.504.146-.168.194-.288.292-.48.097-.192.048-.36-.024-.504-.073-.144-.653-1.554-.895-2.125-.236-.557-.497-.482-.678-.49-.175-.008-.376-.01-.577-.01s-.527.074-.803.37c-.276.297-1.054 1.018-1.054 2.484 0 1.466 1.08 2.883 1.23 3.076.15.193 2.125 3.208 5.148 4.492.719.306 1.28.489 1.718.627.722.227 1.38.195 1.9.117.58-.086 1.728-.696 1.97-.1.242-.51.242-.947.168-1.024-.074-.076-.27-.12-.562-.264z" />
                  </svg>
                </div>
                <h3 className={styles.modalTitle}>Connect on WhatsApp</h3>
                <p className={styles.modalSubtitle}>Select your preferred office location to chat with us</p>
              </div>

              {/* Options Grid */}
              <div className={styles.locationGrid}>
                {/* India Card */}
                <button
                  className={styles.locationCard}
                  onClick={() =>
                    handleLocationClick(
                      "https://wa.me/918780005326?text=Hello%20Sanmora%20India%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                    )
                  }
                >
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeaderRow}>
                      <span className={styles.locationName}>India Office</span>
                    </div>
                    <span className={styles.phoneText}>+91 87800 05326</span>
                  </div>
                  <div className={styles.cardArrow}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </button>

                {/* South Africa Card */}
                <button
                  className={styles.locationCard}
                  onClick={() =>
                    handleLocationClick(
                      "https://wa.me/27101429611?text=Hello%20Sanmora%20South%20Africa%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                    )
                  }
                >
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeaderRow}>
                      <span className={styles.locationName}>South Africa Office</span>
                    </div>
                    <span className={styles.phoneText}>+27 10 142 9611</span>
                  </div>
                  <div className={styles.cardArrow}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
