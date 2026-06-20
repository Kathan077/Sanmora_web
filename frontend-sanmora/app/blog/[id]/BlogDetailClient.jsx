"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { blogPosts } from '@/components/Blog/blogData';
import ServiceVisual from '@/components/Services/ServiceVisual';
import servicesStyles from '@/app/services/services.module.css';
import styles from './BlogDetailClient.module.css';

// Simple markdown-style inline renderer for links, bold, and inline code format
const parseInlineFormatting = (text) => {
  if (!text) return "";
  
  // Match markdown links [text](url), bold **text**, and code `text`
  const tokenRegex = /(\[.*?\]\(.*?\)|`.*?`|\*\*.*?\*\*)/g;
  const parts = text.split(tokenRegex);
  
  return parts.map((part, idx) => {
    if (!part) return null;
    
    // Check if it's a markdown link
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const linkText = match[1];
        const linkUrl = match[2];
        return (
          <Link 
            key={idx} 
            href={linkUrl} 
            className={styles.inlineLink}
          >
            {linkText}
          </Link>
        );
      }
    }
    
    // Check if it's bold text
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    
    // Check if it's inline code
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          style={{
            background: "rgba(124, 58, 237, 0.08)",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.9em",
            fontFamily: "monospace",
            color: "#7c3aed"
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    
    return part;
  });
};

const renderContent = (text) => {
  if (!text) return null;
  const lines = text.split("\n");
  const elements = [];
  let listItems = [];
  let codeBlockLines = [];
  let inCodeBlock = false;
  let codeLang = "";

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check if starting or ending a code block
    if (trimmed.startsWith("```") || trimmed.startsWith("\\`\\`\\`") || trimmed.startsWith("`\\`\\`")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${index}`} style={{
            background: "#1E293B",
            color: "#F8FAFC",
            padding: "20px",
            borderRadius: "12px",
            overflowX: "auto",
            fontSize: "0.85rem",
            fontFamily: "monospace",
            margin: "20px 0",
            lineHeight: 1.5,
            border: "1px solid rgba(255, 255, 255, 0.05)"
          }}>
            <code className={codeLang}>{codeBlockLines.join("\n")}</code>
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLang = trimmed.replace(/^[\\`]+/, "");
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    if (!trimmed) {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`}>
            {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
        listItems = [];
      }
      return;
    }

    if (trimmed.startsWith("###")) {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`}>
            {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
        listItems = [];
      }
      elements.push(<h3 key={index}>{trimmed.replace(/^###\s*/, "")}</h3>);
    } else if (trimmed.startsWith("####")) {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`}>
            {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
        listItems = [];
      }
      elements.push(<h4 key={index}>{trimmed.replace(/^####\s*/, "")}</h4>);
    } else if (trimmed.startsWith(">")) {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`}>
            {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
        listItems = [];
      }
      elements.push(
        <blockquote key={index} className={styles.blockquote}>
          {parseInlineFormatting(trimmed.replace(/^>\s*/, ""))}
        </blockquote>
      );
    } else if (trimmed.startsWith("-")) {
      listItems.push(parseInlineFormatting(trimmed.replace(/^-\s*/, "")));
    } else if (trimmed.match(/^\d+\.\s/)) {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`}>
            {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
        listItems = [];
      }
      const matchNum = trimmed.match(/^\d+/);
      const numPrefix = matchNum ? matchNum[0] : "1";
      const content = trimmed.replace(/^\d+\.\s*/, "");
      elements.push(
        <p key={index}>
          <strong>{numPrefix}. </strong>
          {parseInlineFormatting(content)}
        </p>
      );
    } else {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`}>
            {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
        listItems = [];
      }
      elements.push(<p key={index}>{parseInlineFormatting(trimmed)}</p>);
    }
  });

  if (listItems.length > 0) {
    elements.push(
      <ul key={`list-end`}>
        {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    );
  }

  if (inCodeBlock && codeBlockLines.length > 0) {
    elements.push(
      <pre key="code-end" style={{
        background: "#1E293B",
        color: "#F8FAFC",
        padding: "20px",
        borderRadius: "12px",
        overflowX: "auto",
        fontSize: "0.85rem",
        fontFamily: "monospace",
        margin: "20px 0",
        lineHeight: 1.5,
        border: "1px solid rgba(255, 255, 255, 0.05)"
      }}>
        <code>{codeBlockLines.join("\n")}</code>
      </pre>
    );
  }


  return elements;
};

// Split content at the first subheading
const splitContent = (content) => {
  if (!content) return { intro: "", details: "" };
  const splitIndex = content.indexOf("###");
  if (splitIndex === -1) {
    return { intro: content, details: "" };
  }
  return {
    intro: content.substring(0, splitIndex),
    details: content.substring(splitIndex)
  };
};

export default function BlogDetailClient({ id }) {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);

  // Find matching blog post
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className={servicesStyles.notFoundSection || styles.notFoundSection}>
        <h2 className={styles.notFoundTitle}>Article Not Found</h2>
        <p className={styles.notFoundDesc}>The article you are looking for does not exist or has been moved.</p>
        <Link href="/blog" className={styles.ctaBtn}>
          Back to Blog
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const { intro, details } = splitContent(post.content);

  return (
    <div className={servicesStyles.page}>
      {/* Blog Hero section */}
      <section className={servicesStyles.heroSection}>
        <div className={servicesStyles.heroContent}>
          <div className={servicesStyles.breadcrumb}>
            <Link href="/" className={servicesStyles.breadcrumbLink}>Home</Link>
            <span className={servicesStyles.breadcrumbSeparator}>/</span>
            <Link href="/blog" className={servicesStyles.breadcrumbLink}>Blog</Link>
            <span className={servicesStyles.breadcrumbSeparator}>/</span>
            <span className={servicesStyles.breadcrumbActive}>{post.title}</span>
          </div>

          <span className={servicesStyles.category || styles.category}>{post.category}</span>
          <h1 className={servicesStyles.headline}>
            <span className={servicesStyles.blinkWord}>{post.title}</span>
          </h1>

          <div className={servicesStyles.meta || styles.meta}>
            <span className={servicesStyles.metaItem || styles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {post.date}
            </span>
            <span className={servicesStyles.metaItem || styles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Main split content body */}
      <section className={servicesStyles.workspaceSection}>
        <div className={styles.articleContainer}>
          <Link href="/blog" className={styles.backBtn} style={{ marginBottom: "2rem" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to all articles
          </Link>

          <div className={servicesStyles.servicesListContainer} style={{ padding: 0 }}>

            {/* Row 1: Cover Image on Left, Intro Text + Author Block on Right */}
            <motion.div
              className={servicesStyles.serviceRow}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ServiceVisual
                src={post.image}
                alt={post.title}
                priority
                badge={post.category}
              />

              <div className={servicesStyles.serviceContentBox}>
                {/* Author Block */}
                <div className={styles.authorBlock} style={{ width: "100%" }}>
                  <div className={styles.authorAvatar}>
                    <span>S</span>
                  </div>
                  <div className={styles.authorInfo}>
                    <h5 className={styles.authorName}>Sanmora Team</h5>
                    <p className={styles.authorMeta}>Published in {post.category} • {post.date}</p>
                  </div>
                  <div className={styles.shareButtons}>
                    <span className={styles.shareLabel}>Share:</span>
                    <button className={styles.shareBtn} onClick={handleCopyLink}>
                      {copied ? "✓ Copied!" : "🔗 Copy Link"}
                    </button>
                  </div>
                </div>

                <div className={styles.richParagraphs}>
                  {renderContent(intro)}
                </div>
              </div>
            </motion.div>

            {/* Row 2: Detailed Guide on Left, Dynamic CTA/Consultation Widget on Right */}
            {details && (
              <motion.div
                className={servicesStyles.serviceRowReverse}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className={servicesStyles.serviceContentBox} style={{ width: "100%" }}>
                  <div className={styles.richParagraphs}>
                    {renderContent(details)}
                  </div>
                </div>

                {/* Consultation / CTA Card matching Service styling */}
                <div className={styles.stickyCtaContainer}>
                  <div className={styles.ctaSection} style={{ marginTop: "0", width: "100%", maxWidth: "440px" }}>
                    <h4 className={styles.ctaTitle}>Have a project?</h4>
                    <p className={styles.ctaDesc}>
                      Let&apos;s build something exceptional together. Speak with our specialists today.
                    </p>
                    <Link href="/consultation" className={styles.ctaBtn} style={{ width: "100%" }}>
                      Schedule Consultation
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
