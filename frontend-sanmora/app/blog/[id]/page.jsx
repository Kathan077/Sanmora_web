import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ParticleBackground from '@/components/Home/ParticleBackground';
import BlogDetailClient from './BlogDetailClient';
import styles from '@/app/page.module.css';

export const metadata = {
  title: "Insights & Articles | Sanmora Studio",
  description: "Read the full article and gain insights from the engineering, design, and marketing team at Sanmora Studio."
};

export default async function BlogDetailPage({ params }) {
  const { id } = await params;

  return (
    <main className={styles.page}>
      <ParticleBackground />
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>

      <Navbar />
      <BlogDetailClient id={id} />
      <Footer />
    </main>
  );
}
