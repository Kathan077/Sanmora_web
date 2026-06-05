"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import styles from './OurTeam.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const team = [
  {
    name: "Alex Mercer",
    role: "Chief Technical Officer",
    desc: "Ex-Google architect specializing in ultra-low latency systems and distributed computing.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    name: "Sarah Chen",
    role: "Head of AI & Data",
    desc: "Pioneer in applied machine learning, bridging the gap between theoretical AI and enterprise utility.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    name: "Marcus Vance",
    role: "Lead Systems Engineer",
    desc: "Kubernetes core contributor. Ensuring our cloud infrastructure is bulletproof and horizontally scalable.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    name: "Elena Rostova",
    role: "VP of Product",
    desc: "Master of developer experience, turning complex technical workflows into seamless digital products.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80"
  }
];

export default function OurTeam() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create a timeline that reveals profiles one by one as the user scrolls
      const cards = gsap.utils.toArray('.team-card');
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2, // This ensures they appear sequentially one after the other
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.blink}>_</span> THE_ARCHITECTS
          </div>
          <h2 className={styles.heading}>Meet the Core Team</h2>
        </div>

        <div className={`${styles.grid} team-grid`}>
          {team.map((member, idx) => (
            <div key={idx} className={`${styles.card} team-card`}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={member.img} 
                  alt={member.name} 
                  fill
                  className={styles.image}
                  unoptimized 
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{member.name}</h3>
                <span className={styles.role}>{member.role}</span>
                <p className={styles.desc}>{member.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
