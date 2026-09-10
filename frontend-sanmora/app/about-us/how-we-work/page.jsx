import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import HowWeWorkComponent from "@/components/Aboutus/HowWeWork/HowWeWorkComponent";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/Home/ParticleBackground";
import styles from "@/app/page.module.css";

export const metadata = {
  title: "How We Work | Agile Execution & Process | Sanmora",
  description: "Explore Sanmora's 5-stage engineering delivery pipeline, technical SLAs, and flexible client engagement models."
};

export default function HowWeWorkPage() {
  return (
    <main className={styles.page}>
      <ParticleBackground />
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>

      <Navbar />
      <HowWeWorkComponent />
      <Footer />
    </main>
  );
}
