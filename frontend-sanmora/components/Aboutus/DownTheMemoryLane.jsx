"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Film, Sparkles, Gamepad2, Users, Compass, Camera } from 'lucide-react';
import styles from './DownTheMemoryLane.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const memoryBlocks = [
  {
    id: "movie",

    category: "CINEMA & MOVIE NIGHTS",
    title: "Blockbuster Movie Premieres & Team Outings",
    description: "Private theater screenings, blockbuster premieres, luxury recliner seating, and popcorn with the entire Sanmora crew.",
    image: "/images/culture/sanmora_team_photo_2.jpeg",
    floatingBadge: "🎬 Movie Nights",
    highlights: ["Private Screenings", "Popcorn & Drinks", "Team Outings"],
    align: "left"
  },
 
  {
    id: "collaboration",
  
    category: "GLOBAL TEAM & COLLABORATION",
    title: "Cross-Border Collaboration & Workspace Culture",
    description: "Our office workspace brings together talented engineers, architects, and product leaders across India and South Africa in a supportive atmosphere built around teamwork and shared growth.",
    image: "/images/culture/sanmora_team_photo_4.jpeg",
    floatingBadge: "👥 Global Team",
    highlights: ["Global Collaboration", "Supportive Workspace", "Engineering Culture"],
    align: "left"
  },
  {
    id: "gatherings",
   
    category: "TEAM GATHERINGS & EVENTS",
    title: "Team Get-Togethers & Milestone Celebrations",
    description: "Monthly team get-togethers and cultural gatherings where team members come together to celebrate shared achievements, relax, and build strong bonds.",
    image: "/images/culture/sanmora_team_photo_5.jpeg",
    floatingBadge: "✨ Team Gathering",
    highlights: ["Team Gatherings", "Milestone Celebrations", "Stronger Together"],
    align: "right"
  },
  {
    id: "restaurant",
   
    category: "RESTAURANT OUTINGS & TEAM DINING",
    title: "Team Restaurant Outings & Food Treats",
    description: "Enjoying delicious team lunches, lavish dinners, and restaurant outings together, building strong team bonding over great food.",
    image: "/images/culture/sanmora_team_photo_3.jpeg",
    floatingBadge: "🍽️ Restaurant Outings",
    highlights: ["Restaurant Outings", "Team Dinners", "Gourmet Lunches"],
    align: "left"
  }
];

export default function DownTheMemoryLane() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".god-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );

      // Memory rows animation
      const cards = gsap.utils.toArray('.god-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef} id="down-the-memory-lane">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={`${styles.header} god-header`}>
          <div className={styles.topBadge}>
            <Camera size={14} className={styles.badgeIcon} />
            <span>OUR REAL MEMORIES</span>
          </div>

          <h2 className={styles.title}>
            DOWN THE <span className={styles.gradientText}>MEMORY LANE</span>
          </h2>
          
          <p className={styles.subtext}>
            Authentic moments from our movie outings, team breaks, global collaboration, and cultural celebrations.
          </p>

          <div className={styles.underline}></div>
        </div>

        {/* Split Feature Cards Showcase */}
        <div className={styles.blocksWrapper}>
          {memoryBlocks.map((block) => (
            <div 
              key={block.id}
              className={`${styles.featureCard} ${block.align === 'right' ? styles.cardReverse : ''} god-card`}
            >
              {/* Visual Side */}
              <div className={styles.visualSide}>
                <div className={styles.mainImageFrame}>
                  <img 
                    src={block.image} 
                    alt="" 
                    aria-hidden="true"
                    className={styles.blurBgImg}
                  />
                  <img 
                    src={block.image} 
                    alt={block.title} 
                    className={styles.memoryImg}
                  />
                  <div className={styles.badgeTag}>
                    <span>{block.floatingBadge}</span>
                  </div>
                  <div className={styles.glassGlow}></div>
                </div>
              </div>

              {/* Story / Content Side */}
              <div className={styles.contentSide}>
                <div className={styles.metaRow}>
                  <span className={styles.categoryNum}>{block.number}</span>
                  <span className={styles.categoryLabel}>{block.category}</span>
                </div>

                <h3 className={styles.blockTitle}>{block.title}</h3>
                
                <p className={styles.blockDesc}>{block.description}</p>

                <div className={styles.pillRow}>
                  {block.highlights.map((item, idx) => (
                    <span key={idx} className={styles.highlightPill}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
