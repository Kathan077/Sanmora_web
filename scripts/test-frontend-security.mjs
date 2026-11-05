import assert from "assert";
import {
  escapeHtml,
  sanitizeHeader,
  validateEmail,
  checkRateLimit,
  checkDuplicateSubmission,
  verifyRecaptcha,
  logEmailAudit,
} from "../frontend-sanmora/lib/emailSecurity.js";
import { getMailTransporter } from "../frontend-sanmora/lib/mailer.js";

console.log("\n=======================================================");
console.log(" FRONTEND SANMORA: EMAIL SECURITY & MAILER TEST SUITE");
console.log("=======================================================\n");

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${name}:`, err.message);
  }
}

async function runAsyncTest(name, fn) {
  total++;
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${name}:`, err.message);
  }
}

async function main() {
  // Test 1: Header Injection Sanitization
  runTest("Header Injection: CRLF stripping", () => {
    const malicious = "Contact Subject\r\nBcc: evil@phish.com\r\n";
    const cleaned = sanitizeHeader(malicious);
    assert.strictEqual(cleaned.includes("\r"), false);
    assert.strictEqual(cleaned.includes("\n"), false);
  });

  // Test 2: HTML Escaping
  runTest("HTML Escaping: Prevents phishing tags", () => {
    const dangerous = `<script src="evil.js"></script><a href="phish">Test</a>`;
    const safe = escapeHtml(dangerous);
    assert.strictEqual(safe.includes("<script"), false);
    assert.strictEqual(safe.includes("&lt;script"), true);
  });

  // Test 3: Email Validation
  runTest("Email Validation: Disposable and fake check", () => {
    assert.strictEqual(validateEmail("bot@mailinator.com").valid, false);
    assert.strictEqual(validateEmail("test@example.com").valid, false);
    assert.strictEqual(validateEmail("user@sanmora.in").valid, true);
  });

  // Test 4: Rate Limiting
  runTest("Rate Limiter: Limits to 5 requests per IP", () => {
    const testIp = "198.51.100." + Math.floor(Math.random() * 250);
    for (let i = 0; i < 5; i++) {
      assert.strictEqual(checkRateLimit(testIp, 5, 60000).allowed, true);
    }
    assert.strictEqual(checkRateLimit(testIp, 5, 60000).allowed, false);
  });

  // Test 5: Duplicate Submission Check
  runTest("Duplicate Check: Suppresses immediate identical submissions", () => {
    const key = "user-apply-12345";
    assert.strictEqual(checkDuplicateSubmission(key).isDuplicate, false);
    assert.strictEqual(checkDuplicateSubmission(key).isDuplicate, true);
  });

  // Test 6: Transporter Pooling
  runTest("Transporter: Connection pooling active", () => {
    process.env.EMAIL_USER = "test@sanmora.in";
    process.env.EMAIL_PASS = "dummy_pass";
    const transporter = getMailTransporter();
    assert.strictEqual(transporter.options.pool, true);
    assert.strictEqual(transporter.options.maxConnections, 3);
    assert.strictEqual(transporter.options.rateLimit, 5);
  });

  console.log("\n=======================================================");
  console.log(` RESULTS: ${passed}/${total} FRONTEND TESTS PASSED`);
  console.log("=======================================================\n");

  if (passed !== total) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

