import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ParticleBackground from '@/components/Home/ParticleBackground';
import CareersClient from './CareersClient';
import styles from '@/app/page.module.css';

export const metadata = {
  title: "Careers | Sanmora Technologies",
  description: "Join Sanmora Studio. Explore job openings in UI/UX Design and Business Development. Shape the future of digital innovation."
};

export default function CareersPage() {
  return (
    <main className={styles.page}>
      <ParticleBackground />
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>

      <Navbar />
      <CareersClient />
      <Footer />
    </main>
  );
}
