"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./AccessibilityLanguageWidget.module.css";

const INDIA_LANGUAGES = [
  { code: "en", name: "English", native: "English", flag: "🇮🇳" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", native: "मराठी", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", native: "বাংলা", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", native: "മലയാളം", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", native: "اردو", flag: "🇮🇳" },
];

const SOUTH_AFRICA_LANGUAGES = [
  { code: "af", name: "Afrikaans", native: "Afrikaans", flag: "🇿🇦" },
  { code: "zu", name: "Zulu", native: "isiZulu", flag: "🇿🇦" },
  { code: "xh", name: "Xhosa", native: "isiXhosa", flag: "🇿🇦" },
  { code: "st", name: "Sotho", native: "Sesotho", flag: "🇿🇦" },
  { code: "tn", name: "Tswana", native: "Setswana", flag: "🇿🇦" },
];

const GLOBAL_LANGUAGES = [
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "zh-CN", name: "Chinese (Simplified)", native: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇦🇪" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹" },
  { code: "nl", name: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "tr", name: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  { code: "pl", name: "Polish", native: "Polski", flag: "🇵🇱" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "Thai", native: "ไทย", flag: "🇹🇭" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "fa", name: "Persian", native: "فارسی", flag: "🇮🇷" },
  { code: "sv", name: "Swedish", native: "Svenska", flag: "🇸🇪" },
  { code: "el", name: "Greek", native: "Ελληνικά", flag: "🇬🇷" },
  { code: "he", name: "Hebrew", native: "עברית", flag: "🇮🇱" },
];

const ALL_LANGUAGES = [
  ...INDIA_LANGUAGES,
  ...SOUTH_AFRICA_LANGUAGES,
  ...GLOBAL_LANGUAGES,
].filter((v, i, a) => a.findIndex((t) => t.code === v.code) === i);

export default function AccessibilityLanguageWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontScale, setFontScale] = useState(100);
  const [isReduceMotion, setIsReduceMotion] = useState(false);
  const [activeLang, setActiveLang] = useState(ALL_LANGUAGES[0]);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const widgetRef = useRef(null);

  // Initialize accessibility settings & Google Translate script
  useEffect(() => {
    // 1. Restore font scale
    const savedScale = localStorage.getItem("sanmora_font_scale");
    if (savedScale) {
      const scaleNum = parseInt(savedScale, 10);
      setFontScale(scaleNum);
      document.documentElement.style.fontSize = `${scaleNum}%`;
    }

    // 2. Restore motion preference
    const savedMotion = localStorage.getItem("sanmora_reduce_motion");
    if (savedMotion === "true") {
      setIsReduceMotion(true);
      document.body.classList.add("reduce-motion");
    }

    // 3. Load Google Translate script safely
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return;

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              autoDisplay: false,
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        }
      };
    };

    addGoogleTranslateScript();

    // 4. Restore active language from cookies
    const cookies = document.cookie.split(";");
    const googtransCookie = cookies.find((c) => c.trim().startsWith("googtrans="));
    if (googtransCookie) {
      const langCode = googtransCookie.split("=")[1]?.split("/").pop();
      if (langCode) {
        const found = ALL_LANGUAGES.find((l) => l.code.toLowerCase() === langCode.toLowerCase());
        if (found) setActiveLang(found);
      }
    }
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Font Scaling Controls
  const handleIncreaseFont = () => {
    setFontScale((prev) => {
      const next = Math.min(prev + 10, 130);
      document.documentElement.style.fontSize = `${next}%`;
      localStorage.setItem("sanmora_font_scale", next.toString());
      return next;
    });
  };

  const handleDecreaseFont = () => {
    setFontScale((prev) => {
      const next = Math.max(prev - 10, 85);
      document.documentElement.style.fontSize = `${next}%`;
      localStorage.setItem("sanmora_font_scale", next.toString());
      return next;
    });
  };

  const handleResetFont = () => {
    setFontScale(100);
    document.documentElement.style.fontSize = "100%";
    localStorage.setItem("sanmora_font_scale", "100");
  };

  // Reduce Motion Control
  const handleToggleReduceMotion = () => {
    setIsReduceMotion((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add("reduce-motion");
      } else {
        document.body.classList.remove("reduce-motion");
      }
      localStorage.setItem("sanmora_reduce_motion", next.toString());
      return next;
    });
  };

  // Language Change Function
  const changeLanguage = (langObj) => {
    setActiveLang(langObj);
    setIsLangDropdownOpen(false);

    const cookieDomain = window.location.hostname;
    document.cookie = `googtrans=/en/${langObj.code}; path=/; domain=${cookieDomain}`;
    document.cookie = `googtrans=/en/${langObj.code}; path=/;`;

    const googleCombo = document.querySelector(".goog-te-combo");
    if (googleCombo) {
      googleCombo.value = langObj.code;
      googleCombo.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  const filteredLanguages = ALL_LANGUAGES.filter((lang) => {
    const matchesSearch =
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedRegion === "india") return INDIA_LANGUAGES.some((l) => l.code === lang.code);
    if (selectedRegion === "sa") return SOUTH_AFRICA_LANGUAGES.some((l) => l.code === lang.code);
    if (selectedRegion === "global") return GLOBAL_LANGUAGES.some((l) => l.code === lang.code);

    return true;
  });

  return (
    <div className={styles.widgetContainer} ref={widgetRef}>
      {/* Hidden Google Translate Target */}
      <div id="google_translate_element" className={styles.hiddenWidget} />

      {/* Main Trigger Button in Navbar */}
      <button
        type="button"
        className={`${styles.navbarTriggerBtn} ${isOpen ? styles.triggerActive : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Accessibility & Language Settings"
      >
        <span className={styles.triggerIcons}>
          <span className={styles.iconGlobe}>🌐</span>
        </span>
        <span className={styles.triggerText}>{activeLang.code.toUpperCase()}</span>
        <svg
          className={`${styles.triggerChevron} ${isOpen ? styles.chevronOpen : ""}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {/* Pro-Level Floating Card Panel */}
      {isOpen && (
        <div className={styles.floatingPanel}>
          {/* Panel Header */}
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Accessibility</h3>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>

          {/* Accessibility Options List (Exact structure matching user screenshot) */}
          <div className={styles.accessibilityGrid}>
            {/* Increase Font */}
            <button
              type="button"
              className={`${styles.actionCardBtn} ${fontScale > 100 ? styles.activeStateBtn : ""}`}
              onClick={handleIncreaseFont}
            >
              <span className={styles.btnSymbol}>+</span>
              <span className={styles.btnLabel}>Increase font size</span>
              {fontScale > 100 && <span className={styles.scaleBadge}>{fontScale}%</span>}
            </button>

            {/* Decrease Font */}
            <button
              type="button"
              className={`${styles.actionCardBtn} ${fontScale < 100 ? styles.activeStateBtn : ""}`}
              onClick={handleDecreaseFont}
            >
              <span className={styles.btnSymbol}>−</span>
              <span className={styles.btnLabel}>Decrease font size</span>
              {fontScale < 100 && <span className={styles.scaleBadge}>{fontScale}%</span>}
            </button>

            {/* Reset Font */}
            <button
              type="button"
              className={styles.actionCardBtn}
              onClick={handleResetFont}
            >
              <svg className={styles.btnIconSvg} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67"/>
              </svg>
              <span className={styles.btnLabel}>Reset font size</span>
            </button>

            {/* Reduce Motion */}
            <button
              type="button"
              className={`${styles.actionCardBtn} ${isReduceMotion ? styles.activeStateBtn : ""}`}
              onClick={handleToggleReduceMotion}
            >
              <svg className={styles.btnIconSvg} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <span className={styles.btnLabel}>Reduce motion</span>
              {isReduceMotion && <span className={styles.statusIndicator}>ON</span>}
            </button>
          </div>

          {/* Language Selector Section */}
          <div className={styles.languageSection}>
            <h4 className={styles.sectionHeading}>Language</h4>

            <div className={styles.selectDropdownContainer}>
              <button
                type="button"
                className={styles.selectTrigger}
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              >
                <span className={styles.selectedLangInfo}>
                  <span className={styles.selectedFlag}>{activeLang.flag}</span>
                  <span className={styles.selectedName}>{activeLang.name}</span>
                  <span className={styles.selectedNative}>({activeLang.native})</span>
                </span>
                <svg
                  className={`${styles.dropdownChevron} ${isLangDropdownOpen ? styles.chevronOpen : ""}`}
                  width="12"
                  height="8"
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>

              {/* Collapsible Language Popup List */}
              {isLangDropdownOpen && (
                <div className={styles.langListModal}>
                  {/* Region Filter Tabs */}
                  <div className={styles.regionTabs}>
                    <button
                      type="button"
                      className={`${styles.regionTab} ${selectedRegion === "all" ? styles.tabActive : ""}`}
                      onClick={() => setSelectedRegion("all")}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      className={`${styles.regionTab} ${selectedRegion === "india" ? styles.tabActive : ""}`}
                      onClick={() => setSelectedRegion("india")}
                    >
                      🇮🇳 India
                    </button>
                    <button
                      type="button"
                      className={`${styles.regionTab} ${selectedRegion === "sa" ? styles.tabActive : ""}`}
                      onClick={() => setSelectedRegion("sa")}
                    >
                      🇿🇦 South Africa
                    </button>
                    <button
                      type="button"
                      className={`${styles.regionTab} ${selectedRegion === "global" ? styles.tabActive : ""}`}
                      onClick={() => setSelectedRegion("global")}
                    >
                      🌍 Global
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className={styles.searchBox}>
                    <input
                      type="text"
                      className={styles.searchInput}
                      placeholder="Search language..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Language Options */}
                  <div className={styles.langScrollList}>
                    {filteredLanguages.map((lang) => {
                      const isSelected = activeLang.code === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          className={`${styles.langOption} ${isSelected ? styles.optionActive : ""}`}
                          onClick={() => changeLanguage(lang)}
                        >
                          <span className={styles.optionFlag}>{lang.flag}</span>
                          <span className={styles.optionName}>{lang.name}</span>
                          <span className={styles.optionNative}>({lang.native})</span>
                          {isSelected && <span className={styles.optionCheck}>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
