"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Eye, 
  Compass, 
  PenTool, 
  Code, 
  CheckCircle, 
  Tv
} from 'lucide-react';
import styles from './WhatWeDo.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const workflowSteps = [
  {
    id: "01",
    title: "Discovery",
    description: "We dive deep into your brand, target audience, and business goals to uncover valuable insights and define clear project objectives.",
    icon: <Eye className="w-5.5 h-5.5" />
  },
  {
    id: "02",
    title: "Strategy",
    description: "We map out a comprehensive, tailored roadmap, defining technical architecture, user flows, and project milestones for execution.",
    icon: <Compass className="w-5.5 h-5.5" />
  },
  {
    id: "03",
    title: "Design",
    description: "We craft visually stunning, intuitive, and responsive interfaces that mirror Apple's aesthetic standards, ensuring ultimate user delight.",
    icon: <PenTool className="w-5.5 h-5.5" />
  },
  {
    id: "04",
    title: "Development",
    description: "Our engineering team writes clean, modular, and optimized code to bring the designs to life with top-tier performance.",
    icon: <Code className="w-5.5 h-5.5" />
  },
  {
    id: "05",
    title: "Testing",
    description: "Rigorous quality assurance checks, performance audits, and user testing ensure a highly polished, bug-free launch.",
    icon: <CheckCircle className="w-5.5 h-5.5" />
  },
  {
    id: "06",
    title: "Launch & Growth",
    description: "We seamlessly deploy your product to production and monitor its performance, continuously optimizing for long-term scale.",
    icon: <Tv className="w-5.5 h-5.5" />
  }
];

export default function WhatWeDo() {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const timelineFillRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    // Scroll animation triggers only on desktop/tablet viewports (min-width: 993px)
    const mediaQuery = window.matchMedia("(min-width: 993px)");
    let ctx;

    const initScrollTrigger = () => {
      ctx = gsap.context(() => {
        // Vertical Timeline progress line fill
        if (timelineFillRef.current && cardsContainerRef.current) {
          gsap.fromTo(timelineFillRef.current,
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: true
              }
            }
          );
        }

        // Single ScrollTrigger to monitor which card is closest to the vertical center of the screen
        if (cardsContainerRef.current) {
          ScrollTrigger.create({
            trigger: cardsContainerRef.current,
            start: "top center",
            end: "bottom center",
            onUpdate: () => {
              const centerY = window.innerHeight / 2;
              let closestIdx = 0;
              let minDistance = Infinity;

              cardRefs.current.forEach((card, idx) => {
                if (!card) return;
                const rect = card.getBoundingClientRect();
                const cardCenterY = rect.top + rect.height / 2;
                const distance = Math.abs(centerY - cardCenterY);
                if (distance < minDistance) {
                  minDistance = distance;
                  closestIdx = idx;
                }
              });

              setActiveCard(closestIdx);
            }
          });
        }
      }, containerRef);
    };

    if (mediaQuery.matches) {
      initScrollTrigger();
    }

    const handleResize = (e) => {
      if (e.matches) {
        if (!ctx) initScrollTrigger();
      } else {
        if (ctx) {
          ctx.revert();
          ctx = null;
        }
      }
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  const scrollToCard = (idx) => {
    const card = cardRefs.current[idx];
    if (card) {
      const top = card.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (card.clientHeight / 2);
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
      setActiveCard(idx);
    }
  };

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.sectionGrid}>
        
        {/* LEFT COLUMN: Sticky text details & Timeline Navigation */}
        <div className={styles.leftColumn}>
          <div className={styles.stickyWrapper}>
            <span className={styles.label}>Our Process</span>
            <h2 className={styles.headline}>How We Work</h2>
            <p className={styles.subheadline}>
              A refined process that transforms ideas into exceptional digital experiences.
            </p>

            {/* Vertical timeline navigation (Interactive & Clickable) */}
            <div className={styles.timelineNav}>
              {/* Vertical connecting line */}
              <div className={styles.timelineLine}>
                <div ref={timelineFillRef} className={styles.timelineFill} />
              </div>
              
              {/* Navigation numbers */}
              <div className={styles.timelineSteps}>
                {workflowSteps.map((step, idx) => {
                  const isActive = activeCard === idx;
                  return (
                    <div 
                      key={step.id} 
                      className={`${styles.navStep} ${isActive ? styles.navStepActive : ''}`}
                      onClick={() => scrollToCard(idx)}
                    >
                      <div className={styles.navStepPoint} />
                      <span className={styles.navStepNumber}>{step.id}</span>
                      <span className={styles.navStepTitle}>{step.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Cards */}
        <div className={styles.rightColumn} ref={cardsContainerRef}>
          {workflowSteps.map((step, idx) => {
            const isActive = activeCard === idx;
            return (
              <div 
                key={step.id}
                className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                ref={el => cardRefs.current[idx] = el}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    {step.icon}
                  </div>
                  <span className={styles.stepId}>{step.id}</span>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}