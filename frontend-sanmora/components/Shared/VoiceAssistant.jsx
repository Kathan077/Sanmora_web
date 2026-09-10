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
  Bell
} from "lucide-react";
import styles from "./VoiceAssistant.module.css";

export default function VoiceAssistant() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState("");
  const [soundEffects, setSoundEffects] = useState(true);
  const [currentlySpeaking, setCurrentlySpeaking] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  const activeElementRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const synthRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  // Initialize Speech Synthesis & Voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;

      const updateVoices = () => {
        const available = synthRef.current.getVoices();
        setVoices(available);
        // Default to English or preferred local voice
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
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
          osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
        }
      } catch (err) {
        // Silent audio chime fallback
      }
    },
    [soundEffects]
  );

  // Helper to remove visual highlight from previous element
  const clearHighlight = useCallback(() => {
    if (activeElementRef.current) {
      activeElementRef.current.classList.remove("voice-active-element");
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

  // Speak raw string text
  const speakText = useCallback(
    (text, targetElement = null, onEndCallback = null) => {
      if (!synthRef.current || !text) return;

      try {
        synthRef.current.cancel();
      } catch (e) {
        // ignore
      }

      const cleanedText = text.trim().replace(/\s+/g, " ");
      if (!cleanedText) return;

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = rate;
      utterance.pitch = pitch;

      if (selectedVoiceURI && voices.length > 0) {
        const voiceObj = voices.find((v) => v.voiceURI === selectedVoiceURI);
        if (voiceObj) utterance.voice = voiceObj;
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
        // Ignore normal cancellation/interruption events during navigation or user actions
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
    [rate, pitch, selectedVoiceURI, voices, applyHighlight, clearHighlight]
  );

  // Stop all speech immediately
  const stopSpeech = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setCurrentlySpeaking("");
    clearHighlight();
  }, [clearHighlight]);

  // Extract clean speakable text and description from DOM element
  const getSpeakableDetails = (el) => {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return null;

    // Skip hidden or voice assistant UI elements
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

    // Check specific elements
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
      // Check if element has explicit aria-label or title
      if (el.getAttribute("aria-label")) {
        content = el.getAttribute("aria-label");
      } else if (el.title) {
        content = el.title;
      }
    }

    if (!content) return null;

    // Trim content
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

  // Global Keyboard Shortcuts (Alt + A, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Voice Assistant: Alt + A
      if (e.altKey && e.code === "KeyA") {
        e.preventDefault();
        toggleVoiceAssistant();
      }
      // Stop Speech: Escape or Alt + S
      else if (e.key === "Escape" || (e.altKey && e.code === "KeyS")) {
        stopSpeech();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleVoiceAssistant, stopSpeech]);

  // Interactive Hover & Focus Listener when Assistant is Enabled
  useEffect(() => {
    if (!isEnabled) return;

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
  }, [isEnabled, speakText]);

  // Cycle speed rate
  const cycleRate = () => {
    const rates = [0.8, 1, 1.25, 1.5];
    const nextIdx = (rates.indexOf(rate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    setRate(nextRate);
    playAudioChime("click");
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
              <span>Sanmora Voice Reader</span>
            </div>
            <div className={styles.statusText}>{currentlySpeaking}</div>
          </div>
        )}

        {/* Floating Control Bar when Voice Assist is active */}
        {isEnabled && (
          <div className={styles.controlBar} role="toolbar" aria-label="Voice Controls">
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
              <Settings size={14} />
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
              <HelpCircle size={14} />
            </button>
          </div>
        )}

        {/* Main Trigger Toggle Button */}
        <button
          className={`${styles.triggerBtn} ${isEnabled ? styles.active : ""}`}
          onClick={toggleVoiceAssistant}
          aria-label={isEnabled ? "Disable Voice Assistant (Alt+A)" : "Enable Voice Assistant for Blind Users (Alt+A)"}
          title={isEnabled ? "Turn Off Voice Assistant (Alt+A)" : "Turn On Voice Assistant for Visually Impaired (Alt+A)"}
        >
          <div className={styles.iconWrapper}>
            {isEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </div>
          <span>{isEnabled ? "Voice Active" : "Voice Assist"}</span>
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

            {/* Select Voice */}
            <div className={styles.settingGroup}>
              <label className={styles.settingLabel} htmlFor="voice-select">
                <span>Select Narrator Voice:</span>
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
                <span className="flex items-center gap-2">
                  <Bell size={16} /> Sound Chimes & Audio Cues
                </span>
                <input
                  type="checkbox"
                  checked={soundEffects}
                  onChange={(e) => setSoundEffects(e.target.checked)}
                  className="w-5 h-5 accent-sky-500 cursor-pointer"
                />
              </label>
            </div>

            <button
              className="mt-2 w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              onClick={() => {
                playAudioChime("click");
                setShowSettings(false);
                speakText("Settings saved successfully.");
              }}
            >
              <Check size={18} /> Save Settings
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

            <p className="text-sm text-slate-300">
              Sanmora website is fully optimized for blind and visually impaired visitors. Use these shortcut keys & gestures:
            </p>

            <ul className={styles.helpList}>
              <li className={styles.helpItem}>
                <span className={styles.helpBadge}>Alt + A</span>
                <span>Toggle Voice Assistant ON / OFF from anywhere on the page.</span>
              </li>
              <li className={styles.helpItem}>
                <span className={styles.helpBadge}>Alt + R</span>
                <span>Start / Pause automatic sequential page reader.</span>
              </li>
              <li className={styles.helpItem}>
                <span className={styles.helpBadge}>Escape / Alt+S</span>
                <span>Stop speech immediately.</span>
              </li>
              <li className={styles.helpItem}>
                <span className={styles.helpBadge}>Hover / Focus</span>
                <span>Move your mouse or press Tab key to read out any text, button, or link out loud.</span>
              </li>
            </ul>

            <button
              className="mt-2 w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition-colors"
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
