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
      const textVal = trimmed.replace(/^###\s*/, "");
      const id = textVal.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
      elements.push(<h3 key={index} id={id}>{textVal}</h3>);
    } else if (trimmed.startsWith("##")) {
      flushList(index);
      const textVal = trimmed.replace(/^##\s*/, "");
      const id = textVal.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
      elements.push(<h2 key={index} id={id}>{textVal}</h2>);
    } else if (trimmed.startsWith("#")) {
      // Skip single # headings (like # SEO Title:, # Meta Title:, etc.)
      return;
    } else if (trimmed.match(/^[-]{3,}$/)) {
      flushList(index);
      elements.push(<hr key={index} className={styles.blogHr} />);
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

const stripTableOfContents = (content) => {
  if (!content) return "";
  const lines = content.split("\n");
  const filteredLines = [];
  let inTOC = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.toLowerCase().includes("## table of contents")) {
      inTOC = true;
      continue;
    }
    
    if (inTOC) {
      // TOC section terminates when hitting another subheading or horizontal rule
      if (trimmed.startsWith("##") || trimmed.match(/^[-]{3,}$/)) {
        inTOC = false;
        if (trimmed.match(/^[-]{3,}$/)) {
          continue; // Skip the separator following TOC to avoid double separators
        }
      } else {
        continue; // Skip all TOC links and list elements
      }
    }
    
    filteredLines.push(line);
  }
  
  return filteredLines.join("\n");
};

const parseHeadings = (content) => {
  if (!content) return [];
  const lines = content.split("\n");
  const headings = [];
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      const level = trimmed.startsWith("## ") ? 2 : 3;
      const text = trimmed.replace(/^##+\s*/, "");
      const lowerText = text.toLowerCase();
      
      // Filter out meta headings, TOC header itself, intro headers etc.
      if (
        lowerText.includes("table of contents") ||
        lowerText.includes("blog introduction") ||
        lowerText.includes("main article") ||
        lowerText.includes("call to action") ||
        lowerText.includes("conclusion & key takeaways") ||
        lowerText.includes("conclusion & call to action") ||
        lowerText.includes("key takeaways") ||
        lowerText.includes("need a custom logo") ||
        lowerText.includes("frequently asked questions") ||
        lowerText.includes("expert seo checklist") ||
        lowerText.includes("common seo myths") ||
        lowerText.includes("why every business needs") ||
        lowerText.includes("factors that affect") ||
        lowerText.includes("freelancer vs agency") ||
        lowerText.includes("logo pricing by") ||
        lowerText.includes("what is included in") ||
        lowerText.includes("hidden costs to") ||
        lowerText.includes("how to choose the") ||
        lowerText.includes("common mistakes businesses") ||
        lowerText.includes("real-world pricing") ||
        lowerText.includes("why cheap logos") ||
        lowerText.includes("final thoughts")
      ) {
        return;
      }
      
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
      headings.push({ text, level, id });
    }
  });
  return headings;
};

export default function BlogDetailClient({ id }) {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);
  const [activeId, setActiveId] = React.useState("");
  const [shareUrl, setShareUrl] = React.useState("");

  // Find matching blog post
  const post = blogPosts.find(p => p.id === parseInt(id));

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [id]);

  const cleanContent = React.useMemo(() => {
    return post ? stripTableOfContents(post.content) : "";
  }, [post]);

  const headings = React.useMemo(() => {
    return cleanContent ? parseHeadings(cleanContent) : [];
  }, [cleanContent]);

  React.useEffect(() => {
    if (!post || headings.length === 0) return;
    
    let observer;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
      );

      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [post, headings]);

  // Auto-scroll the active TOC link inside the sticky sidebar container when it changes
  React.useEffect(() => {
    if (activeId) {
      const activeElement = document.querySelector(`.${styles.tocLinkActive}`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
    }
  }, [activeId]);

  const relatedPosts = React.useMemo(() => {
    if (!post) return [];
    const filtered = blogPosts.filter(p => p.id !== post.id);
    const sameCategory = filtered.filter(p => p.category === post.category);
    const otherCategory = filtered.filter(p => p.category !== post.category);
    return [...sameCategory, ...otherCategory].slice(0, 2); // 2 posts as shown in screenshot
  }, [post]);

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

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, null, `#${targetId}`);
      setActiveId(targetId);
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
      {post.id === 13 && (
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
                    "name": "What are the main SEO mistakes that stop websites from ranking?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The primary SEO mistakes include ignoring search intent, choosing high-competition keywords, publishing duplicate or thin content, having slow page load speeds (poor Core Web Vitals), and failing to configure technical foundations like XML sitemaps and search console verification."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does search intent affect Google rankings?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Search intent is the primary reason why a user performs a search. If your page layout does not match that intent (e.g., displaying a service catalog when a user wants a guide), visitors will bounce immediately. Google monitors this behavior and lowers your rankings."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why is website performance important for SEO?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Website performance, especially mobile rendering speed and visual stability, directly impacts SEO. Google uses Core Web Vitals (LCP, CLS, INP) as direct ranking factors. Slow or unstable websites frustrate users, leading to high bounce rates and lower search rankings."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the difference between On-Page and Technical SEO?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "On-Page SEO focuses on optimizing the elements visible to users, such as content quality, headings, title tags, and meta descriptions. Technical SEO focuses on code-level elements, such as sitemaps, robots.txt, redirect paths, SSL certificates, and server speeds."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I rank a website without backlinks?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. For low-competition or hyper-local search terms, you can rank page one of Google through technical optimization, speed improvements, and high-quality content. However, for highly competitive national keywords, high-authority backlinks remain crucial."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why is Google Search Console important?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Google Search Console is a free tool that shows how search engine crawlers interact with your website. It alerts you to indexing errors, sitemap bugs, security warnings, and provides exact data on the keywords driving traffic to your site."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does it take to see results from an SEO campaign?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "SEO is a long-term marketing strategy. While technical fixes can yield quick improvements in crawl rates within weeks, significant organic keyword rankings and organic traffic growth typically require 4 to 6 months of consistent effort."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does duplicate content trigger a search penalty?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Google does not have a formal \"duplicate content penalty.\" Instead, the algorithm filters out duplicate results to keep search listings unique, meaning your duplicate pages will simply not be indexed or rank, wasting your crawl budget."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is Schema Markup and why should I use it?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Schema markup is structured data code (JSON-LD) that helps search engines parse the details of your page. Implementing schema helps you earn rich snippets (star ratings, prices, FAQs) in search results, boosting your click-through rates."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How often should I update my website's content?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "You should audit and update your high-value pages at least once a year. Focus on correcting outdated statistics, verifying external links, expanding thin paragraphs with new data, and refining headings to target fresh keywords."
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
                "headline": "25 SEO Mistakes That Stop Your Website from Ranking",
                "image": "https://sanmora.in/images/seo_mistakes_banner.png",
                "author": {
                  "@type": "Organization",
                  "name": "Sanmora Team",
                  "url": "https://sanmora.in"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Sanmora",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://sanmora.in/logo/sanmora-logo.png"
                  }
                },
                "datePublished": "2026-07-18",
                "description": "Struggling to get your site to the first page of Google? Discover the 25 most common SEO errors that kill organic rankings—from search intent misalignment to technical Core Web Vitals issues—and learn how to audit and fix them."
              })
            }}
          />
        </>
      )}
      {post.id === 12 && (
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
                    "name": "What is the primary difference between standard software and AI-powered software?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Standard software runs on deterministic \"if-then\" code rules written by humans, executing exactly what is hard-coded. AI-powered software utilizes semantic understanding and machine learning models to interpret user intent, read unstructured data, write code, and dynamically adapt its outputs based on context."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is Retrieval-Augmented Generation (RAG) and why is it important for business software?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "RAG is an architecture that connects a generative AI model to an external database of verified company documents. Before answering a user prompt, the software searches the database for relevant files, extracts the facts, and feeds them to the AI model. This prevents hallucinations, keeps answers accurate, and ensures customer data remains private."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can custom AI solutions work with our existing legacy databases and ERP systems?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, absolutely. Modern AI integration services connect custom AI systems to legacy databases (like SQL Server, SAP, or Oracle) using secure middleware and RESTful APIs. This allows the AI tool to read, query, and structure legacy database content without needing a complete system rewrite."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do we prevent Generative AI from generating inappropriate or incorrect answers?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "To control AI outputs, developers implement software guardrail layers (such as NeMo Guardrails or Llama Guard), set low temperature variables in API calls to reduce creativity, write strict system prompts, and use human-in-the-loop validation for critical actions like payments or external communications."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is it better to use open-source AI models or proprietary APIs?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "For fast setup, low maintenance, and high reasoning tasks, proprietary APIs (like Google Gemini or OpenAI) are recommended. For strict data privacy requirements, complete offline operation, or specialized industry tasks, fine-tuning and hosting open-source models (like Llama 3) in your private cloud is the superior path."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does AI integration impact custom web development and SEO?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Integrating AI tools into websites enables smart search engines, dynamic layouts, and data translation. To remain visible on AI-driven search engines (like Google Overviews or Perplexity), websites must be technical, fast, schema-optimized, and write high-quality structured content—a practice known as Answer Engine Optimization (AEO)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How can Sanmora help our business adopt Generative AI?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Sanmora provides end-to-end digital solutions, specializing in custom AI software development, AI integration, UI/UX design, and database automation. We help businesses audit their processes, select the right AI architectures, build secure RAG frameworks, and deliver lightning-fast Next.js frontends connected to intelligent backend systems."
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
                "headline": "How Businesses Can Build Smarter Software With Generative AI",
                "image": "https://sanmora.in/images/smarter_software_generative_ai.png",
                "author": {
                  "@type": "Organization",
                  "name": "Sanmora Team",
                  "url": "https://sanmora.in"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Sanmora",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://sanmora.in/logo/sanmora-logo.png"
                  }
                },
                "datePublished": "2026-07-04",
                "description": "Discover how businesses can leverage Generative AI to build smarter, highly responsive software. Explore key benefits, real-world industry use cases, and implementation strategies for AI integration."
              })
            }}
          />
        </>
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
                  "name": "Sanmora",
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
      {/* Main content body */}
      <section className={styles.contentSection}>
        <div className={styles.articleContainer}>

          <div className={styles.articleLayoutGrid}>
            {/* Left Column: Table of Contents */}
            <aside className={styles.tocSidebar}>
              <div className={styles.tocSticky}>
                <h4 className={styles.tocTitle}>Table of Contents</h4>
                <nav className={styles.tocNav}>
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`${styles.tocLink} ${activeId === heading.id ? styles.tocLinkActive : ""}`}
                      onClick={(e) => handleScrollTo(e, heading.id)}
                      style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Center Column: Article Main Content */}
            <div className={styles.articleMainBody}>
              {/* Breadcrumbs */}
              <div className={styles.breadcrumb}>
                <Link href="/" className={styles.breadcrumbLink}>Home</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>{post.title}</span>
              </div>

              <span className={styles.category}>{post.category}</span>
              <h1 className={styles.headline}>{post.title}</h1>

              {/* Author Block */}
              <div className={styles.authorBlock}>
                <div className={styles.authorAvatar}>
                  <span>S</span>
                </div>
                <div className={styles.authorInfo}>
                  <h5 className={styles.authorName}>Sanmora Team</h5>
                  <p className={styles.authorMeta}>
                    Published in {post.category} • {post.date} • {post.readTime}
                  </p>
                </div>
              </div>

              {/* Featured Cover Image */}
              <div className={styles.imageWrapper}>
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.featuredImage}
                />
              </div>

              {/* Combined Article Body */}
              <div className={styles.richParagraphs}>
                {renderContent(cleanContent)}
              </div>

              {post.redditLink && (
                <div className={styles.redditDiscussionBox}>
                  <div className={styles.redditIconContainer}>
                    <svg viewBox="0 0 24 24" className={styles.redditLargeIcon} fill="currentColor">
                      <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.29-1.72l1.25-3.91 3.43.77c.04.9.78 1.63 1.7 1.63 1.1 0 2-1 2-2s-.9-2-2-2c-.73 0-1.37.4-1.72 1L14.7 3.5c-.15-.04-.32.02-.39.17l-1.48 4.62c-2.58.05-4.9.7-6.59 1.72-.56-.76-1.46-1.24-2.42-1.24-1.65 0-3 1.35-3 3 0 1.05.54 1.97 1.37 2.53-.08.4-.13.82-.13 1.24 0 4.14 4.93 7.5 11 7.5s11-3.36 11-7.5c0-.42-.05-.84-.13-1.24.83-.56 1.37-1.48 1.37-2.53zM5 13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm13 5c-1.8 1.8-5.2 1.8-7 0-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 1.4 1.4 4.2 1.4 5.6 0 .2-.2.5-.2.7 0 .2.2.2.5 0 .7zm-1-3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                    </svg>
                  </div>
                  <div className={styles.redditDiscussionContent}>
                    <h4>Discuss on Reddit</h4>
                    <p>Have thoughts or questions about this article? Join the discussion in our official Reddit community thread.</p>
                    <a
                      href={post.redditLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.redditDiscussBtn}
                    >
                      Open Reddit Thread
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Related Blogs & Share Block */}
            <aside className={styles.sidebarRight}>
              <div className={styles.sidebarRightSticky}>
                {relatedPosts.length > 0 && (
                  <div className={styles.relatedSection}>
                    <h4 className={styles.sidebarSectionTitle}>Related Blogs</h4>
                    <div className={styles.relatedGrid}>
                      {relatedPosts.map((relatedPost) => (
                        <Link 
                          key={relatedPost.id} 
                          href={`/blog/${relatedPost.id}`}
                          className={styles.relatedCard}
                        >
                          <h5 className={styles.relatedCardTitle}>{relatedPost.title}</h5>
                          <div className={styles.relatedCardAuthor}>
                            <div className={styles.relatedCardAvatar}>
                              <span>S</span>
                            </div>
                            <div className={styles.relatedCardAuthorInfo}>
                              <span className={styles.relatedCardAuthorName}>Sanmora Team</span>
                              <span className={styles.relatedCardMeta}>{relatedPost.date} • {relatedPost.readTime}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.shareBlock}>
                  <h4 className={styles.sidebarSectionTitle}>Share This Blog:</h4>
                  <div className={styles.shareIconsList}>
                    <a 
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " - " + shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareIconBtn}
                      title="Share on WhatsApp"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.978L2 22l5.197-1.363a9.93 9.93 0 0 0 4.814 1.233h.004c5.505 0 9.99-4.478 9.991-9.985A9.97 9.97 0 0 0 12.012 2zm5.735 14.33c-.252.712-1.263 1.294-1.748 1.385-.435.082-.99.124-2.87-.613-2.404-.94-3.923-3.376-4.043-3.536-.12-.16-1.026-1.363-1.026-2.599 0-1.236.65-1.843.88-2.083.23-.24.5-.3.67-.3.17 0 .34.002.486.008.156.006.366-.06.574.44.214.515.733 1.787.796 1.917.063.13.104.28.02.45-.084.17-.126.28-.252.43-.126.15-.265.33-.378.45-.126.13-.258.27-.11.53.148.25.656 1.077 1.41 1.748.97.866 1.79 1.134 2.046 1.264.256.13.404.11.554-.06.15-.17.65-.758.82-.98.17-.22.34-.18.574-.1.236.09 1.497.7.175.76.06.13.1.222.062.436l-.01.002z"/>
                      </svg>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareIconBtn}
                      title="Share on LinkedIn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareIconBtn}
                      title="Share on Facebook"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                      </svg>
                    </a>
                    <button 
                      onClick={handleCopyLink}
                      className={styles.shareIconBtn}
                      title="Copy Article Link"
                    >
                      {copied ? (
                        <span>✓</span>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>

        </div>
      </section>
    </div>
  );
}
