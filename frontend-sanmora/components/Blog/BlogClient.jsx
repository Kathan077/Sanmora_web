"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './BlogClient.module.css';
import servicesStyles from '@/app/services/services.module.css';
import ParticleBackground from '@/components/Home/ParticleBackground';
import { blogPosts } from './blogData';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function BlogClient() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className={servicesStyles.page}>
      <ParticleBackground />
      <div className={servicesStyles.ambientGlowPrimary} />
      <div className={servicesStyles.ambientGlowSecondary} />
      <div className={servicesStyles.ambientGlowTertiary} />

      {/* Page Hero */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.heroContent}
          >
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbActive}>Blog</span>
            </div>

            <h1 className={styles.headline}>
              <span className={styles.blinkWord}>OUR BLOG</span>
            </h1>

            <p className={styles.heroDesc}>
              Bespoke insights, technical deep dives, and digital growth strategies from the team at Sanmora.
            </p>
          </motion.div>
        </div>
      </section>

      <div className={styles.blogContainer}>
        <motion.div
          className={styles.blogGrid}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Featured Post */}
          {featuredPost && (
            <motion.div className={styles.featuredCard} variants={itemVariants}>
              <div className={styles.featuredImageWrapper}>
                <img src={featuredPost.image} alt={featuredPost.title} className={styles.featuredImage} />
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.meta}>
                  <span className={styles.category}>{featuredPost.category}</span>
                  <span className={styles.date}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {featuredPost.date}
                  </span>
                  <span className={styles.readTime}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className={styles.postTitle}>{featuredPost.title}</h2>
                <p className={styles.postExcerpt}>{featuredPost.excerpt}</p>
                <Link href={`/blog/${featuredPost.id}`} className={styles.readMoreBtn}>
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Regular Posts */}
          {regularPosts.map((post) => (
            <motion.div key={post.id} className={styles.regularCard} variants={itemVariants}>
              <div className={styles.regularImageWrapper}>
                <img src={post.image} alt={post.title} className={styles.regularImage} />
              </div>
              <div className={styles.regularContent}>
                <div className={styles.meta}>
                  <span className={styles.category}>{post.category}</span>
                  <span className={styles.date}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {post.date}
                  </span>
                  <span className={styles.readTime}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {post.readTime}
                  </span>
                </div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className={styles.readMoreBtn}>
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
