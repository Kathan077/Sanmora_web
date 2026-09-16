"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";
import { servicesData } from "./servicesData";

const MotionLink = motion.create(Link);

import IconRenderer from "../Shared/IconRenderer";
import AccessibilityLanguageWidget from "../Shared/AccessibilityLanguageWidget";

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(servicesData[0].id);
  const [expandedServiceId, setExpandedServiceId] = useState(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY; 
      setIsScrolled((prev) => {
        if (!prev && currentScroll > 90) return true;
        if (prev && currentScroll < 20) return false;
        return prev;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion Dynamic Active Hover Menu States
  const [activeTab, setActiveTab] = useState(null); // "services" | "growth" | null
  const [hoveredIndex, setHoveredIndex] = useState(null); // tracking link index for sliding backdrop pill

  // Active Category removed for simplified dropdown
  const desktopLinks = [
    { name: "Home", href: "/", type: "standard" },
    { name: "About Us", href: "/about-us", type: "dropdown", id: "about" },
    { name: "Services", href: "/services", type: "dropdown", id: "services" },
    { name: "Blog", href: "/blog", type: "standard" },
    { name: "Case Studies", href: "/case-studies", type: "standard" },
    { name: "Careers", href: "/careers", type: "standard" },
  ];

  const aboutSubLinks = [
    {
      name: "About Overview",
      desc: "Who we are, our story & enterprise values",
      href: "/about-us",
      icon: "globe",
      badge: "Overview"
    },
    {
      name: "How We Work",
      desc: "Agile sprints, discovery & SLA execution",
      href: "/about-us/how-we-work",
      icon: "cpu",
      badge: "Methodology"
    },
    {
      name: "OUR VISION & MISSION",
      desc: "Strategic goals, core purpose & 2030 roadmap",
      href: "/about-us/vision-mission",
      icon: "eye",
      badge: "Core Purpose"
    },
    {
      name: "OUR TECHNOLOGIES",
      desc: "Modern tech stack, cloud & AI architecture",
      href: "/about-us/technologies",
      icon: "code",
      badge: "Tech Stack"
    },
    {
      name: "life at sanmora",
      desc: "Culture, perks, memory gallery & team vibe",
      href: "/about-us/life-at-sanmora",
      icon: "layers",
      badge: "Culture"
    }
  ];

  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

  // Framer Motion Stagger Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.02
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
        {/* Logo Section */}
        <div className={styles.logoArea} onClick={() => router.push('/')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/sanmora-logo.png"
            alt="Sanmora Logo"
            className={styles.brandImageLogo}
          />
        </div>

        {/* Clean, Pro-Level Desktop Navigation Links */}
        <nav className={styles.navLinks} onMouseLeave={() => { setActiveTab(null); setHoveredIndex(null); }}>
          {desktopLinks.map((link, idx) => {
            const isHovered = hoveredIndex === idx;
            const isTabActive = activeTab === link.id;

            return (
              <div
                key={link.name}
                className={styles.navLinkContainer}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  if (link.type === "dropdown") {
                    setActiveTab(link.id);
                  } else {
                    setActiveTab(null);
                  }
                }}
              >
                <Link
                  href={link.href}
                  className={`
                    ${styles.navLink} 
                    ${isTabActive ? styles.activeTrigger : ""}
                  `}
                  onClick={() => setActiveTab(null)}
                >
                  {link.name}
                  {link.type === "dropdown" && (
                    <svg className={`${styles.chevron} ${isTabActive ? styles.chevronOpen : ""}`} width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 1l4 4 4-4" />
                    </svg>
                  )}
                </Link>

                {/* Apple/Stripe-Style Sliding Background Active Pill */}
                {isHovered && (
                  <motion.div
                    layoutId="navHoverPill"
                    className={styles.navHoverPill}
                    transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                  />
                )}
              </div>
            );
          })}

          {/* Dynamic Floating Dropdown Card (Stripe + Framer Motion Style) */}
          <AnimatePresence>
            {activeTab && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95, rotateX: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  x: activeTab === "services" ? -120 : -100
                }}
                exit={{ opacity: 0, y: 12, scale: 0.95, rotateX: -8 }}
                transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                className={`
                  ${styles.stripeDropdown} 
                  ${activeTab === "services" ? styles.servicesExpandedDropdown : ""}
                  ${activeTab === "about" ? styles.aboutExpandedDropdown : ""}
                `}
                style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
              >
                {/* Soft glass dynamic arrow */}
                <div className={`
                  ${styles.stripeDropdownArrow} 
                  ${activeTab === "services" ? styles.arrowServices : ""}
                  ${activeTab === "about" ? styles.arrowAbout : ""}
                `} />

                <div className={styles.stripeDropdownContentContainer}>
                  {activeTab === "about" && (
                    <div className={styles.aboutDropdownLayout}>
                      <div className={styles.aboutDropdownHeader}>
                        <span className={styles.sidebarSectionTitle}>Explore Sanmora</span>
                        <p className={styles.aboutDropdownSubtitle}>Discover our methodology, tech stack, company vision & vibrant culture.</p>
                      </div>
                      <motion.div
                        className={styles.aboutGrid}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                      >
                        {aboutSubLinks.map((sub) => (
                          <MotionLink
                            key={sub.name}
                            variants={itemVariants}
                            href={sub.href}
                            className={styles.aboutGridCard}
                            onClick={() => setActiveTab(null)}
                          >
                            <div className={styles.aboutCardIcon}>
                              <IconRenderer icon={sub.icon} className={styles.vectorIcon} />
                            </div>
                            <div className={styles.aboutCardContent}>
                              <div className={styles.aboutCardTop}>
                                <span className={styles.aboutCardTitle}>{sub.name}</span>
                                <span className={styles.aboutCardBadge}>{sub.badge}</span>
                              </div>
                              <p className={styles.aboutCardDesc}>{sub.desc}</p>
                            </div>
                          </MotionLink>
                        ))}
                      </motion.div>
                    </div>
                  )}

                  {activeTab === "services" && (() => {
                    const activeService = servicesData.find(s => s.id === activeServiceId);
                    return (
                      <div className={styles.dualPanelLayout}>
                        <div className={styles.sidebarPanel}>
                          <span className={styles.sidebarSectionTitle}>Our Services</span>
                          <div className={styles.categoryList}>
                            {servicesData.map((service) => {
                              const isActive = activeServiceId === service.id;
                              return (
                                <button
                                  key={service.id}
                                  className={`${styles.sidebarCatBtn} ${isActive ? styles.catBtnActive : ""}`}
                                  onMouseEnter={() => setActiveServiceId(service.id)}
                                  onClick={() => {
                                    router.push(`/services/${service.slug}`);
                                    setActiveTab(null);
                                  }}
                                >
                                  {service.name}
                                  <svg className={styles.catArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                  </svg>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className={styles.gridPanel}>
                          <div className={styles.gridPanelContainer}>
                            <div className={styles.gridPanelHeader}>
                              <div className={styles.headerRoundBadge} style={{ background: `${activeService?.color}15`, color: activeService?.color }}>
                                <IconRenderer icon={activeService?.icon} className={styles.vectorIcon} style={{ width: 16, height: 16 }} />
                              </div>
                              <h4 style={{ color: activeService?.color }}>{activeService?.name}</h4>
                            </div>

                            <motion.div
                              key={activeServiceId}
                              variants={containerVariants}
                              initial="hidden"
                              animate="show"
                              className={styles.dynamicSubGrid}
                            >
                              {activeService?.categories?.map((cat) => (
                                <MotionLink
                                  key={cat.slug}
                                  variants={itemVariants}
                                  href={`/services/${activeService?.slug}/${cat.slug}`}
                                  className={styles.subGridItem}
                                  onClick={() => setActiveTab(null)}
                                  style={{
                                    "--hover-bg": `${activeService?.color}0a`,
                                    "--hover-text": activeService?.color,
                                  }}
                                >
                                  <div className={styles.subItemIconBg} style={{ background: `${activeService?.color}12`, border: `1px solid ${activeService?.color}20`, color: activeService?.color }}>
                                    <IconRenderer icon={cat.icon} className={styles.vectorIcon} />
                                  </div>
                                  <div className={styles.subItemContent}>
                                    <h5>{cat.name}</h5>
                                    {cat.description && (
                                      <p className={styles.subItemDesc}>{cat.description}</p>
                                    )}
                                  </div>
                                </MotionLink>
                              ))}
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* CTAs */}
        <div className={styles.headerCtas}>
          <button className={styles.btnNavPrimary} onClick={() => router.push("/consultation")}>
            <span>Let&apos;s Talk</span>
            <svg className={styles.btnArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Hamburger trigger for mobile viewports */}
          <button
            className={`${styles.hamburgerBtn} ${isMobileMenuOpen ? styles.hamburgerActive : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title="Toggle Menu"
          >
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
          </button>
        </div>
      </header>

      {/* Pro-level mobile backdrop overlay */}
      <div
        className={`${styles.mobileBackdrop} ${isMobileMenuOpen ? styles.backdropActive : ""}`}
        onClick={() => {
          setIsMobileMenuOpen(false);
          setIsMobileServicesOpen(false);
        }}
      />

      {/* Premium slide-in Side Drawer panel */}
      <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerLogo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/sanmora-logo.png"
              alt="Sanmora Logo"
              className={styles.mobileBrandLogo}
            />
          </div>

          {/* Pro-level close button */}
          <button
            className={styles.drawerCloseBtn}
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsMobileServicesOpen(false);
            }}
            title="Close Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNavLinks}>
          <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>

          {/* About Us Mobile Collapsible Accordion */}
          <div>
            <button
              className={`${styles.mobileNavLink} ${styles.mobileAccordionTrigger}`}
              onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
            >
              <span>About Us</span>
              <svg className={`${styles.chevron} ${isMobileAboutOpen ? styles.chevronOpen : ""}`} width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
            <AnimatePresence>
              {isMobileAboutOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={styles.mobileAccordionContent}
                  style={{ overflow: "hidden" }}
                >
                  <div className={styles.mobileSubLinksContainer}>
                    {aboutSubLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={styles.mobileSubLink}
                        style={{ fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px' }}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileAboutOpen(false);
                        }}
                      >
                        <IconRenderer icon={item.icon} className={styles.vectorIconMobile} style={{ width: 16, height: 16 }} />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Services Mobile Collapsible Accordion */}
          <div>
            <button
              className={`${styles.mobileNavLink} ${styles.mobileAccordionTrigger}`}
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
            >
              <span>Services</span>
              <svg className={`${styles.chevron} ${isMobileServicesOpen ? styles.chevronOpen : ""}`} width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
            <AnimatePresence>
              {isMobileServicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={styles.mobileAccordionContent}
                  style={{ overflow: "hidden" }}
                >
                  <div className={styles.mobileSubLinksContainer}>
                    {servicesData.map((item) => {
                       const isExpanded = expandedServiceId === item.id;
                       return (
                        <div key={item.id} style={{ marginBottom: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Link
                              href={`/services/${item.slug}`}
                              className={styles.mobileSubLink}
                              style={{ fontWeight: 800, color: '#111827', flex: 1, display: 'flex', alignItems: 'center' }}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                            >
                              <span style={{ marginRight: '8px', display: 'flex', alignItems: 'center', color: item.color || 'var(--primary)' }}>
                                <IconRenderer icon={item.icon} className={styles.vectorIconMobile} style={{ width: 16, height: 16 }} />
                              </span>
                              {item.name}
                            </Link>
                            
                            <button
                              onClick={() => setExpandedServiceId(isExpanded ? null : item.id)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                padding: '8px 12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#6b7280',
                                transition: 'color 0.2s ease'
                              }}
                              title="Toggle Subcategories"
                            >
                              <svg 
                                className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ""}`} 
                                width="10" 
                                height="6" 
                                viewBox="0 0 10 6" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2.5"
                              >
                                <path d="M1 1l4 4 4-4" />
                              </svg>
                            </button>
                          </div>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                              >
                                <div style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                                  {item.categories?.map((cat) => (
                                    <Link
                                      key={cat.slug}
                                      href={`/services/${item.slug}/${cat.slug}`}
                                      className={styles.mobileSubLink}
                                      style={{ fontSize: '13px', padding: '6px 8px' }}
                                      onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsMobileServicesOpen(false);
                                      }}
                                    >
                                      {cat.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/blog" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <Link href="/case-studies" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Case Studies</Link>
          <Link href="/careers" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Careers</Link>

          <hr className={styles.mobileDivider} />

          <div className={styles.mobileCtas}>
            <button className={styles.mobileBtnPrimary} onClick={() => { setIsMobileMenuOpen(false); router.push("/consultation"); }}>
              <span>Let&apos;s Talk</span>
              <svg className={styles.btnArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
