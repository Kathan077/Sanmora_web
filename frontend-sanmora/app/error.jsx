"use client";

import { useEffect, useState } from "react";
import styles from "./error.module.css";

export default function Error({ error, unstable_retry }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const errorMsg = error?.message || "";
  // Detect typical chunk load failures
  const isChunkError =
    /chunk/i.test(errorMsg) ||
    /Failed to fetch/i.test(errorMsg) ||
    /dynamically imported module/i.test(errorMsg) ||
    error?.name === "ChunkLoadError";

  useEffect(() => {
    if (isChunkError) {
      // Attempt to auto-resolve by reloading the page
      try {
        const lastReload = sessionStorage.getItem("last-chunk-reload");
        const now = Date.now();

        // If we haven't reloaded in the last 15 seconds, trigger a hard refresh
        if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
          sessionStorage.setItem("last-chunk-reload", now.toString());
          window.location.reload();
        }
      } catch (e) {
        console.error("Session storage or reload error", e);
      }
    }

    console.error("Error caught by boundary:", error);
  }, [error, isChunkError]);

  const handleRetry = () => {
    if (typeof unstable_retry === "function") {
      unstable_retry();
    } else {
      window.location.reload();
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h1 className={styles.title}>
          {isChunkError ? "Site Update Detected" : "Navigation Interrupted"}
        </h1>
        
        <p className={styles.description}>
          {isChunkError
            ? "We've deployed a new version of Sanmora. A quick reload is needed to get the latest features."
            : "An unexpected error occurred while loading this page. This is usually temporary and can be fixed by retrying."}
        </p>

        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={handleReload}>
            Reload Page
          </button>
          <button className={styles.secondaryBtn} onClick={handleRetry}>
            Try Again
          </button>
        </div>

        {error && (
          <div className={`${styles.detailsWrapper} ${isDetailsOpen ? styles.expanded : ""}`}>
            <div
              className={styles.detailsHeader}
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            >
              <span>{isDetailsOpen ? "Hide Technical Details" : "Show Technical Details"}</span>
              <svg
                className={styles.arrowIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {isDetailsOpen && (
              <pre className={styles.detailsContent}>
                {error.name || "Error"}: {error.message || "Unknown error"}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
