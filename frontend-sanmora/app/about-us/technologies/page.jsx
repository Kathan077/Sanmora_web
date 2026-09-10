import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import TechnologiesPageContent from "@/components/Aboutus/Technologies/TechnologiesPageContent";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/Home/ParticleBackground";
import styles from "@/app/page.module.css";

export const metadata = {
  title: "OUR TECHNOLOGIES | Stack & Cloud Ecosystem | Sanmora",
  description: "Explore Sanmora's tech stack including React, Next.js, Node.js, Python, PostgreSQL, AWS, Docker, Kubernetes, and enterprise security compliance."
};

export default function TechnologiesSubPage() {
  return (
    <main className={styles.page}>
      <ParticleBackground />
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>

      <Navbar />
      <TechnologiesPageContent />
      <Footer />
    </main>
  );
}
