"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './DigitalMarketing.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const marketingServices = [
  {
    id: "01",
    title: "Search Engine Optimization (SEO)",
    desc: "Improve search rankings, organic traffic, and online visibility through technical optimization, keyword strategies, content enhancement, and long-term SEO growth plans.",
    color: "#7c3aed", // primary
    iconType: "chart"
  },
  {
    id: "02",
    title: "Social Media Marketing (SMM)",
    desc: "Build meaningful audience engagement across social platforms with creative content strategies, community management, and brand-focused campaigns.",
    color: "#0ea5e9", // cyan/blue
    iconType: "social"
  },
  {
    id: "03",
    title: "Pay-Per-Click Advertising (PPC)",
    desc: "Launch high-performing advertising campaigns across Google, Meta, LinkedIn, and other platforms to generate qualified leads and maximize return on investment.",
    color: "#f59e0b", // amber
    iconType: "target"
  },
  {
    id: "04",
    title: "Content Marketing",
    desc: "Create valuable and impactful content that attracts, educates, and converts audiences while establishing authority and trust within your industry.",
    color: "#10b981", // emerald
    iconType: "content"
  },
  {
    id: "05",
    title: "Email Marketing Campaigns",
    desc: "Design personalized email sequences, automation workflows, and customer nurturing campaigns that improve retention and increase conversions.",
    color: "#ec4899", // pink
    iconType: "mail"
  },
  {
    id: "06",
    title: "Conversion Rate Optimization (CRO)",
    desc: "Analyze user behavior, optimize customer journeys, conduct A/B testing, and improve website performance to increase conversions and revenue.",
    color: "#6366f1", // indigo
    iconType: "funnel"
  },
  {
    id: "07",
    title: "Brand Awareness & Lead Gen",
    desc: "Develop comprehensive growth strategies that strengthen brand recognition, generate high-quality leads, and accelerate business expansion.",
    color: "#8b5cf6", // violet
    iconType: "growth"
  }
];

// Reusable SVG Visual Renderer for the abstract graphics
function VisualRenderer({ type, color }) {
  // We use abstract, clean shapes matching the Stripe/Linear aesthetic
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {type === "chart" && (
        <>
          <path d="M20 180 L60 120 L100 140 L160 40" stroke={`url(#grad-${type})`} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="160" cy="40" r="16" fill={color} />
          <path d="M20 180 L180 180" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      
      {type === "social" && (
        <>
          <circle cx="100" cy="100" r="60" stroke={`url(#grad-${type})`} strokeWidth="12" strokeDasharray="40 20" />
          <circle cx="100" cy="100" r="30" fill={color} opacity="0.8" />
          <circle cx="160" cy="40" r="15" fill={color} opacity="0.5" />
          <circle cx="40" cy="160" r="20" fill={color} opacity="0.3" />
        </>
      )}

      {type === "target" && (
        <>
          <circle cx="100" cy="100" r="80" stroke="#e2e8f0" strokeWidth="8" />
          <circle cx="100" cy="100" r="50" stroke={`url(#grad-${type})`} strokeWidth="12" />
          <circle cx="100" cy="100" r="20" fill={color} />
          <path d="M100 0 L100 40 M100 160 L100 200 M0 100 L40 100 M160 100 L200 100" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
        </>
      )}

      {type === "content" && (
        <>
          <rect x="40" y="30" width="120" height="140" rx="12" stroke={`url(#grad-${type})`} strokeWidth="10" />
          <path d="M60 70 L140 70 M60 110 L140 110 M60 150 L100 150" stroke={color} strokeWidth="8" strokeLinecap="round" />
        </>
      )}

      {type === "mail" && (
        <>
          <rect x="20" y="50" width="160" height="100" rx="12" stroke={`url(#grad-${type})`} strokeWidth="10" />
          <path d="M20 60 L100 120 L180 60" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {type === "funnel" && (
        <>
          <path d="M20 40 L180 40 L120 110 L120 180 L80 180 L80 110 Z" fill={`url(#grad-${type})`} />
          <path d="M80 110 L120 110" stroke="#ffffff" strokeWidth="4" />
        </>
      )}

      {type === "growth" && (
        <>
          <path d="M20 160 L20 40 M60 160 L60 80 M100 160 L100 120 M140 160 L140 60 M180 160 L180 20" stroke={`url(#grad-${type})`} strokeWidth="16" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export default function DigitalMarketing() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create a matchMedia instance to handle responsive ScrollTriggers
      let mm = gsap.matchMedia();

      // Desktop & Tablet (Horizontal Scroll)
      mm.add("(min-width: 901px)", () => {
        const panels = gsap.utils.toArray('.dm-panel');
        // Total scroll distance depends on the number of panels and their width
        // We calculate exactly how far to slide the track left
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const scrollDistance = trackWidth - windowWidth;

        // Create the main pinning and sliding animation
        const scrollTween = gsap.to(trackRef.current, {
          x: -scrollDistance,
          ease: "none", // linear sliding
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1, // smooth scrubbing
            start: "top top",
            // The larger the 'end' value, the slower the user scrolls horizontally
            end: () => `+=${scrollDistance * 1.5}`, 
            invalidateOnRefresh: true
          }
        });

        // Animate the background progress line filling up
        if (progressLineRef.current) {
          gsap.to(progressLineRef.current, {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${scrollDistance * 1.5}`,
              scrub: 1
            }
          });
        }

        // Add subtle parallax animations to the visual elements inside each panel
        panels.forEach((panel) => {
          const visual = panel.querySelector('.dm-visual');
          const number = panel.querySelector('.dm-number');
          
          if (visual) {
            // When horizontal scrolling, containerX drives the animation
            gsap.fromTo(visual, 
              { scale: 0.8, opacity: 0, rotateY: -15 },
              {
                scale: 1, 
                opacity: 1, 
                rotateY: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween, // Link to horizontal scroll!
                  start: "left center", // When left side of panel hits center of screen
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        });
      });

      // Mobile (Vertical Stack - standard scroll)
      mm.add("(max-width: 900px)", () => {
        const panels = gsap.utils.toArray('.dm-panel');
        panels.forEach((panel) => {
          gsap.fromTo(panel, 
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.pinnedWrapper}>
        
        {/* Fixed Header Layer */}
        <div className={styles.header}>
          <h2 className={styles.heading}>Digital Marketing</h2>
          <p className={styles.subheading}>
            Transforming visibility into measurable revenue through precision-engineered 
            campaigns, data-driven strategies, and full-funnel optimization.
          </p>
        </div>

        {/* Horizontal Moving Track */}
        <div className={styles.track} ref={trackRef}>
          {/* Continuous connecting line */}
          <div className={styles.progressLineBg}></div>
          <div className={styles.progressLineFill} ref={progressLineRef}></div>

          {marketingServices.map((service, idx) => (
            <div key={idx} className={`${styles.panel} dm-panel`}>
              <div className={styles.panelContent}>
                
                <div className={styles.textContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.desc}</p>
                </div>

              </div>
            </div>
          ))}

          {/* Buffer panel at the end to allow the last item to scroll to center */}
          <div className={styles.panel} style={{ width: '40vw' }}></div>
        </div>

      </div>
    </section>
  );
}
