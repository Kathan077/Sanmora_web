import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import AboutHero from '@/components/Aboutus/AboutHero';
import WhyChooseUs from '@/components/Aboutus/WhyChooseUs';
import AboutCompany from '@/components/Aboutus/AboutCompany';
import VisionMission from '@/components/Home/VisionMission';
import AboutTechSection from '@/components/Aboutus/AboutTechSection';
import Footer from '@/components/Footer/Footer';
import ParticleBackground from '@/components/Home/ParticleBackground';
import styles from '@/app/page.module.css';
import CompanyStats from '@/components/Aboutus/CompanyStats';
import WhatWeDo from '@/components/Aboutus/WhatWeDo';
import WhyClientsChooseUs from '@/components/Aboutus/WhyClientsChooseUs';

export const metadata = {
  title: "About Us | Sanmora Studio",
  description: "Learn more about Sanmora Studio, our agile execution, and enterprise scaling solutions."
};

export default function AboutUsPage() {
  return (
    <main className={styles.page}>
      <ParticleBackground />
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>

      <Navbar />
      <AboutHero />
      <WhyChooseUs />
      <WhatWeDo />
      <VisionMission />
      <AboutTechSection />
      <Footer />
    </main>
  );
}

