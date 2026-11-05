import crypto from "crypto";

// HTML Escaping to prevent HTML injection and phishing links in emails
export function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// SMTP Header Sanitization to prevent CRLF injection (Email Header Injection)
export function sanitizeHeader(str, maxLength = 120) {
  if (typeof str !== "string") return "";
  // Strip carriage returns, line feeds, null bytes, and url-encoded variants
  const cleaned = str
    .replace(/[\r\n\0]/g, " ")
    .replace(/%0[ad]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.slice(0, maxLength);
}

// General text input sanitizer
export function sanitizeTextInput(str, maxLength = 2000) {
  if (typeof str !== "string") return "";
  return str.replace(/\0/g, "").trim().slice(0, maxLength);
}

// Disposable domains set
export const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "temp-mail.org", "10minutemail.com",
  "yopmail.com", "guerrillamail.com", "dispostable.com", "getairmail.com",
  "maildrop.cc", "trashmail.com", "mailnesia.com", "temp-mail.io", "fakemailgenerator.com",
  "generator.email", "disposable.com", "tempmailaddress.com", "throwawaymail.com",
  "sharklasers.com", "guerrillamailblock.com", "grr.la", "guerrillamail.net"
]);

// Email syntax and pattern validation
export function validateEmail(email) {
  if (!email || typeof email !== "string") {
    return { valid: false, error: "Email address is required." };
  }

  const trimmed = email.trim();
  if (trimmed.length > 254) {
    return { valid: false, error: "Email address is too long." };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: "Please enter a valid email address format." };
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return { valid: false, error: "Invalid email structure." };
  }

  const username = parts[0].toLowerCase();
  const domain = parts[1].toLowerCase();

  // Check disposable domains
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { valid: false, error: "Temporary or disposable email addresses are not permitted." };
  }

  // Check placeholder / fake username patterns
  const fakePrefixes = [
    "abc", "xyz", "qwe", "asd", "zxc", "jkl", "qwerty", "test", "testing",
    "dummy", "example", "fake", "demo", "noreply", "no-reply", "null", "none", "temp"
  ];
  const prefixPattern = new RegExp(`^(${fakePrefixes.join("|")})[._-]?\\d*$`);
  const forbiddenSubstrings = ["testing", "fakeemail", "exampleemail", "dummyemail"];

  if (
    prefixPattern.test(username) ||
    forbiddenSubstrings.some((sub) => username.includes(sub)) ||
    /^(.)\1{2,}$/.test(username) ||
    /^\d+$/.test(username)
  ) {
    return {
      valid: false,
      error: "Please enter a genuine, professional email address. Fake or placeholder emails are not accepted."
    };
  }

  return { valid: true, email: trimmed };
}

// In-memory sliding-window Rate Limiter per IP for Next.js API routes
// 5 emails per 10 minutes per IP
const emailRateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_EMAILS_PER_WINDOW = 5;

let lastRateLimitCleanup = Date.now();
function cleanupRateLimits() {
  const now = Date.now();
  if (now - lastRateLimitCleanup > 5 * 60 * 1000) {
    lastRateLimitCleanup = now;
    for (const [ip, timestamps] of emailRateLimitMap.entries()) {
      const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (valid.length === 0) {
        emailRateLimitMap.delete(ip);
      } else {
        emailRateLimitMap.set(ip, valid);
      }
    }
  }
}

export function checkRateLimit(clientIp, maxAllowed = MAX_EMAILS_PER_WINDOW, windowMs = RATE_LIMIT_WINDOW_MS) {
  cleanupRateLimits();
  const now = Date.now();
  const ip = clientIp || "unknown-ip";
  const timestamps = emailRateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxAllowed) {
    const oldest = recent[0];
    const retryAfterSec = Math.ceil((windowMs - (now - oldest)) / 1000);
    return {
      allowed: false,
      retryAfterSec: Math.max(1, retryAfterSec),
      remaining: 0
    };
  }

  recent.push(now);
  emailRateLimitMap.set(ip, recent);

  return {
    allowed: true,
    remaining: maxAllowed - recent.length,
    retryAfterSec: 0
  };
}

// Duplicate Submission Cache (Idempotency) - 2 minute window
const duplicateCache = new Map();
let lastDuplicateCleanup = Date.now();

function cleanupDuplicateCache() {
  const now = Date.now();
  if (now - lastDuplicateCleanup > 60 * 1000) {
    lastDuplicateCleanup = now;
    for (const [key, expiresAt] of duplicateCache.entries()) {
      if (now > expiresAt) {
        duplicateCache.delete(key);
      }
    }
  }
}

export function checkDuplicateSubmission(dataKey, ttlMs = 2 * 60 * 1000) {
  cleanupDuplicateCache();
  const now = Date.now();
  const hash = crypto.createHash("sha256").update(dataKey).digest("hex");

  if (duplicateCache.has(hash)) {
    const expiresAt = duplicateCache.get(hash);
    if (now < expiresAt) {
      return { isDuplicate: true };
    }
  }

  duplicateCache.set(hash, now + ttlMs);
  return { isDuplicate: false };
}

// Google reCAPTCHA v3 Backend Verification
export async function verifyRecaptcha(token, expectedAction, remoteIp) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // If secret key is not set:
  if (!secretKey) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[RECAPTCHA WARNING] RECAPTCHA_SECRET_KEY is not configured in production environment. Requests are allowed but vulnerable to automated abuse until key is set.");
    }
    return {
      success: true,
      score: 1.0,
      mode: "bypassed_missing_secret",
      warning: "RECAPTCHA_SECRET_KEY not configured"
    };
  }

  if (!token || typeof token !== "string" || !token.trim()) {
    return {
      success: false,
      score: 0,
      error: "CAPTCHA token is missing. Please refresh and try again."
    };
  }

  try {
    const postData = new URLSearchParams({
      secret: secretKey.trim(),
      response: token.trim(),
    });
    if (remoteIp) {
      postData.append("remoteip", remoteIp);
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: postData.toString()
    });

    const data = await response.json();

    if (!data.success) {
      const errorCodes = data["error-codes"] ? data["error-codes"].join(", ") : "verification_failed";
      return {
        success: false,
        score: 0,
        error: `CAPTCHA verification failed (${errorCodes}). Please try submitting again.`
      };
    }

    const score = typeof data.score === "number" ? data.score : 0;
    // Standard reCAPTCHA v3 score threshold is 0.5 (1.0 = human, 0.0 = bot)
    if (score < 0.5) {
      return {
        success: false,
        score,
        error: "Your submission was flagged by automated security filters as suspicious. Please try again."
      };
    }

    // Check action if provided
    if (expectedAction && data.action && data.action !== expectedAction) {
      return {
        success: false,
        score,
        error: "CAPTCHA action verification mismatch."
      };
    }

    return {
      success: true,
      score,
      action: data.action
    };
  } catch (err) {
    console.error("[Recaptcha Error] Verification request failed:", err.message);
    // On unexpected Google network error, fail closed in production if secret is configured
    return {
      success: false,
      score: 0,
      error: "Unable to complete security verification right now. Please try again."
    };
  }
}

// Client IP extractor for Next.js App Router
export function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  
  if (cfConnectingIp) return cfConnectingIp.trim();
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

// SMTP & Email Audit Logger (Never logs passwords or credentials)
export function logEmailAudit({
  endpoint,
  recipient,
  clientIp,
  status,
  score = null,
  subject = "",
  error = null,
  details = ""
}) {
  const timestamp = new Date().toISOString();
  const maskedIp = clientIp ? clientIp.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, "$1.$2.*.*") : "unknown";
  
  const logEntry = {
    tag: "EMAIL_AUDIT",
    timestamp,
    endpoint,
    clientIp: maskedIp,
    recipient: recipient ? sanitizeHeader(recipient, 60) : "N/A",
    subject: subject ? sanitizeHeader(subject, 60) : "N/A",
    recaptchaScore: score !== null ? score : "N/A",
    status, // SUCCESS, BLOCKED_RATE_LIMIT, BLOCKED_DUPLICATE, BLOCKED_CAPTCHA, FAILED_SMTP, INVALID_INPUT
    error: error ? sanitizeHeader(String(error), 200) : null,
    details: details ? sanitizeHeader(String(details), 150) : null
  };

  if (status === "SUCCESS") {
    console.log(`[EMAIL_AUDIT:SUCCESS] ${timestamp} | Endpoint: ${endpoint} | IP: ${maskedIp} | Status: ${status} | Subject: "${logEntry.subject}"`);
  } else {
    console.warn(`[EMAIL_AUDIT:ALERT] ${timestamp} | Endpoint: ${endpoint} | IP: ${maskedIp} | Status: ${status} | Error: ${logEntry.error || "N/A"} | Details: ${logEntry.details || "N/A"}`);
  }

  return logEntry;
}

