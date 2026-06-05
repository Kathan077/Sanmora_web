import React from "react";

// Customized high-quality responsive vector SVG icons using premium colorful gradients
export default function IconRenderer({ icon, className }) {
  switch (icon) {
    case "brain":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradBrain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="url(#gradBrain)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 6v12M8 8h8M7 12h10M9 16h6" stroke="url(#gradBrain)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "neural":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradNeural" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="5" r="3" stroke="url(#gradNeural)" strokeWidth="2" />
          <circle cx="5" cy="18" r="3" stroke="url(#gradNeural)" strokeWidth="2" />
          <circle cx="19" cy="18" r="3" stroke="url(#gradNeural)" strokeWidth="2" />
          <path d="M10 7.5L6.5 15.5M14 7.5l3.5 8M8 18h8" stroke="url(#gradNeural)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "chat":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradChat" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="url(#gradChat)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "eye":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradEye" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="url(#gradEye)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" stroke="url(#gradEye)" strokeWidth="2" />
        </svg>
      );
    case "microchip":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradMicro" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="url(#gradMicro)" strokeWidth="2" />
          <path d="M9 9h6v6H9V9z" stroke="url(#gradMicro)" strokeWidth="2" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" stroke="url(#gradMicro)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "line-chart":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradChart" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path d="M3 3v18h18" stroke="url(#gradChart)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="url(#gradChart)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "database":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradDb" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <ellipse cx="12" cy="5" rx="9" ry="3" stroke="url(#gradDb)" strokeWidth="2" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="url(#gradDb)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" stroke="url(#gradDb)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "cloud-server":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradCloud" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="8" rx="2" stroke="url(#gradCloud)" strokeWidth="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" stroke="url(#gradCloud)" strokeWidth="2" />
          <path d="M6 6h2M6 18h2M18 6h.01M18 18h.01" stroke="url(#gradCloud)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "lightning":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="url(#gradLight)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradShield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#gradShield)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "helmet":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradHelm" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="9" stroke="url(#gradHelm)" strokeWidth="2" />
          <path d="M12 3v18M3 12h18M12 12l6.36-6.36M12 12L5.64 18.36" stroke="url(#gradHelm)" strokeWidth="2" />
        </svg>
      );
    case "infinite":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradInf" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <path d="M22 12c0 3-2.5 5.5-5.5 5.5S11 14.5 11 12s-2.5-5.5-5.5-5.5S0 9 0 12s2.5 5.5 5.5 5.5S11 14.5 11 12s2.5-5.5 5.5-5.5S22 9 22 12z" stroke="url(#gradInf)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "code":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradCode" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <path d="M16 18l6-6-6-6M8 6L2 12l6 6M14 4l-4 16" stroke="url(#gradCode)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "vault":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradVault" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="url(#gradVault)" strokeWidth="2" />
          <circle cx="12" cy="12" r="5" stroke="url(#gradVault)" strokeWidth="2" />
          <path d="M12 9v6M9 12h6" stroke="url(#gradVault)" strokeWidth="2" />
        </svg>
      );
    case "gauge":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradGauge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <path d="M12 2a10 10 0 00-10 10c0 4.14 2.5 7.72 6.13 9.22" stroke="url(#gradGauge)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 6a6 6 0 00-6 6c0 2.48 1.5 4.63 3.68 5.53" stroke="url(#gradGauge)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12l4-4" stroke="url(#gradGauge)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "cube":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradCube" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="url(#gradCube)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="url(#gradCube)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "smart-server":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradSvr" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <rect x="2" y="3" width="20" height="6" rx="2" stroke="url(#gradSvr)" strokeWidth="2" />
          <rect x="2" y="15" width="20" height="6" rx="2" stroke="url(#gradSvr)" strokeWidth="2" />
          <circle cx="6" cy="6" r="1" fill="#ec4899" />
          <circle cx="6" cy="18" r="1" fill="#a855f7" />
          <path d="M12 9v6M9 12h6" stroke="url(#gradSvr)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "phone":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradPhone" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <rect x="5" y="2" width="14" height="20" rx="3" stroke="url(#gradPhone)" strokeWidth="2" />
          <circle cx="12" cy="18" r="1.5" stroke="url(#gradPhone)" strokeWidth="2" />
          <path d="M9 6h6" stroke="url(#gradPhone)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "globe":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradGlobe" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" stroke="url(#gradGlobe)" strokeWidth="2" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="url(#gradGlobe)" strokeWidth="2" />
        </svg>
      );
    case "factory":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradFact" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path d="M2 21h20M3 21V9l5 3V9l5 3V9l7-4v16H3z" stroke="url(#gradFact)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "smartwatch":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradWatch" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <rect x="6" y="6" width="12" height="12" rx="3" stroke="url(#gradWatch)" strokeWidth="2" />
          <path d="M9 6V2h6v4M9 18v4h6v-4" stroke="url(#gradWatch)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" stroke="url(#gradWatch)" strokeWidth="2" />
        </svg>
      );
    case "shopping-cart":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradCart" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <circle cx="9" cy="21" r="1" stroke="url(#gradCart)" strokeWidth="2" />
          <circle cx="20" cy="21" r="1" stroke="url(#gradCart)" strokeWidth="2" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="url(#gradCart)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "layout":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradLayout" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="url(#gradLayout)" strokeWidth="2" />
          <path d="M3 9h18M9 21V9" stroke="url(#gradLayout)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "search":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradSearch" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle cx="11" cy="11" r="8" stroke="url(#gradSearch)" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="url(#gradSearch)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "share-2":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradShare" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <circle cx="18" cy="5" r="3" stroke="url(#gradShare)" strokeWidth="2" />
          <circle cx="6" cy="12" r="3" stroke="url(#gradShare)" strokeWidth="2" />
          <circle cx="18" cy="19" r="3" stroke="url(#gradShare)" strokeWidth="2" />
          <path d="M8.59 13.51l5.83 3.4M14.41 7.1l-5.82 3.4" stroke="url(#gradShare)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "activity":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradActivity" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="url(#gradActivity)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "image":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradImage" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="url(#gradImage)" strokeWidth="2" />
          <circle cx="8.5" cy="8.5" r="1.5" stroke="url(#gradImage)" strokeWidth="2" />
          <path d="M21 15l-5-5L5 21" stroke="url(#gradImage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "layers":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradLayers" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="url(#gradLayers)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "briefcase":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradBrief" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#84cc16" />
            </linearGradient>
          </defs>
          <rect x="2" y="7" width="20" height="14" rx="2" stroke="url(#gradBrief)" strokeWidth="2" />
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke="url(#gradBrief)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "edit-3":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradEdit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="url(#gradEdit)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "link":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradLink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="url(#gradLink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="url(#gradLink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "cpu":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradCpu" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="url(#gradCpu)" strokeWidth="2" />
          <path d="M9 9h6v6H9V9z" stroke="url(#gradCpu)" strokeWidth="2" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" stroke="url(#gradCpu)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "smartphone":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradSmart" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <rect x="5" y="2" width="14" height="20" rx="2" stroke="url(#gradSmart)" strokeWidth="2" />
          <path d="M12 18h.01" stroke="url(#gradSmart)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "tablet":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradTab" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <rect x="4" y="2" width="16" height="20" rx="2" stroke="url(#gradTab)" strokeWidth="2" />
          <path d="M12 18h.01" stroke="url(#gradTab)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "play":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradPlay" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <path d="M5 3l14 9-14 9V3z" stroke="url(#gradPlay)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "watch":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradWatchComp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="7" stroke="url(#gradWatchComp)" strokeWidth="2" />
          <path d="M12 9v3l2 2" stroke="url(#gradWatchComp)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 5V2H8v3M16 19v3H8v-3" stroke="url(#gradWatchComp)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pen-tool":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradPen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="url(#gradPen)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="url(#gradPen)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 2l7.586 7.586" stroke="url(#gradPen)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11" cy="11" r="2" stroke="url(#gradPen)" strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
}
