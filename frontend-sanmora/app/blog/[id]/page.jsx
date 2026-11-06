import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ParticleBackground from '@/components/Home/ParticleBackground';
import BlogDetailClient from './BlogDetailClient';
import styles from '@/app/page.module.css';

import { blogPosts } from '@/components/Blog/blogData';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = blogPosts.find(p => p.id === parseInt(id) || p.slug === id);
  if (!post) {
    return {
      title: "Article Not Found | Sanmora",
      description: "The article you are looking for does not exist."
    };
  }

  const pageTitle = post.seoTitle 
    ? (post.seoTitle.includes("Sanmora") ? post.seoTitle : `${post.seoTitle} | Sanmora`)
    : `${post.title} | Sanmora`;
  const postUrl = `https://sanmora.in/blog/${post.slug || post.id}`;
  const imageUrl = post.image?.startsWith("http") ? post.image : `https://sanmora.in${post.image}`;

  return {
    title: pageTitle,
    description: post.metaDescription || post.excerpt || "Read the latest article from Sanmora.",
    keywords: post.keywords || [],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: postUrl,
      siteName: "Sanmora",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author || "Sanmora Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [imageUrl],
    },
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
