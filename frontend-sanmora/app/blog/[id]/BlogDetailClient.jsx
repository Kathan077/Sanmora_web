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
    <div className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.faqButton}
      >
        <span className={styles.faqQuestionText}>{question}</span>
        <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ""}`}>
          ＋
        </span>
      </button>
      
      <div className={`${styles.faqAnswerContainer} ${isOpen ? styles.faqAnswerContainerOpen : ""}`}>
        <div className={styles.faqAnswerContent}>
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
        <div key={`table-wrapper-${index}`} className={styles.tableWrapper}>
          <table className={styles.blogTable}>
            <thead>
              <tr>
                {tableRows[0].map((col, idx) => (
                  <th key={idx}>
                    {parseInlineFormatting(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((col, cIdx) => (
                    <td key={cIdx}>
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
      {post.id === 11 && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How much does a logo design cost in India for a startup?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "For a startup in India, a professional custom logo design typically costs between ₹8,000 and ₹25,000 when hiring an experienced freelancer. If you need a comprehensive visual identity system—including stationery layouts, packaging files, and corporate stylebooks—prices usually range from ₹30,000 to ₹75,000 with a boutique design studio."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why is agency logo design so much more expensive than freelancer design?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Agencies charge more because their scope goes beyond graphic design. When you hire an agency, you work with a team of researchers, strategists, designers, and project managers. They conduct target market research, analyze competitors, test the logo across digital applications, and build a unified visual identity system, resulting in a more durable and effective business asset."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I trademark a logo designed using a template or AI?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It is highly unlikely. The Trademark Registry of India requires design marks to be distinct and original. Templates and AI logos are built using shared public databases and graphics, meaning multiple companies may have highly similar designs, which will result in trademark rejection or legal conflicts."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What file formats should I receive from a logo designer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "You should receive editable vector source files—including SVG, EPS, and AI (Adobe Illustrator) formats—which allow you to scale the logo to any size. Additionally, you should receive high-resolution web formats, including transparent PNGs and JPEGs for social media and website profiles."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How many initial concepts and revisions should a logo package include?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A standard professional logo package typically offers 2 to 4 initial design concepts. Once you select a concept, the package should include 2 to 3 rounds of revisions to adjust colors, fonts, and details. Be sure to confirm the exact number of concepts and revisions in writing before starting the project."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does the professional logo design process take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A professional design process usually takes between 2 and 6 weeks. This timeline includes research and competitor audits (1 week), initial concept creation (1–2 weeks), feedback and revisions (1 week), and final file exports and brand guide documentation (1 week)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is a brand style guide, and do I need one?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A brand style guide (or corporate book) outlines the rules for using your brand assets. It defines color codes (HEX, RGB, CMYK), typography setups, and clear spacing rules. Yes, you need one to ensure your marketing teams keep visuals consistent."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are fonts included in the logo design price?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The designer will provide font files or download links. However, if your design uses a premium, proprietary typeface, you must purchase the commercial license to use it on your website, app, or corporate materials. Open-source options like Google Fonts require no licensing fees."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I update my existing logo instead of designing a new one?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, this is called a brand refresh. A refresh keeps your core elements (like your primary color or symbol) but updates the typography, spacing, and styling to make it look modern. Brand refreshes are a great option for established companies that want to update their look without losing customer recognition."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What makes a logo successful and memorable?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A successful logo is simple, memorable, scalable, and timeless. It should be easily readable on a small mobile screen, work in a single color (black or white) for physical prints, look distinct from competitors, and represent your brand's core values clearly."
                    }
                  }
                ]
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Logo Design Cost in India (2026): Complete Pricing Guide for Startups & Small Businesses",
                "image": "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
                "author": {
                  "@type": "Organization",
                  "name": "Sanmora Team",
                  "url": "https://sanmora.in"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Sanmora Technologies",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://sanmora.in/logo/sanmora-logo.png"
                  }
                },
                "datePublished": "2026-06-27",
                "description": "How much does a professional logo design cost in India in 2026? From freelancers and design agencies to DIY and AI, here is the complete pricing breakdown, hidden costs, and how to choose the right partner for your startup."
              })
            }}
          />
        </>
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
                      <strong>WhatsApp:</strong> <a href="https://wa.me/918780005326?text=Hello%20Sanmora%2C%20I%20would%20like%20to%20inquire%20about%20your%20Web%20Development%20and%20SEO%20services." target="_blank" rel="noopener noreferrer" className={styles.sidebarLink}>+91 87800 05326</a>
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
