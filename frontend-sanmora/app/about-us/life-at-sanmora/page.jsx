import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import LifeAtSanmoraHubComponent from "@/components/Aboutus/LifeAtSanmoraHub/LifeAtSanmoraHubComponent";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/Home/ParticleBackground";
import styles from "@/app/page.module.css";

export const metadata = {
  title: "life at sanmora | Culture, Perks & Team | Sanmora",
  description: "Experience life at Sanmora - our collaborative engineering culture, employee benefits, photo memories, and team environment."
};

export default function LifeAtSanmoraSubPage() {
  return (
    <main className={styles.page}>
      <ParticleBackground />
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>

      <Navbar />
      <LifeAtSanmoraHubComponent />
      <Footer />
    </main>
  );
}
