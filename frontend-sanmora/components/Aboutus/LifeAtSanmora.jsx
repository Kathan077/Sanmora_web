"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { 
  GraduationCap, 
  GitBranch, 
  Code2, 
  Sparkles, 
  Gamepad2, 
  Compass, 
  Sun, 
  Dumbbell, 
  HeartHandshake, 
  Film, 
  Award, 
  Calendar,
  Utensils,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import styles from './LifeAtSanmora.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 12 Culture / Benefit Items
const culturePerks = [
  {
    icon: GraduationCap,
    title: "Induction & Training",
    desc: "Structured 1-on-1 onboarding and technical mentorship from day one."
  },
  {
    icon: GitBranch,
    title: "Defined Hierarchy",
    desc: "Clear growth roadmap, transparent reporting, and defined career steps."
  },
  {
    icon: Code2,
    title: "Continuous Upskilling",
    desc: "Hands-on engineering workshops, hackathons, and paid certifications."
  },
  {
    icon: Sparkles,
    title: "Festival Celebrations",
    desc: "Grand festive parties, cultural theme days, and traditional celebrations."
  },
  {
    icon: Gamepad2,
    title: "Weekly Indoor Games",
    desc: "Console gaming, table tennis tournaments, and relaxed brain breaks."
  },
  {
    icon: Compass,
    title: "Outdoor Games & Trekking",
    desc: "Team sports days, mountain treks, cricket leagues, and outdoor adventures."
  },
  {
    icon: Sun,
    title: "Weekend Getaways",
    desc: "Recharging resort trips, day picnics, and refreshing team excursions."
  },
  {
    icon: Dumbbell,
    title: "Fitness & Workouts",
    desc: "Daily office stretching sessions, wellness breaks, and health focus."
  },
  {
    icon: HeartHandshake,
    title: "Social Responsibility",
    desc: "Community welfare drives, environmental initiatives, and tech outreach."
  },
  {
    icon: Film,
    title: "Movie Outings & Screenings",
    desc: "Private cinema bookings, blockbuster premieres, and popcorn nights."
  },
  {
    icon: Award,
    title: "Soft Skills & Growth",
    desc: "Communication labs, public speaking, and executive leadership coaching."
  },
  {
    icon: Calendar,
    title: "5 Days Working",
    desc: "Balanced 5-day week designed to prevent burnout and ensure peak energy."
  }
];

// Memory Lane Cards
const memories = [
  {
    id: "movie-1",
    category: "movie",
    categoryLabel: "Movie Outings",
    title: "Blockbuster Premiere Nights",
    description: "Private theater screenings, luxury recliner seats, and popcorn with the entire Sanmora squad.",
    image: "/images/culture/movie_night.png",
    badge: "Cinema Night"
  },
  {
    id: "food-1",
    category: "food",
    categoryLabel: "Food & Restaurants",
    title: "Gourmet Rooftop Dinners",
    description: "Celebrating quarterly milestones over lavish dinners, craft beverages, and great conversations.",
    image: "/images/culture/food_dining.png",
    badge: "Dining Outing"
  },
  {
    id: "trip-1",
    category: "trips",
    categoryLabel: "Annual Trips",
    title: "Lush Resort Retreat & Pool Bash",
    description: "Annual 2-day team getaway with pool parties, outdoor cricket matches, and bonfire evenings.",
    image: "/images/culture/team_trip.png",
    badge: "Annual Retreat"
  },
  {
    id: "festival-1",
    category: "festivals",
    categoryLabel: "Festivals & Celebrations",
    title: "Diwali & Cultural Extravaganza",
    description: "Ethnic attire day, vibrant office rangolis, cash rewards, Amazon vouchers, and festive sweets.",
    image: "/images/culture/festival.png",
    badge: "Cultural Day"
  }
];

const categories = [
  { key: "all", label: "All Memories" },
  { key: "movie", label: "Movie Outings" },
  { key: "food", label: "Food & Restaurants" },
  { key: "trips", label: "Annual Trips" },
  { key: "festivals", label: "Festivals & Celebrations" }
];

export default function LifeAtSanmora() {
  const [activeTab, setActiveTab] = useState("all");
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".las-reveal",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );

      // Grid items reveal
      gsap.fromTo(
        ".las-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.${styles.perksGrid}`,
            start: "top 85%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const filteredMemories = activeTab === "all" 
    ? memories 
    : memories.filter(m => m.category === activeTab);

  return (
    <section className={styles.section} ref={containerRef} id="life-at-sanmora">
      <div className={styles.container}>
        
        {/* Top Hero / Intro Section */}
        <div className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <div className={`${styles.badge} las-reveal`}>
              <span className={styles.badgeDot}></span>
              LIFE AT SANMORA
            </div>
            
            <h2 className={`${styles.title} las-reveal`}>
              Vibrant Culture. Extraordinary People.
            </h2>
            
            <p className={`${styles.description} las-reveal`}>
              Life at Sanmora is energizing, collaborative, and deeply fulfilling. Our workspace is designed for innovation—combining a relaxed, plant-decorated atmosphere with soft ambient music, state-of-the-art tech stacks, and structured breaks that keep our teams spirited and inspired throughout the day.
            </p>
            
            <p className={`${styles.description} las-reveal`}>
              Beyond daily engineering, we build memories! From monthly achiever awards with cash prizes and Amazon vouchers to grand festival celebrations, private movie screenings, food outings, and annual resort retreats—Sanmora is where your career thrives and life happens.
            </p>
            
            <div className={`${styles.ctaWrapper} las-reveal`}>
              <Link href="/careers" className={styles.primaryCta}>
                <span>Work With Us</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className={`${styles.heroDecoration} las-reveal`}>
            <div className={styles.glowOrb}></div>
            <div className={styles.glassGraphic}>
              <div className={styles.statCard}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Vibrant Atmosphere</span>
              </div>
              <div className={styles.statCardAlt}>
                <span className={styles.statNum}>5 Days</span>
                <span className={styles.statLabel}>Balanced Work Week</span>
              </div>
              <div className={styles.statCardThird}>
                <span className={styles.statNum}>Unlimited</span>
                <span className={styles.statLabel}>Learning & Outings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Perks Grid Section */}
        <div className={styles.perksSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.subLabel}>OUR CULTURE HIGHLIGHTS</span>
            <h3 className={styles.subTitle}>Everything You Need To Thrive</h3>
          </div>

          <div className={styles.perksGrid}>
            {culturePerks.map((perk, index) => {
              const IconComp = perk.icon;
              return (
                <div key={index} className={`${styles.perkCard} las-card`}>
                  <div className={styles.iconContainer}>
                    <IconComp size={24} className={styles.icon} />
                  </div>
                  <h4 className={styles.perkTitle}>{perk.title}</h4>
                  <p className={styles.perkDesc}>{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Memory Lane Gallery Section */}
        <div className={styles.memorySection}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.subLabel}>DOWN THE MEMORY LANE</span>
            <h3 className={styles.subTitle}>Moments We Cherish Together</h3>
            <p className={styles.memoryIntroText}>
              A glimpse into our movie outings, food celebrations, resort retreats, and festival moments.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className={styles.tabContainer}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`${styles.tabBtn} ${activeTab === cat.key ? styles.tabActive : ''}`}
              >
                {cat.key === "movie" && <Film size={15} className={styles.tabIcon} />}
                {cat.key === "food" && <Utensils size={15} className={styles.tabIcon} />}
                {cat.key === "trips" && <Compass size={15} className={styles.tabIcon} />}
                {cat.key === "festivals" && <Sparkles size={15} className={styles.tabIcon} />}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Gallery Cards Grid */}
          <div className={styles.memoryGrid}>
            {filteredMemories.map((item) => (
              <div key={item.id} className={styles.memoryCard}>
                <div className={styles.imageWrapper}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className={styles.memoryImg}
                  />
                  <span className={styles.cardBadge}>{item.badge}</span>
                  <div className={styles.imgOverlay}></div>
                </div>
                
                <div className={styles.cardBody}>
                  <span className={styles.cardCategory}>{item.categoryLabel}</span>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
