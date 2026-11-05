"use client";

let scriptLoadPromise = null;

function loadRecaptchaScript(siteKey) {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.grecaptcha && window.grecaptcha.execute) {
    return Promise.resolve(true);
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve) => {
    // Check if script element already exists
    const existing = document.getElementById("google-recaptcha-v3");
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-recaptcha-v3";
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;

    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn("[reCAPTCHA] Failed to load Google reCAPTCHA script.");
      resolve(false);
    };

    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

/**
 * Executes Google reCAPTCHA v3 on the client and returns a token string.
 * If NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined, returns null without throwing.
 */
export async function getRecaptchaToken(action = "submit") {
  if (typeof window === "undefined") return null;

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey || !siteKey.trim()) {
    return null;
  }

  try {
    const loaded = await loadRecaptchaScript(siteKey.trim());
    if (!loaded || !window.grecaptcha) {
      return null;
    }

    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey.trim(), { action });
          resolve(token);
        } catch (err) {
          console.warn("[reCAPTCHA] Execution error:", err?.message || err);
          resolve(null);
        }
      });
    });
  } catch (err) {
    console.warn("[reCAPTCHA] Error getting token:", err?.message || err);
    return null;
  }
}

