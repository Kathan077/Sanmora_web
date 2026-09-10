"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { 
  GraduationCap, 
  MonitorPlay, 
  Calendar, 
  Users, 
  Film, 
  Award 
} from 'lucide-react';
import styles from './SanmoraPerks.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const perksData = [
  {
    icon: GraduationCap,
    tag: "ONBOARDING",
    title: "Induction & Training on Joining",
    desc: "Comprehensive structured onboarding program to help new team members integrate smoothly."
  },
  {
    icon: MonitorPlay,
    tag: "UPSKILLING",
    title: "Technical & Non-Technical Training",
    desc: "Regular engineering workshops, certificate courses, and hands-on skill development sessions."
  },
  {
    icon: Calendar,
    tag: "RECREATION",
    title: "One-Day Picnics & Weekend Tours",
    desc: "Team retreats, outdoor adventures, and fun weekend getaway trips for fresh energy."
  },
  {
    icon: Users,
    tag: "COMMUNITY",
    title: "Social Issues Awareness & Drives",
    desc: "Community initiatives, social responsibility awareness drives, and impact programs."
  },
  {
    icon: Film,
    tag: "TEAM BONDING",
    title: "Movie Screenings & Team Outings",
    desc: "Relaxing movie nights, gaming sessions, and casual team celebrations."
  },
  {
    icon: Award,
    tag: "GROWTH",
    title: "Soft-Skills & Personality Development",
    desc: "Communication workshops, leadership mentoring, and personal career growth guidance."
  }
];

export default function SanmoraPerks() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".perk-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef} id="sanmora-perks">
      <div className={styles.container}>

        {/* Grid Container */}
        <div className={styles.grid}>
          {perksData.map((perk, index) => {
            const IconComp = perk.icon;
            return (
              <div key={index} className={`${styles.perkCard} perk-item`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>
                    <IconComp size={26} className={styles.icon} />
                  </div>
                  <span className={styles.perkTag}>{perk.tag}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.perkTitle}>{perk.title}</h3>
                  <p className={styles.perkDesc}>{perk.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
