"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Home/Hero";
import ParticleBackground from "@/components/Home/ParticleBackground";
import styles from "./page.module.css";

import {
  HomeAboutSkeleton,
  ProcessSkeleton,
  ServicesSkeleton,
  WorkflowSkeleton,
  GrowthSkeleton,
  SolutionsSkeleton,
  TechSkeleton,
} from "@/components/Shared/InstagramLoading/InstagramSkeleton";

// Progressive Instagram-style loading components with Shimmer Skeletons
const HomeAboutUs = dynamic(() => import("@/components/Home/Home_aboutus"), {
  loading: () => <HomeAboutSkeleton />,
  ssr: true,
});

const Processes = dynamic(() => import("@/components/Home/Process"), {
  loading: () => <ProcessSkeleton />,
  ssr: true,
});

const Services = dynamic(() => import("@/components/Home/Services"), {
  loading: () => <ServicesSkeleton />,
  ssr: true,
});

const Workflow = dynamic(() => import("@/components/Home/Workflow"), {
  loading: () => <WorkflowSkeleton />,
  ssr: true,
});

const DigitalGrowth = dynamic(() => import("@/components/Home/DigitalGrowth"), {
  loading: () => <GrowthSkeleton />,
  ssr: true,
});

const Solutions = dynamic(() => import("@/components/Home/Solutions"), {
  loading: () => <SolutionsSkeleton />,
  ssr: true,
});

const Technologies = dynamic(() => import("@/components/Home/Technologies"), {
  loading: () => <TechSkeleton />,
  ssr: true,
});

export default function Home() {
  return (
    <div className={styles.page}>
      <ParticleBackground />

      {/* Floating Ambient Parallax Glows */}
      <div className={styles.ambientGlowPrimary} />
      <div className={styles.ambientGlowSecondary} />

      {/* Header Navigation & Instant Hero */}
      <Navbar />
      <Hero />

      {/* Progressive Viewport Hydrated Sections */}
      <div className={styles.progressiveSection}>
        <HomeAboutUs />
      </div>

      <div className={styles.progressiveSection}>
        <Processes />
      </div>

      <div className={styles.progressiveSection}>
        <Services />
      </div>

      <div className={styles.progressiveSection}>
        <Workflow />
      </div>

      <div className={styles.progressiveSection}>
        <DigitalGrowth />
      </div>

      <div className={styles.progressiveSection}>
        <Solutions />
      </div>

      <div className={styles.progressiveSection}>
        <Technologies />
      </div>

      {/* Elegant Footer */}
      <Footer />
    </div>
  );
}
