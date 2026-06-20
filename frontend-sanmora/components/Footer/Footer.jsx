"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <img src="/logo/Footer_logo.png" alt="Sanmora" style={{ height: '60px', width: 'auto', filter: 'drop-shadow(0 2px 8px rgba(124, 58, 237, 0.15))' }} />
          </div>
          <p className={styles.brandDesc}>
            Creating visually stunning, ultra-premium digital interfaces and high-performance brand ecosystems.
          </p>
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Services</h4>
            <Link href="/services/website-development" className={styles.link}>Website Development</Link>
            <Link href="/services/software-development" className={styles.link}>Software Development</Link>
            <Link href="/services/application-development" className={styles.link}>Application Development</Link>
            <Link href="/services/digital-marketing" className={styles.link}>Digital Marketing</Link>
            <Link href="/services/logo-designing" className={styles.link}>Logo Designing</Link>
          </div>
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Company</h4>
            <Link href="/about-us" className={styles.link}>About Us</Link>
            <Link href="/careers" className={styles.link}>Careers</Link>
            <Link href="/consultation" className={styles.link}>Contact</Link>
          </div>
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Resources</h4>
            <Link href="/blog" className={styles.link}>Insights</Link>
            <Link href="/#docs" className={styles.link}>Documentation</Link>
            <Link href="/#terms" className={styles.link}>Terms of Service</Link>
          </div>
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Contact Us</h4>
            <span className={styles.contactText}>
              13, Virat Apartment,<br />
              Opp. B.R.T. Bus Stand,<br />
              Opp. Shakuntala Bunglow,<br />
              Sola Road, Ghatlodiya,<br />
              Ahmedabad, Gujarat 380061
            </span>
            <a href="tel:+918780005326" className={styles.contactLink}>+91 87800 05326</a>
            <a href="mailto:info@sanmora.in" classNa me={styles.contactLink}>info@sanmora.in</a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          © 2025 Sanmora. All rights reserved.
        </span>
        <div className={styles.socials}>
          <a href="https://www.facebook.com/share/1JFKX4zXoJ/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/_sanmora/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a href="https://youtube.com/@sanmoratechno?si=9SxRVDpHOLFUtYDV" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.163c-.272-1.022-1.074-1.824-2.096-2.096C19.558 3.5 12 3.5 12 3.5s-7.558 0-9.402.567c-1.022.272-1.824 1.074-2.096 2.096C0 8.008 0 12 0 12s0 3.992.502 5.837c.272 1.022 1.074 1.824 2.096 2.096C4.442 20.5 12 20.5 12 20.5s7.558 0 9.402-.567c1.022-.272 1.824-1.074 2.096-2.096C24 15.992 24 12 24 12s0-3.992-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href="https://in.linkedin.com/company/sanmora" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a href="https://wa.me/8780005326" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.385 0 0 5.339 0 11.923c0 2.107.551 4.165 1.6 5.975L0 24l6.335-1.644c1.731.935 3.678 1.427 5.674 1.427 6.633 0 12.018-5.337 12.018-11.922C24.027 5.34 18.647 0 12.017 0zm.019 21.902c-1.792 0-3.553-.477-5.1-1.378l-.365-.213-3.793.985.999-3.659-.235-.371a9.78 9.78 0 01-1.503-5.263c.001-5.4 4.416-9.792 9.833-9.792 2.623 0 5.09 1.011 6.945 2.85 1.854 1.839 2.875 4.288 2.872 6.897-.003 5.4-4.417 9.792-9.83 9.792zM17.37 14.54c-.292-.144-1.727-.842-1.993-.938-.266-.096-.46-.144-.653.144-.193.288-.748.938-.918 1.13-.17.192-.34.216-.632.072-.292-.144-1.232-.448-2.347-1.43-.867-.764-1.453-1.708-1.624-1.995-.17-.287-.018-.442.128-.585.13-.13.292-.336.438-.504.146-.168.194-.288.292-.48.097-.192.048-.36-.024-.504-.073-.144-.653-1.554-.895-2.125-.236-.557-.497-.482-.678-.49-.175-.008-.376-.01-.577-.01s-.527.074-.803.37c-.276.297-1.054 1.018-1.054 2.484 0 1.466 1.08 2.883 1.23 3.076.15.193 2.125 3.208 5.148 4.492.719.306 1.28.489 1.718.627.722.227 1.38.195 1.9.117.58-.086 1.728-.696 1.97-.1.242-.51.242-.947.168-1.024-.074-.076-.27-.12-.562-.264z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
