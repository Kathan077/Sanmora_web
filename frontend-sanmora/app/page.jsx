"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import styles from "./page.module.css";
import Hero from "@/components/Home/Hero";
import HomeAboutUs from "@/components/Home/Home_aboutus";
import Solutions from "@/components/Home/Solutions";
import Services from "@/components/Home/Services";
import Workflow from "@/components/Home/Workflow";
import Technologies from "@/components/Home/Technologies";
import Processes from "@/components/Home/Process";
import ParticleBackground from "@/components/Home/ParticleBackground";
import DigitalGrowth from "@/components/Home/DigitalGrowth";

export default function Home() {
  return (
    <div className={styles.page}>
      <ParticleBackground />

      {/* Floating Ambient Parallax Glows */}
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>

      {/* Header Navigation */}
      <Navbar />
      <Hero />
      <HomeAboutUs />
      <Processes />
      <Services />
      <Workflow />
      <DigitalGrowth />

      <Solutions />
      <Technologies />

      {/* Elegant Footer */}
      <Footer />
    </div>
  );
}
