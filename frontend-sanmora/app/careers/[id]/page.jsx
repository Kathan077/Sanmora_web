import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ParticleBackground from '@/components/Home/ParticleBackground';
import JobDetailClient from './JobDetailClient';
import styles from '@/app/page.module.css';

export const metadata = {
  title: "Career Opportunity | Sanmora Technologies",
  description: "Explore job details and requirements, and apply to join the engineering and design team at Sanmora Studio."
};

export default async function JobDetailPage({ params }) {
  const { id } = await params;

  return (
    <main className={styles.page}>
      <ParticleBackground />
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>

      <Navbar />
      <JobDetailClient id={id} />
      <Footer />
    </main>
  );
}
