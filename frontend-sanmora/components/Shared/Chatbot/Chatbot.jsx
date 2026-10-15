"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import styles from "./Chatbot.module.css";

const INITIAL_MESSAGE = {
  id: "welcome-1",
  role: "model",
  text: "Hello! 👋 Welcome to Sanmora. I'm your AI Assistant here to help with our custom web development, mobile apps, software solutions, and digital growth services. How can I assist you today?",
  timestamp: new Date(),
};

const SUGGESTED_QUESTIONS = [
  "What services do you provide?",
  "How can I book a free consultation?",
  "Where are your global offices located?",
  "What technologies do you specialize in?",
];

// Helper to format timestamps cleanly (e.g. 2:45 PM)
function formatTime(date) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return "";
  }
}

// Lightweight parser to render bold text and clickable URLs safely without external markdown dependencies
function renderFormattedText(text) {
  if (!text) return null;

  // Split into lines
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    // Check if line is a bullet point
    const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
    const cleanLine = isBullet ? line.trim().replace(/^[\*\-]\s+/, "") : line;

    // Split words by markdown link [text](url), raw URL, and bold patterns
    const parts = cleanLine.split(/(\[[^\]]+\]\(https?:\/\/[^\s\)]+\)|(?:https?:\/\/[^\s\)]+)|(?:\*\*[^*]+\*\*))/g);

    const renderedLine = parts.map((part, partIdx) => {
      if (!part) return null;

      // Check Markdown link: [Title](https://...)
      const mdLinkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)$/);
      if (mdLinkMatch) {
        return (
          <a
            key={partIdx}
            href={mdLinkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {mdLinkMatch[1]}
          </a>
        );
      }

      // Check Raw URL
      if (part.startsWith("http://") || part.startsWith("https://")) {
        return (
          <a
            key={partIdx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }

      // Check Bold **text**
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
      }

      return part;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} style={{ display: "flex", gap: "6px", marginLeft: "4px", marginBottom: "4px" }}>
          <span>•</span>
          <div>{renderedLine}</div>
        </div>
      );
    }

    return (
      <React.Fragment key={lineIdx}>
        {renderedLine}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function Chatbot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastError, setLastError] = useState(null);
  const [lastFailedMessage, setLastFailedMessage] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Client-only mounting guard to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = (behavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior, block: "nearest" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input on open
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Send message handler
  const handleSendMessage = async (textToSend = null) => {
    const userText = (textToSend || inputValue).trim();
    if (!userText || isLoading) return;

    setLastError(null);
    setLastFailedMessage("");
    setInputValue("");

    const userMessage = {
      id: "user-" + Date.now(),
      role: "user",
      text: userText,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Build conversation history for the API (only valid user and model messages)
      const historyPayload = newMessages.slice(0, -1).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to receive a response.");
      }

      const botMessage = {
        id: "bot-" + Date.now(),
        role: "model",
        text: data.reply || "Thank you for reaching out. How else can I assist you?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("[Chatbot Error]", err);
      setLastError(err.message || "An unexpected error occurred. Please try again.");
      setLastFailedMessage(userText);
    } finally {
      setIsLoading(false);
    }
  };

  // Retry sending last failed message
  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage);
    }
  };

  // Reset conversation
  const handleClearChat = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: "welcome-" + Date.now(),
        timestamp: new Date(),
      },
    ]);
    setLastError(null);
    setLastFailedMessage("");
  };

  // Handle enter key to send
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Chat Launcher */}
      <div className={styles.launcherWrapper}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`${styles.launcherBtn} ${isOpen ? styles.launcherActive : ""}`}
          aria-label={isOpen ? "Close AI chat assistant" : "Open AI chat assistant"}
          aria-expanded={isOpen}
          title={isOpen ? "Close Assistant" : "Sanmora AI • Chatbot for Help"}
        >
          <div className={styles.launcherHalo} />
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          <div className={styles.onlineBadge} />
        </button>
        {!isOpen && (
          <div className={styles.launcherTooltip}>
            <span>Chatbot for Help</span>
          </div>
        )}
      </div>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          className={styles.chatPanel}
          role="dialog"
          aria-label="Sanmora AI Help Desk"
        >
          {/* Header */}
          <div className={styles.panelHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.avatarContainer}>
                <Sparkles size={20} className={styles.avatarIcon} />
                <div className={styles.avatarStatusDot} />
              </div>
              <div className={styles.brandText}>
                <span className={styles.brandName}>Sanmora AI • Help Desk</span>
                <span className={styles.brandSubtitle}>
                  <span className={styles.headerLiveDot} />
                  Online • Instant Support
                </span>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button
                onClick={handleClearChat}
                className={styles.headerIconBtn}
                title="Start new conversation"
                aria-label="Start new conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.headerIconBtn}
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className={styles.messagesContainer} role="log" aria-live="polite">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`${styles.messageRow} ${isUser ? styles.userRow : styles.botRow}`}
                >
                  {!isUser && (
                    <div className={styles.botAvatarBubble} aria-hidden="true">
                      <Bot size={15} />
                    </div>
                  )}

                  <div className={styles.bubbleContainer}>
                    <div
                      className={`${styles.messageBubble} ${
                        isUser ? styles.userBubble : styles.botBubble
                      }`}
                    >
                      {isUser ? msg.text : renderFormattedText(msg.text)}
                    </div>
                    <span className={styles.messageTime}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing state */}
            {isLoading && (
              <div className={`${styles.messageRow} ${styles.botRow}`}>
                <div className={styles.botAvatarBubble} aria-hidden="true">
                  <Bot size={15} />
                </div>
                <div className={styles.typingContainer} aria-label="Assistant is typing">
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions (only show when there are 1-2 messages to keep chat tidy) */}
          {messages.length <= 2 && !isLoading && (
            <div className={styles.suggestedWrapper}>
              <div className={styles.suggestedHeader}>
                <HelpCircle size={12} />
                <span>Frequently Asked</span>
              </div>
              <div className={styles.suggestedPills}>
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    className={styles.pillBtn}
                    onClick={() => handleSendMessage(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Banner with Retry */}
          {lastError && (
            <div className={styles.errorBanner} role="alert">
              <AlertCircle size={16} flexShrink={0} />
              <div className={styles.errorText}>{lastError}</div>
              {lastFailedMessage && (
                <button onClick={handleRetry} className={styles.retryBtn}>
                  Retry
                </button>
              )}
            </div>
          )}

          {/* Input Form */}
          <form
            className={styles.inputForm}
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about our services, projects..."
              className={styles.textInput}
              disabled={isLoading}
              maxLength={500}
              aria-label="Type your message"
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>

          {/* Panel Footer Brand Note */}
          <div className={styles.panelFooter}>
            Sanmora AI • 24/7 Digital Concierge
          </div>
        </div>
      )}
    </>
  );
}
