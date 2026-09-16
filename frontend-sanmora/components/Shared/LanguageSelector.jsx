"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./LanguageSelector.module.css";

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

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(ALL_LANGUAGES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dropdownRef = useRef(null);

  // Load Google Translate script safely
  useEffect(() => {
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

    // Read stored language or cookie
    const cookies = document.cookie.split(";");
    const googtransCookie = cookies.find((c) => c.trim().startsWith("googtrans="));
    if (googtransCookie) {
      const langCode = googtransCookie.split("=")[1]?.split("/").pop();
      if (langCode) {
        const found = ALL_LANGUAGES.find((l) => l.code.toLowerCase() === langCode.toLowerCase());
        if (found) setActiveLang(found);
      }
    } else {
      const stored = localStorage.getItem("sanmora_user_lang");
      if (stored) {
        const found = ALL_LANGUAGES.find((l) => l.code === stored);
        if (found) setActiveLang(found);
      }
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (langObj) => {
    setActiveLang(langObj);
    localStorage.setItem("sanmora_user_lang", langObj.code);
    setIsOpen(false);

    // Set Google Translate Cookie
    const cookieDomain = window.location.hostname;
    document.cookie = `googtrans=/en/${langObj.code}; path=/; domain=${cookieDomain}`;
    document.cookie = `googtrans=/en/${langObj.code}; path=/;`;

    // Attempt to change native Google select box if initialized
    const googleCombo = document.querySelector(".goog-te-combo");
    if (googleCombo) {
      googleCombo.value = langObj.code;
      googleCombo.dispatchEvent(new Event("change"));
    } else {
      // Reload page to apply translation cookie seamlessly
      window.location.reload();
    }
  };

  const filteredLanguages = ALL_LANGUAGES.filter((lang) => {
    const matchesSearch =
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === "india") {
      return INDIA_LANGUAGES.some((l) => l.code === lang.code);
    }
    if (selectedCategory === "sa") {
      return SOUTH_AFRICA_LANGUAGES.some((l) => l.code === lang.code);
    }
    if (selectedCategory === "global") {
      return GLOBAL_LANGUAGES.some((l) => l.code === lang.code);
    }

    return true;
  });

  return (
    <div className={styles.langSelectorWrapper} ref={dropdownRef}>
      {/* Hidden Google Translate container */}
      <div id="google_translate_element" className={styles.hiddenGoogleWidget} />

      {/* Selector Trigger Button */}
      <button
        type="button"
        className={`${styles.triggerBtn} ${isOpen ? styles.triggerBtnActive : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Select Language"
      >
        <span className={styles.globeIcon}>🌐</span>
        <span className={styles.flagIcon}>{activeLang.flag}</span>
        <span className={styles.langCode}>{activeLang.code.toUpperCase()}</span>
        <svg
          className={`${styles.chevronIcon} ${isOpen ? styles.chevronOpen : ""}`}
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

      {/* Dropdown Modal */}
      {isOpen && (
        <div className={styles.dropdownModal}>
          <div className={styles.dropdownHeader}>
            <div className={styles.headerTitleRow}>
              <span className={styles.headerTitle}>Select Language</span>
              <span className={styles.badgeGlobal}>Worldwide 🌐</span>
            </div>

            {/* Category Filter Chips */}
            <div className={styles.categoryChips}>
              <button
                className={`${styles.chip} ${selectedCategory === "all" ? styles.chipActive : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </button>
              <button
                className={`${styles.chip} ${selectedCategory === "india" ? styles.chipActive : ""}`}
                onClick={() => setSelectedCategory("india")}
              >
                🇮🇳 India
              </button>
              <button
                className={`${styles.chip} ${selectedCategory === "sa" ? styles.chipActive : ""}`}
                onClick={() => setSelectedCategory("sa")}
              >
                🇿🇦 South Africa
              </button>
              <button
                className={`${styles.chip} ${selectedCategory === "global" ? styles.chipActive : ""}`}
                onClick={() => setSelectedCategory("global")}
              >
                🌍 Global
              </button>
            </div>

            {/* Search Input */}
            <div className={styles.searchWrapper}>
              <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search language (e.g. Hindi, Zulu, Gujarati)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button className={styles.clearSearch} onClick={() => setSearchQuery("")}>
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Access Featured Banners */}
          {!searchQuery && selectedCategory === "all" && (
            <div className={styles.featuredSection}>
              <div className={styles.sectionLabel}>
                <span>Popular Regional Hubs</span>
              </div>
              <div className={styles.hubGrid}>
                <div className={styles.hubCard} onClick={() => setSelectedCategory("india")}>
                  <span className={styles.hubFlag}>🇮🇳</span>
                  <div>
                    <strong>India (भारत)</strong>
                    <p>Hindi, Gujarati, Tamil & 8 more</p>
                  </div>
                </div>
                <div className={styles.hubCard} onClick={() => setSelectedCategory("sa")}>
                  <span className={styles.hubFlag}>🇿🇦</span>
                  <div>
                    <strong>South Africa</strong>
                    <p>Afrikaans, Zulu, Xhosa & 3 more</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Languages Scrollable List */}
          <div className={styles.languagesList}>
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = activeLang.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    className={`${styles.langItem} ${isSelected ? styles.langItemActive : ""}`}
                    onClick={() => changeLanguage(lang)}
                  >
                    <span className={styles.itemFlag}>{lang.flag}</span>
                    <div className={styles.itemNames}>
                      <span className={styles.itemName}>{lang.name}</span>
                      <span className={styles.itemNative}>{lang.native}</span>
                    </div>
                    {isSelected && (
                      <span className={styles.checkIcon}>✓</span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className={styles.noResults}>No languages found matching &quot;{searchQuery}&quot;</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
