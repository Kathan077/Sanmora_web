"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './WebsiteDevelopment.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "Custom Website Design & Development",
    desc: "Create visually stunning, conversion-focused websites tailored to your brand identity and business objectives. Every project is built with scalability, performance, and user experience in mind."
  },
  {
    title: "E-Commerce Solutions",
    desc: "Develop powerful online stores with secure payment integration, seamless checkout experiences, inventory management, and optimized customer journeys that increase sales."
  },
  {
    title: "Responsive & Mobile-Friendly Websites",
    desc: "Ensure flawless performance across desktops, tablets, and smartphones with adaptive layouts and responsive interfaces designed for every screen size."
  },
  {
    title: "Web Applications",
    desc: "Build robust, scalable, and interactive web applications using modern technologies that streamline operations and deliver exceptional user experiences."
  },
  {
    title: "CMS Development",
    desc: "Implement flexible content management systems that empower your team to update, manage, and publish content effortlessly without technical expertise."
  },
  {
    title: "Website Maintenance & Optimization",
    desc: "Provide continuous monitoring, updates, performance improvements, and technical support to keep websites secure, reliable, and running at peak efficiency."
  },
  {
    title: "Performance & Security Enhancement",
    desc: "Optimize loading speeds, Core Web Vitals, database performance, and security infrastructure to ensure maximum reliability, protection, and search engine visibility."
  }
];

export default function WebsiteDevelopment() {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Progress Bar Animation perfectly synced with the sticky scroll duration
      gsap.fromTo(progressBarRef.current, 
        { width: "0%" },
        {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 25%", // Starts exactly when the left column becomes sticky
            end: "bottom 75%", // Ends exactly when the last category finishes scrolling
            scrub: true,
          }
        }
      );

      // Intro Entrance Animation
      gsap.fromTo(".sticky-reveal",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Individual Service Item Animations
      const items = gsap.utils.toArray('.service-item');
      items.forEach((item) => {
        const title = item.querySelector('.service-title');
        const number = item.querySelector('.service-number');

        // Single, robust entrance animation for the entire card and its contents
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%", // Triggers when the card enters the screen
            toggleActions: "play none none none" // Plays once, never reverses or breaks when scrolling up
          }
        });

        tl.fromTo(item, 
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
        );

        if (title) {
          tl.fromTo(title,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 0.6, ease: "power2.out" },
            "-=0.6" // start slightly before the card finishes entering
          );
        }

        if (number) {
          tl.fromTo(number,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.8" // animate alongside the card
          );
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        
        {/* Left Sticky Side */}
        <div className={styles.leftCol}>
          <div className={`${styles.stickyContent} sticky-reveal`}>
            <h2 className={styles.heading}>Website Development</h2>
            <p className={styles.intro}>
              Elevate your digital presence with our premium web development services. 
              We craft fast, secure, and highly scalable solutions tailored to your brand.
            </p>
            
            {/* Scroll Progress Indicator */}
            <div className={styles.progressWrapper}>
               <div className={styles.progressBar} ref={progressBarRef}></div>
            </div>
          </div>
        </div>
        
        {/* Right Scrolling Side */}
        <div className={styles.rightCol} ref={rightColRef}>
          {services.map((service, index) => (
            <div key={index} className={`${styles.serviceItem} service-item`}>
              <div className={`${styles.serviceNumber} service-number`}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className={styles.textContent}>
                <h3 className={`${styles.serviceTitle} service-title`}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
