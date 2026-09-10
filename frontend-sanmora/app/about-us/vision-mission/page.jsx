import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import VisionMissionPageContent from "@/components/Aboutus/VisionMission/VisionMissionPageContent";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/Home/ParticleBackground";
import styles from "@/app/page.module.css";

export const metadata = {
  title: "OUR VISION & MISSION | Core Values & Roadmap | Sanmora",
  description: "Discover Sanmora's vision for enterprise technology leadership, mission statement, core pillars, and 2024-2030 strategic roadmap."
};

export default function VisionMissionSubPage() {
  return (
    <main className={styles.page}>
      <ParticleBackground />
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>

      <Navbar />
      <VisionMissionPageContent />
      <Footer />
    </main>
  );
}
