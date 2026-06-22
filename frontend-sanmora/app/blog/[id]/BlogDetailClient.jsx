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

const FaqAccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div style={{
      border: "1px solid rgba(124, 58, 237, 0.12)",
      borderRadius: "16px",
      marginBottom: "1.25rem",
      background: isOpen ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.35)",
      backdropFilter: "blur(10px)",
      boxShadow: isOpen ? "0 10px 30px -10px rgba(124, 58, 237, 0.12)" : "none",
      overflow: "hidden",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left",
          fontWeight: "700",
          fontSize: "1.1rem",
          color: "#0f172a",
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}
      >
        <span style={{ paddingRight: "1.5rem", lineHeight: "1.4" }}>{question}</span>
        <span style={{
          color: "#7c3aed",
          fontSize: "1.4rem",
          fontWeight: "300",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "inline-block",
          lineHeight: "1"
        }}>
          ＋
        </span>
      </button>
      
      <div style={{
        maxHeight: isOpen ? "500px" : "0px",
        opacity: isOpen ? 1 : 0,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        overflow: "hidden"
      }}>
        <div style={{
          padding: "0 24px 24px",
          lineHeight: "1.8",
          color: "#475569",
          fontSize: "1.025rem",
          borderTop: "1px solid rgba(124, 58, 237, 0.06)"
        }}>
          {parseInlineFormatting(answer)}
        </div>
      </div>
    </div>
  );
};

const renderContent = (text) => {
  if (!text) return null;
  const lines = text.split("\n");
  const elements = [];
  let listItems = [];
  let codeBlockLines = [];
  let inCodeBlock = false;
  let codeLang = "";
  let tableRows = [];
  let inTable = false;
  const skipLines = new Set();

  const flushList = (index) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${index}`}>
          {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      );
      listItems = [];
    }
  };

  const flushTable = (index) => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-wrapper-${index}`} className={styles.tableWrapper} style={{ overflowX: "auto", margin: "1.5rem 0", width: "100%" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", color: "#334155", fontSize: "1rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(124, 58, 237, 0.2)", background: "rgba(124, 58, 237, 0.05)" }}>
                {tableRows[0].map((col, idx) => (
                  <th key={idx} style={{ padding: "12px 16px", textAlign: "left", fontWeight: "700", border: "1px solid rgba(124, 58, 237, 0.1)" }}>
                    {parseInlineFormatting(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((row, rIdx) => (
                <tr key={rIdx} style={{ borderBottom: "1px solid rgba(124, 58, 237, 0.08)", background: rIdx % 2 === 1 ? "rgba(124, 58, 237, 0.01)" : "transparent" }}>
                  {row.map((col, cIdx) => (
                    <td key={cIdx} style={{ padding: "12px 16px", border: "1px solid rgba(124, 58, 237, 0.08)" }}>
                      {parseInlineFormatting(col)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  lines.forEach((line, index) => {
    if (skipLines.has(index)) return;
    const trimmed = line.trim();

    // Check if starting or ending a code block
    if (trimmed.startsWith("```") || trimmed.startsWith("\\`\\`\\`") || trimmed.startsWith("`\\`\\`")) {
      flushList(index);
      flushTable(index);
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

    if (trimmed.startsWith("|")) {
      flushList(index);
      inTable = true;
      const cols = line.split("|").map(col => col.trim());
      if (cols[0] === "") cols.shift();
      if (cols[cols.length - 1] === "") cols.pop();
      const isSeparator = cols.length > 0 && cols.every(col => /^[:-]+$/.test(col));
      if (!isSeparator) {
        tableRows.push(cols);
      }
      return;
    }

    // If it's not a table line, flush the table if we were in one
    if (inTable) {
      flushTable(index);
    }

    if (!trimmed) {
      flushList(index);
      return;
    }

    if (trimmed.startsWith("#### Q")) {
      flushList(index);
      flushTable(index);
      const qText = trimmed.replace(/^####\s*Q\d+:\s*/i, "").replace(/^####\s*Q\d+\s*:\s*/i, "");
      let answerText = "";
      let answerIndex = -1;
      for (let j = index + 1; j < lines.length; j++) {
        const nextTrimmed = lines[j].trim();
        if (!nextTrimmed) continue;
        if (nextTrimmed.startsWith("**A") || nextTrimmed.startsWith("A")) {
          answerText = nextTrimmed.replace(/^\*\*A\d+:\*\*\s*/i, "").replace(/^A\d+:\s*/i, "").replace(/^\*\*A\d+:\s*\*\*/i, "");
          answerIndex = j;
          break;
        }
        if (nextTrimmed.startsWith("#") || nextTrimmed.startsWith("|")) break;
      }
      if (answerIndex !== -1) {
        elements.push(<FaqAccordionItem key={index} question={qText} answer={answerText} />);
        skipLines.add(answerIndex);
      } else {
        elements.push(<h4 key={index}>{qText}</h4>);
      }
      return;
    }

    if (trimmed.startsWith("####")) {
      flushList(index);
      elements.push(<h4 key={index}>{trimmed.replace(/^####\s*/, "")}</h4>);
    } else if (trimmed.startsWith("###")) {
      flushList(index);
      elements.push(<h3 key={index}>{trimmed.replace(/^###\s*/, "")}</h3>);
    } else if (trimmed.startsWith("##")) {
      flushList(index);
      elements.push(<h2 key={index}>{trimmed.replace(/^##\s*/, "")}</h2>);
    } else if (trimmed.match(/^[-]{3,}$/)) {
      flushList(index);
      elements.push(<hr key={index} style={{ border: 0, height: "1px", background: "rgba(124, 58, 237, 0.15)", margin: "2.5rem 0" }} />);
    } else if (trimmed.startsWith(">")) {
      flushList(index);
      elements.push(
        <blockquote key={index} className={styles.blockquote}>
          {parseInlineFormatting(trimmed.replace(/^>\s*/, ""))}
        </blockquote>
      );
    } else if (trimmed.startsWith("-")) {
      listItems.push(parseInlineFormatting(trimmed.replace(/^-\s*/, "")));
    } else if (trimmed.match(/^\d+\.\s/)) {
      flushList(index);
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
      flushList(index);
      elements.push(<p key={index}>{parseInlineFormatting(trimmed)}</p>);
    }
  });

  flushList("end");
  flushTable("end");

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

// Split content at the first subheading (H2 or H3)
const splitContent = (content) => {
  if (!content) return { intro: "", details: "" };
  const splitIndex = content.indexOf("##");
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
      <div className={styles.notFoundSection}>
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

  return (
    <div className={styles.detailPage}>
      {post.id === 10 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is Local SEO, and how does it help startups in Ahmedabad?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Local SEO is the practice of optimizing your online presence to rank for location-based searches in a specific city or neighborhood. For Ahmedabad startups, it helps you rank in the Google Map Pack and search engine results for terms like 'SEO for startups' or 'Ahmedabad SEO services,' letting you capture ready-to-buy clients nearby."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does a Google Business Profile affect my local rankings?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Your Google Business Profile is the primary source of information Google uses to calculate local search rankings. An optimized profile with accurate categories, matching address details (NAP), active photos, and positive customer reviews signals to Google that your startup is active and trustworthy."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why is website speed important for local search rankings?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Google uses page load speed and user experience metrics (Core Web Vitals) as direct ranking factors. A slow website frustrates users, leading them to bounce back to the search results. Sanmora builds ultra-fast, headless Next.js frontends to ensure loading speeds of under 1 second, boosting both search rankings and client conversions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the difference between traditional SEO and Local SEO?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Traditional SEO focuses on optimizing your website for keywords on a national or global scale, which often involves high competition and long timelines. Local SEO focuses on ranking for geographically specific searches in a target radius (e.g., website SEO Ahmedabad), which drives immediate, highly targeted local leads."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I build local citations for my startup in Ahmedabad?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can build citations by listing your startup on high-authority directories like Justdial, IndiaMART, Sulekha, and Google Business Profile. The critical rule is to ensure your Name, Address, and Phone Number (NAP) are 100% consistent across all pages and profiles."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is AEO (Answer Engine Optimization) and why does it matter in 2026?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Answer Engine Optimization (AEO) is the practice of structuring your website content so AI assistants (like Google Gemini and ChatGPT) can easily read, extract, and cite it. This involves writing clear, conversational definitions, using bullet points, and adding structured schema data."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can keyword stuffing help my website rank faster?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Keyword stuffing (repeating keywords excessively to manipulate search rankings) is an outdated technique. Google's algorithms now use advanced Natural Language Processing to detect and penalize keyword stuffing. Always write natural, high-quality content for human readers first."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does it take to see results from a Local SEO campaign?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While traditional organic SEO can take 6 to 12 months, a well-optimized Local SEO campaign (focusing on GBP optimization, speed improvements, and review collection) can drive visible improvements in your Google Map Pack rankings within 4 to 8 weeks."
                  }
                }
              ]
            })
          }}
        />
      )}
      {/* Blog Hero section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbActive}>{post.title}</span>
          </div>

          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.headline}>
            <span className={styles.blinkWord}>{post.title}</span>
          </h1>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {post.date}
            </span>
            <span className={styles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Main content body */}
      <section className={styles.contentSection}>
        <div className={styles.articleContainer}>
          <Link href="/blog" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to all articles
          </Link>

          {/* Cover Image */}
          <div className={styles.imageWrapper}>
            <img
              src={post.image}
              alt={post.title}
              className={styles.featuredImage}
            />
          </div>

          <div className={styles.articleLayoutGrid}>
            <div className={styles.articleMainBody}>
              {/* Author Block */}
              <div className={styles.authorBlock}>
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

              {/* Combined Article Body */}
              <div className={styles.richParagraphs}>
                {renderContent(post.content)}
              </div>
            </div>

            {/* Sidebar with sticky CTA */}
            <aside className={styles.sidebar}>
              <div className={styles.stickyCtaContainer}>
                <div className={styles.ctaSection}>
                  <h4 className={styles.ctaTitle}>Looking for premium web services?</h4>
                  <p className={styles.ctaDesc}>
                    Sanmora builds blazing-fast Next.js portals, custom database applications, and high-impact local SEO systems. Let's grow your brand.
                  </p>
                  
                  <div className={styles.ctaInfoBlock}>
                    <p className={styles.ctaInfoItem}>
                      <strong>Address:</strong><br />
                      13, Virat Apartment,<br />
                      Opp. B.R.T. Bus Stand,<br />
                      Sola Road, Ghatlodiya,<br />
                      Ahmedabad, 380061
                    </p>
                    <p className={styles.ctaInfoItem}>
                      <strong>Email:</strong> <a href="mailto:info@sanmora.in" className={styles.sidebarLink}>info@sanmora.in</a>
                    </p>
                    <p className={styles.ctaInfoItem}>
                      <strong>WhatsApp:</strong> <a href="https://wa.me/918780005326" target="_blank" rel="noopener noreferrer" className={styles.sidebarLink}>+91 87800 05326</a>
                    </p>
                  </div>

                  <Link href="/consultation" className={styles.ctaBtn} style={{ width: "100%", marginTop: "1rem" }}>
                    Get Free Quote & Audit
                  </Link>
                </div>
              </div>
            </aside>
          </div>

        </div>
      </section>
    </div>
  );
}
