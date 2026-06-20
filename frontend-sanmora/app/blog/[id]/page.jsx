import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ParticleBackground from '@/components/Home/ParticleBackground';
import BlogDetailClient from './BlogDetailClient';
import styles from '@/app/page.module.css';

import { blogPosts } from '@/components/Blog/blogData';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = blogPosts.find(p => p.id === parseInt(id));
  if (!post) {
    return {
      title: "Article Not Found | Sanmora Technologies",
      description: "The article you are looking for does not exist."
    };
  }
  return {
    title: `${post.title} | Sanmora Technologies`,
    description: post.excerpt || "Read the latest article from Sanmora Studio."
  };
}

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
