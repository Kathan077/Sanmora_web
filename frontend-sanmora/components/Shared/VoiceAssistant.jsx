"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  Settings,
  HelpCircle,
  X,
  Mic,
  Check,
  Eye,
  Sliders,
  Bell,
  Play,
  Pause,
  Square,
  Search,
  Globe
} from "lucide-react";
import styles from "./VoiceAssistant.module.css";

const INDIA_LANGUAGES = [
  { code: "en", name: "English (India)", native: "English", flag: "🇮🇳" },
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
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "as", name: "Assamese", native: "অসমীয়া", flag: "🇮🇳" },
  { code: "sa", name: "Sanskrit", native: "संस्कृतम्", flag: "🇮🇳" },
  { code: "mai", name: "Maithili", native: "मैथिली", flag: "🇮🇳" },
];

const SOUTH_AFRICA_LANGUAGES = [
  { code: "af", name: "Afrikaans", native: "Afrikaans", flag: "🇿🇦" },
  { code: "zu", name: "Zulu", native: "isiZulu", flag: "🇿🇦" },
  { code: "xh", name: "Xhosa", native: "isiXhosa", flag: "🇿🇦" },
  { code: "st", name: "Sotho", native: "Sesotho", flag: "🇿🇦" },
  { code: "tn", name: "Tswana", native: "Setswana", flag: "🇿🇦" },
  { code: "nso", name: "Sepedi", native: "Sepedi", flag: "🇿🇦" },
  { code: "ts", name: "Tsonga", native: "Xitsonga", flag: "🇿🇦" },
  { code: "ss", name: "Swati", native: "siSwati", flag: "🇿🇦" },
  { code: "ve", name: "Venda", native: "Tshivenda", flag: "🇿🇦" },
  { code: "nr", name: "Ndebele", native: "isiNdebele", flag: "🇿🇦" },
];

const GLOBAL_LANGUAGES = [
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "zh-CN", name: "Chinese", native: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇦🇪" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹" },
  { code: "nl", name: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
];

const ALL_TRANSLATION_LANGUAGES = [
  ...INDIA_LANGUAGES,
  ...SOUTH_AFRICA_LANGUAGES,
  ...GLOBAL_LANGUAGES,
].filter((v, i, a) => a.findIndex((t) => t.code === v.code) === i);

// Helper to get standard BCP-47 tag forSpeech Synthesis (e.g. hi -> hi-IN, zu -> zu-ZA)
const getFullBCP47LangTag = (code) => {
  if (!code) return "en-US";
  const cleanCode = code.split("-")[0].toLowerCase();
  const map = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
    mr: "mr-IN",
    ta: "ta-IN",
    te: "te-IN",
    bn: "bn-IN",
    kn: "kn-IN",
    ml: "ml-IN",
    pa: "pa-IN",
    ur: "ur-IN",
    or: "or-IN",
    as: "as-IN",
    sa: "sa-IN",
    mai: "hi-IN",
    af: "af-ZA",
    zu: "zu-ZA",
    xh: "xh-ZA",
    st: "st-ZA",
    tn: "tn-ZA",
    nso: "nso-ZA",
    ts: "ts-ZA",
    ss: "ss-ZA",
    ve: "ve-ZA",
    nr: "nr-ZA",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    zh: "zh-CN",
    ja: "ja-JP",
    ar: "ar-SA",
    pt: "pt-BR",
    ru: "ru-RU",
    it: "it-IT",
    nl: "nl-NL",
    ko: "ko-KR",
  };
  return map[cleanCode] || code;
};

export default function VoiceAssistant() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState("");
  const [selectedLang, setSelectedLang] = useState(INDIA_LANGUAGES[0]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [voiceSearchQuery, setVoiceSearchQuery] = useState("");
  const [soundEffects, setSoundEffects] = useState(true);
  const [currentlySpeaking, setCurrentlySpeaking] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  // Full-page reading states
  const [isReadingFullPage, setIsReadingFullPage] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [totalBlocks, setTotalBlocks] = useState(0);

  const activeElementRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const synthRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  const speechBlocksRef = useRef([]);
  const activeBlockIndexRef = useRef(0);
  const isFullPageCancelledRef = useRef(false);

  // Initialize Speech Synthesis & Voices & Google Translate
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load Google Translate script safely if not present
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

      // Restore active language preference
      const cookies = document.cookie.split(";");
      const googtransCookie = cookies.find((c) => c.trim().startsWith("googtrans="));
      let langCode = null;
      if (googtransCookie) {
        langCode = googtransCookie.split("=")[1]?.split("/").pop();
      } else {
        langCode = localStorage.getItem("sanmora_user_lang");
      }
      if (langCode) {
        const found = ALL_TRANSLATION_LANGUAGES.find(
          (l) => l.code.toLowerCase() === langCode.toLowerCase()
        );
        if (found) setSelectedLang(found);
      }

      // Initialize Speech Synthesis
      if ("speechSynthesis" in window) {
        synthRef.current = window.speechSynthesis;

        const updateVoices = () => {
          const available = synthRef.current.getVoices();
          setVoices(available);
          const defaultVoice =
            available.find(
              (v) => v.lang.includes("en-US") || v.lang.includes("en-GB") || v.lang.includes("en")
            ) || available[0];
          if (defaultVoice && !selectedVoiceURI) {
            setSelectedVoiceURI(defaultVoice.voiceURI);
          }
        };

        updateVoices();
        if (synthRef.current.onvoiceschanged !== undefined) {
          synthRef.current.onvoiceschanged = updateVoices;
        }
      }
    }
  }, [selectedVoiceURI]);

  // Web Audio Synthesizer for Audio Feedback Chimes
  const playAudioChime = useCallback(
    (type) => {
      if (!soundEffects || typeof window === "undefined") return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === "on") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
        } else if (type === "off") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
        } else if (type === "click") {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(587.33, now);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
        } else if (type === "finish") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.setValueAtTime(659.25, now + 0.1);
          osc.frequency.setValueAtTime(783.99, now + 0.2);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
        }
      } catch (err) {
        // Silent fallback
      }
    },
    [soundEffects]
  );

  // Helper to remove visual highlight from previous element
  const clearHighlight = useCallback(() => {
    if (activeElementRef.current) {
      activeElementRef.current.classList.remove("voice-active-element");
      activeElementRef.current.classList.remove("tts-active-reading-chunk");
      activeElementRef.current = null;
    }
  }, []);

  // Helper to apply highlight to target element
  const applyHighlight = useCallback(
    (el) => {
      clearHighlight();
      if (el && el.classList) {
        el.classList.add("voice-active-element");
        activeElementRef.current = el;
      }
    },
    [clearHighlight]
  );

  // Collect all readable text blocks from full page
  const collectPageReadableBlocks = () => {
    const mainContainer = document.querySelector("main") || document.body;
    if (!mainContainer) return [];

    const rawElements = Array.from(
      mainContainer.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, blockquote, article")
    );

    const filtered = [];
    rawElements.forEach((el) => {
      if (
        el.closest(`.${styles.voiceWidgetContainer}`) ||
        el.closest(`.${styles.modalOverlay}`) ||
        el.closest("nav") ||
        el.closest("#google_translate_element") ||
        el.getAttribute("aria-hidden") === "true" ||
        el.offsetParent === null
      ) {
        return;
      }

      const text = (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ");
      if (text.length >= 3) {
        filtered.push({ element: el, text });
      }
    });

    return filtered;
  };

  // Translate text to target voice/language using Google Translate & MyMemory fallback
  const translateTextForVoice = async (text, targetLangCode = selectedLang?.code || "en") => {
    if (!text || typeof text !== "string" || !text.trim()) return "";
    const langCode = targetLangCode.split("-")[0].toLowerCase();
    if (langCode === "en") return text;

    // 1. Try Google Translate GTX endpoint
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${langCode}&dt=t&q=${encodeURIComponent(text)}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data[0] && Array.isArray(data[0])) {
          const translated = data[0].map((item) => (item && item[0] ? item[0] : "")).join("");
          if (translated && translated.trim()) return translated;
        }
      }
    } catch (err) {
      // ignore
    }

    // 2. Secondary fallback: MyMemory translation API
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 400))}&langpair=en|${langCode}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data.responseData && data.responseData.translatedText) {
          return data.responseData.translatedText;
        }
      }
    } catch (err) {
      // ignore
    }

    return text;
  };

  // Change active language and sync page Google Translate DOM
  const changeSelectedLanguage = (langObj) => {
    setSelectedLang(langObj);
    playAudioChime("click");
    if (typeof window !== "undefined") {
      localStorage.setItem("sanmora_user_lang", langObj.code);
    }

    const cookieDomain = window.location.hostname;
    document.cookie = `googtrans=/en/${langObj.code}; path=/; domain=${cookieDomain}`;
    document.cookie = `googtrans=/en/${langObj.code}; path=/;`;

    const googleCombo = document.querySelector(".goog-te-combo");
    if (googleCombo) {
      googleCombo.value = langObj.code;
      googleCombo.dispatchEvent(new Event("change"));
    }

    if (voices && voices.length > 0) {
      const code = langObj.code.toLowerCase().split("-")[0];
      const matchVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes(code) ||
          v.lang.toLowerCase().startsWith(code)
      );
      if (matchVoice) {
        setSelectedVoiceURI(matchVoice.voiceURI);
      }
    }
  };

  // Speak sequential block by index
  const speakBlockAtIndex = useCallback(
    async (index, currentRate = rate) => {
      if (isFullPageCancelledRef.current || !synthRef.current) return;

      const blocks = speechBlocksRef.current;
      if (!blocks || index >= blocks.length) {
        clearHighlight();
        setIsReadingFullPage(false);
        setIsPaused(false);
        setCurrentlySpeaking("");
        playAudioChime("finish");
        return;
      }

      const currentBlock = blocks[index];
      activeBlockIndexRef.current = index;
      setCurrentBlockIndex(index + 1);

      applyHighlight(currentBlock.element);
      try {
        currentBlock.element.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (e) {
        // ignore
      }

      let voiceObj = null;
      if (selectedVoiceURI && voices.length > 0) {
        voiceObj = voices.find((v) => v.voiceURI === selectedVoiceURI);
      }
      if (!voiceObj && voices.length > 0 && selectedLang?.code) {
        const code = selectedLang.code.toLowerCase().split("-")[0];
        voiceObj = voices.find(
          (v) =>
            v.lang.toLowerCase().includes(code) ||
            v.lang.toLowerCase().startsWith(code)
        );
      }

      // Translate text to target language (selected language or voice language)
      const rawText = currentBlock.element?.innerText || currentBlock.text;
      const targetLang = selectedLang?.code || voiceObj?.lang || "en";
      let textToSpeak = await translateTextForVoice(rawText, targetLang);

      if (isFullPageCancelledRef.current) return;

      setCurrentlySpeaking(textToSpeak);
      setLiveAnnouncement(textToSpeak);

      try {
        synthRef.current.cancel();
      } catch (e) {}

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = currentRate;
      utterance.pitch = pitch;

      if (voiceObj) {
        utterance.voice = voiceObj;
        utterance.lang = voiceObj.lang;
      } else {
        utterance.lang = getFullBCP47LangTag(targetLang);
      }

      utterance.onend = () => {
        if (!isFullPageCancelledRef.current) {
          speakBlockAtIndex(index + 1, currentRate);
        }
      };

      utterance.onerror = (e) => {
        if (!isFullPageCancelledRef.current && e.error !== "canceled" && e.error !== "interrupted") {
          speakBlockAtIndex(index + 1, currentRate);
        }
      };

      currentUtteranceRef.current = utterance;
      try {
        synthRef.current.speak(utterance);
      } catch (err) {
        // ignore
      }
    },
    [rate, pitch, selectedVoiceURI, selectedLang, voices, applyHighlight, clearHighlight, playAudioChime]
  );

  // Full page reading handlers
  const startFullPageRead = () => {
    if (!synthRef.current) return;

    if (isReadingFullPage && isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      return;
    }

    isFullPageCancelledRef.current = false;
    synthRef.current.cancel();

    const blocks = collectPageReadableBlocks();
    if (blocks.length === 0) return;

    speechBlocksRef.current = blocks;
    setTotalBlocks(blocks.length);
    setIsReadingFullPage(true);
    setIsPaused(false);
    playAudioChime("on");

    speakBlockAtIndex(0, rate);
  };

  const pauseFullPageRead = () => {
    if (synthRef.current && isReadingFullPage && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const stopFullPageRead = () => {
    isFullPageCancelledRef.current = true;
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    clearHighlight();
    setIsReadingFullPage(false);
    setIsPaused(false);
    setCurrentlySpeaking("");
    playAudioChime("off");
  };

  // Speak raw string text
  const speakText = useCallback(
    async (text, targetElement = null, onEndCallback = null) => {
      if (!synthRef.current || !text) return;

      try {
        synthRef.current.cancel();
      } catch (e) {
        // ignore
      }

      let voiceObj = null;
      if (selectedVoiceURI && voices.length > 0) {
        voiceObj = voices.find((v) => v.voiceURI === selectedVoiceURI);
      }
      if (!voiceObj && voices.length > 0 && selectedLang?.code) {
        const code = selectedLang.code.toLowerCase().split("-")[0];
        voiceObj = voices.find(
          (v) =>
            v.lang.toLowerCase().includes(code) ||
            v.lang.toLowerCase().startsWith(code)
        );
      }

      const rawText = targetElement?.innerText || text;
      const targetLang = selectedLang?.code || voiceObj?.lang || "en";
      let textToSpeak = await translateTextForVoice(rawText, targetLang);

      const cleanedText = textToSpeak.trim().replace(/\s+/g, " ");
      if (!cleanedText) return;

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = rate;
      utterance.pitch = pitch;

      if (voiceObj) {
        utterance.voice = voiceObj;
        utterance.lang = voiceObj.lang;
      } else {
        utterance.lang = getFullBCP47LangTag(targetLang);
      }

      setCurrentlySpeaking(cleanedText);
      setLiveAnnouncement(cleanedText);

      if (targetElement) {
        applyHighlight(targetElement);
      }

      utterance.onend = () => {
        setCurrentlySpeaking("");
        clearHighlight();
        currentUtteranceRef.current = null;
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = (e) => {
        setCurrentlySpeaking("");
        clearHighlight();
        currentUtteranceRef.current = null;
      };

      currentUtteranceRef.current = utterance;
      try {
        synthRef.current.speak(utterance);
      } catch (err) {
        setCurrentlySpeaking("");
        clearHighlight();
      }
    },
    [rate, pitch, selectedVoiceURI, selectedLang, voices, applyHighlight, clearHighlight]
  );

  // Filtered language list for search query and region filter
  const filteredLanguages = ALL_TRANSLATION_LANGUAGES.filter((lang) => {
    const matchesSearch =
      lang.name.toLowerCase().includes(voiceSearchQuery.toLowerCase()) ||
      lang.native.toLowerCase().includes(voiceSearchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(voiceSearchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedRegion === "india") return INDIA_LANGUAGES.some((l) => l.code === lang.code);
    if (selectedRegion === "sa") return SOUTH_AFRICA_LANGUAGES.some((l) => l.code === lang.code);
    if (selectedRegion === "global") return GLOBAL_LANGUAGES.some((l) => l.code === lang.code);

    return true;
  });

  // Stop all speech immediately
  const stopSpeech = useCallback(() => {
    isFullPageCancelledRef.current = true;
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setCurrentlySpeaking("");
    setIsReadingFullPage(false);
    setIsPaused(false);
    clearHighlight();
  }, [clearHighlight]);

  // Extract clean speakable text and description from DOM element
  const getSpeakableDetails = (el) => {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return null;

    if (
      el.closest(`.${styles.voiceWidgetContainer}`) ||
      el.closest(`.${styles.modalOverlay}`) ||
      el.getAttribute("aria-hidden") === "true" ||
      el.tagName === "SCRIPT" ||
      el.tagName === "STYLE" ||
      el.tagName === "NOSCRIPT"
    ) {
      return null;
    }

    let content = "";
    const tagName = el.tagName.toUpperCase();

    if (tagName === "A" || tagName === "BUTTON") {
      content = el.getAttribute("aria-label") || el.title || el.innerText || el.textContent;
    } else if (tagName === "IMG") {
      content = el.alt || el.getAttribute("aria-label") || el.title || "";
    } else if (tagName === "INPUT" || tagName === "TEXTAREA") {
      const label = el.labels && el.labels[0] ? el.labels[0].innerText : "";
      content = label || el.placeholder || el.value || "";
    } else if (tagName === "P" || tagName === "SPAN" || tagName === "LI" || /^H[1-6]$/.test(tagName)) {
      content = el.innerText || el.textContent;
    } else {
      if (el.getAttribute("aria-label")) {
        content = el.getAttribute("aria-label");
      } else if (el.title) {
        content = el.title;
      }
    }

    if (!content) return null;

    const cleanContent = content.trim().replace(/\s+/g, " ");
    if (cleanContent.length < 2) return null;

    return {
      text: cleanContent,
      element: el
    };
  };

  // Toggle main Voice Assistant state
  const toggleVoiceAssistant = useCallback(() => {
    setIsEnabled((prev) => {
      const nextState = !prev;
      if (nextState) {
        playAudioChime("on");
      } else {
        stopSpeech();
        playAudioChime("off");
      }
      return nextState;
    });
  }, [playAudioChime, stopSpeech]);

  // Global Keyboard Shortcuts (Alt + A, Escape, Alt + R)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.code === "KeyA") {
        e.preventDefault();
        toggleVoiceAssistant();
      } else if (e.altKey && e.code === "KeyR") {
        e.preventDefault();
        if (isReadingFullPage && !isPaused) {
          pauseFullPageRead();
        } else {
          startFullPageRead();
        }
      } else if (e.key === "Escape" || (e.altKey && e.code === "KeyS")) {
        stopSpeech();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleVoiceAssistant, stopSpeech, isReadingFullPage, isPaused]);

  // Interactive Hover & Focus Listener when Assistant is Enabled
  useEffect(() => {
    if (!isEnabled || isReadingFullPage) return;

    const handleMouseOver = (e) => {
      const details = getSpeakableDetails(e.target);
      if (details) {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
          speakText(details.text, details.element);
        }, 150);
      }
    };

    const handleFocusIn = (e) => {
      const details = getSpeakableDetails(e.target);
      if (details) {
        speakText(details.text, details.element);
      }
    };

    const handleMouseOut = () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("mouseout", handleMouseOut);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [isEnabled, isReadingFullPage, speakText]);

  // Cycle speed rate
  const cycleRate = () => {
    const rates = [0.8, 1, 1.25, 1.5];
    const nextIdx = (rates.indexOf(rate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    setRate(nextRate);
    playAudioChime("click");
    if (isReadingFullPage && !isPaused) {
      speakBlockAtIndex(activeBlockIndexRef.current, nextRate);
    }
  };

  return (
    <>
      {/* Live ARIA region for Native Screen Readers */}
      <div className={styles.srOnly} aria-live="assertive" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Main Voice Assistant Floating Container */}
      <div className={styles.voiceWidgetContainer}>
        {/* Active Spoken Status Banner */}
        {currentlySpeaking && (
          <div className={styles.statusBanner} role="status">
            <div className={styles.statusLabel}>
              <Mic size={12} className="animate-pulse" />
              <span>
                {isReadingFullPage
                  ? `Reading Page (${currentBlockIndex}/${totalBlocks})`
                  : "Sanmora Voice Reader"}
              </span>
            </div>
            <div className={styles.statusText}>{currentlySpeaking}</div>
          </div>
        )}

        {/* Floating Control Bar when Voice Assist or Full Page Reading is active */}
        {(isEnabled || isReadingFullPage) && (
          <div className={styles.controlBar} role="toolbar" aria-label="Voice Controls">
            {/* Read Full Page / Pause / Resume */}
            {isReadingFullPage && !isPaused ? (
              <button
                className={`${styles.actionPillBtn} ${styles.readingActive}`}
                onClick={pauseFullPageRead}
                title="Pause Full Page Reading"
              >
                <Pause size={14} />
                <span>Pause</span>
              </button>
            ) : (
              <button
                className={`${styles.actionPillBtn} ${isReadingFullPage ? styles.readingActive : ""}`}
                onClick={startFullPageRead}
                title="Read Entire Page Out Loud"
              >
                <Play size={14} />
                <span>{isPaused ? "Resume Page" : "Read Page"}</span>
              </button>
            )}

            {/* Stop Reading Button */}
            {(isReadingFullPage || currentlySpeaking) && (
              <button
                className={styles.stopPillBtn}
                onClick={stopFullPageRead}
                title="Stop Reading (Escape or Alt+S)"
              >
                <Square size={12} fill="currentColor" />
                <span>Stop</span>
              </button>
            )}

            {/* Speed Rate Toggle */}
            <button
              className={styles.rateSelector}
              onClick={cycleRate}
              title="Adjust Speech Speed"
              aria-label={`Speech rate ${rate}x`}
            >
              {rate}x
            </button>

            {/* Settings Modal Toggle */}
            <button
              className={styles.controlBtn}
              onClick={() => {
                playAudioChime("click");
                setShowSettings(true);
              }}
              title="Voice Settings"
              aria-label="Open Voice Settings"
            >
              <Settings size={15} />
            </button>

            {/* Help Info Toggle */}
            <button
              className={styles.controlBtn}
              onClick={() => {
                playAudioChime("click");
                setShowHelp(true);
              }}
              title="Voice Accessibility Help"
              aria-label="Open Voice Accessibility Help"
            >
              <HelpCircle size={15} />
            </button>
          </div>
        )}

        {/* Main Trigger Toggle Button */}
        <button
          className={`${styles.triggerBtn} ${isEnabled || isReadingFullPage ? styles.active : ""}`}
          onClick={toggleVoiceAssistant}
          aria-label={isEnabled ? "Disable Voice Assistant (Alt+A)" : "Enable Voice Assistant for Blind Users (Alt+A)"}
          title={isEnabled ? "Turn Off Voice Assistant (Alt+A)" : "Turn On Voice Assistant for Visually Impaired (Alt+A)"}
        >
          <div className={styles.iconWrapper}>
            {isEnabled || isReadingFullPage ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </div>
          <span>{isReadingFullPage ? "Reading Page" : isEnabled ? "Voice Active" : "Voice Assist"}</span>
          <span className={styles.pulseRing} />
          <span className={styles.hotkeyBadge}>Alt+A</span>
        </button>
      </div>

      {/* Voice Settings Modal */}
      {showSettings && (
        <div className={styles.modalOverlay} onClick={() => setShowSettings(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="settings-title"
          >
            <div className={styles.modalHeader}>
              <h3 id="settings-title" className={styles.modalTitle}>
                <Sliders size={20} /> Voice Reader Settings
              </h3>
              <button
                className={styles.closeBtn}
                onClick={() => setShowSettings(false)}
                aria-label="Close settings"
              >
                <X size={18} />
              </button>
            </div>

            {/* Language & Region Selector */}
            <div className={styles.settingGroup}>
              <label className={styles.settingLabel}>
                <span>Select Language ({selectedLang.flag} {selectedLang.name}):</span>
                <span className={styles.voiceCountBadge}>{filteredLanguages.length} languages</span>
              </label>

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
              <div className={styles.voiceSearchContainer}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  type="text"
                  className={styles.voiceSearchInput}
                  placeholder="Search language (Hindi, Gujarati, Zulu, Afrikaans, Tamil...)"
                  value={voiceSearchQuery}
                  onChange={(e) => setVoiceSearchQuery(e.target.value)}
                />
                {voiceSearchQuery && (
                  <button
                    type="button"
                    className={styles.clearSearchBtn}
                    onClick={() => setVoiceSearchQuery("")}
                    title="Clear search"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Custom Language Cards */}
              <div className={styles.voiceCustomSelect}>
                {filteredLanguages.length > 0 ? (
                  filteredLanguages.map((lang) => {
                    const isSelected = lang.code === selectedLang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        className={`${styles.voiceOptionCard} ${isSelected ? styles.voiceOptionSelected : ""}`}
                        onClick={() => changeSelectedLanguage(lang)}
                      >
                        <div className={styles.voiceOptionInfo}>
                          <span className={styles.voiceName}>
                            {lang.flag} {lang.name} ({lang.native})
                          </span>
                          <span className={styles.voiceLangTag}>{lang.code.toUpperCase()}</span>
                        </div>
                        {isSelected && <Check size={16} className={styles.voiceCheckIcon} />}
                      </button>
                    );
                  })
                ) : (
                  <div style={{ padding: "12px", fontSize: "0.8rem", color: "#94a3b8", textAlign: "center" }}>
                    No matching language found.
                  </div>
                )}
              </div>
            </div>

            {/* Narrator Voice Engine Selection (Optional fine-tuning) */}
            {voices.length > 0 && (
              <div className={styles.settingGroup}>
                <label className={styles.settingLabel} htmlFor="voice-select">
                  <span>Browser Voice Engine Accent:</span>
                </label>
                <select
                  id="voice-select"
                  className={styles.settingSelect}
                  value={selectedVoiceURI}
                  onChange={(e) => setSelectedVoiceURI(e.target.value)}
                >
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Pitch Slider */}
            <div className={styles.settingGroup}>
              <label className={styles.settingLabel} htmlFor="pitch-slider">
                <span>Voice Pitch: {pitch}</span>
              </label>
              <input
                id="pitch-slider"
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className={styles.settingSlider}
              />
            </div>

            {/* Audio Effects Toggle */}
            <div className={styles.settingGroup}>
              <label className={styles.settingLabel}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Bell size={16} /> Sound Chimes & Audio Cues
                </span>
                <input
                  type="checkbox"
                  checked={soundEffects}
                  onChange={(e) => setSoundEffects(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#38bdf8", cursor: "pointer" }}
                />
              </label>
            </div>

            <button
              type="button"
              className={styles.saveSettingsBtn}
              onClick={() => {
                playAudioChime("click");
                setShowSettings(false);
                speakText(`Voice language set to ${selectedLang.name}.`);
              }}
            >
              <Check size={18} />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Voice Help Guide Modal */}
      {showHelp && (
        <div className={styles.modalOverlay} onClick={() => setShowHelp(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="help-title"
          >
            <div className={styles.modalHeader}>
              <h3 id="help-title" className={styles.modalTitle}>
                <Eye size={20} /> Blind Accessibility Guide
              </h3>
              <button
                className={styles.closeBtn}
                onClick={() => setShowHelp(false)}
                aria-label="Close help"
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>
              Sanmora website is fully optimized for visually impaired visitors. Use these shortcuts & features:
            </p>

            <ul className={styles.helpList}>
              <li className={styles.helpItem}>
                <span className={styles.helpBadge}>Alt + A</span>
                <span>Toggle Voice Assistant ON / OFF.</span>
              </li>
              <li className={styles.helpItem}>
                <span className={styles.helpBadge}>Alt + R</span>
                <span>Start / Pause full page sequential speech reader.</span>
              </li>
              <li className={styles.helpItem}>
                <span className={styles.helpBadge}>Escape / Alt+S</span>
                <span>Stop speech immediately.</span>
              </li>
              <li className={styles.helpItem}>
                <span className={styles.helpBadge}>🇮🇳 🇿🇦 Languages</span>
                <span>Full support for all Indian & South African languages with auto-translation.</span>
              </li>
            </ul>

            <button
              type="button"
              className={styles.saveSettingsBtn}
              onClick={() => {
                playAudioChime("click");
                setShowHelp(false);
              }}
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}

