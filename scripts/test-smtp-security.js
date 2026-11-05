/**
 * Automated Security & Verification Test Suite for Sanmora Web Email Infrastructure
 */

const assert = require("assert");

// Load backend security module
const backendSecurity = require("../Backend-sanmora/utils/emailSecurity");
const { getTransporter } = require("../Backend-sanmora/config/mailer");

console.log("\n=======================================================");
console.log(" SANMORA WEB: SMTP & SECURITY AUDIT TEST SUITE");
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
  // Test 1: SMTP Header Injection Prevention (CRLF Injection)
  runTest("Header Injection: Strips carriage return and line feed", () => {
    const maliciousInput = "Inquiry Subject\r\nBcc: victim1@spam.com, victim2@spam.com\nTo: hijacked@domain.com";
    const cleaned = backendSecurity.sanitizeHeader(maliciousInput);
    assert.strictEqual(cleaned.includes("\r"), false, "Must not contain \\r");
    assert.strictEqual(cleaned.includes("\n"), false, "Must not contain \\n");
    assert.strictEqual(cleaned.includes("victim1@spam.com"), true, "Text preserved on single line");
    assert.strictEqual(cleaned, "Inquiry Subject Bcc: victim1@spam.com, victim2@spam.com To: hijacked@domain.com");
  });

  runTest("Header Injection: URL-encoded CRLF (%0d, %0a) stripped", () => {
    const maliciousUrlEncoded = "Website%0d%0aBcc:%20attacker@malicious.com";
    const cleaned = backendSecurity.sanitizeHeader(maliciousUrlEncoded);
    assert.strictEqual(/%0[ad]/i.test(cleaned), false, "Must not contain %0d or %0a");
  });

  // Test 2: HTML Injection / XSS in Email Body Prevention
  runTest("HTML Escaping: Escapes dangerous HTML and script tags", () => {
    const maliciousPayload = '<script>alert("hacked")</script><a href="http://phishing.site">Click</a>&"\'';
    const escaped = backendSecurity.escapeHtml(maliciousPayload);
    assert.strictEqual(escaped.includes("<script>"), false);
    assert.strictEqual(escaped.includes("&lt;script&gt;"), true);
    assert.strictEqual(escaped.includes("&quot;"), true);
    assert.strictEqual(escaped.includes("&#039;"), true);
    assert.strictEqual(escaped.includes("&amp;"), true);
  });

  // Test 3: Email Validation & Disposable Domain Blocking
  runTest("Email Validation: Blocks disposable email domains", () => {
    const disposable1 = backendSecurity.validateEmail("spammer@mailinator.com");
    assert.strictEqual(disposable1.valid, false);
    assert.strictEqual(disposable1.error.includes("disposable"), true);

    const disposable2 = backendSecurity.validateEmail("attacker@tempmail.com");
    assert.strictEqual(disposable2.valid, false);
  });

  runTest("Email Validation: Blocks fake / placeholder usernames", () => {
    const fake1 = backendSecurity.validateEmail("test@gmail.com");
    assert.strictEqual(fake1.valid, false);

    const fake2 = backendSecurity.validateEmail("dummy@company.com");
    assert.strictEqual(fake2.valid, false);

    const fake3 = backendSecurity.validateEmail("noreply@mycorp.com");
    assert.strictEqual(fake3.valid, false);
  });

  runTest("Email Validation: Accepts genuine business emails", () => {
    const genuine1 = backendSecurity.validateEmail("kathan.shah@sanmora.in");
    assert.strictEqual(genuine1.valid, true);

    const genuine2 = backendSecurity.validateEmail("contact@enterprise-client.co.za");
    assert.strictEqual(genuine2.valid, true);
  });

  // Test 4: Rate Limiting Enforcement
  runTest("Rate Limiting: Allows up to 5 requests per window, blocks the 6th", () => {
    const testIp = "203.0.113." + Math.floor(Math.random() * 250);

    for (let i = 1; i <= 5; i++) {
      const res = backendSecurity.checkRateLimit(testIp, 5, 60000);
      assert.strictEqual(res.allowed, true, `Request ${i} should be allowed`);
    }

    const blocked = backendSecurity.checkRateLimit(testIp, 5, 60000);
    assert.strictEqual(blocked.allowed, false, "6th request must be blocked");
    assert.strictEqual(blocked.retryAfterSec > 0, true, "Must return retryAfterSec");
  });

  // Test 5: Duplicate Submission Prevention (Idempotency)
  runTest("Duplicate Check: Identical submission within TTL is identified", () => {
    const uniqueKey = "test-session-" + Date.now();
    const firstCheck = backendSecurity.checkDuplicateSubmission(uniqueKey, 5000);
    assert.strictEqual(firstCheck.isDuplicate, false, "First submission should not be duplicate");

    const secondCheck = backendSecurity.checkDuplicateSubmission(uniqueKey, 5000);
    assert.strictEqual(secondCheck.isDuplicate, true, "Immediate duplicate must be flagged");
  });

  // Test 6: Google reCAPTCHA v3 Verification
  await runAsyncTest("reCAPTCHA: Graceful bypass or validation handling", async () => {
    const result = await backendSecurity.verifyRecaptcha("", "consultation", "127.0.0.1");
    // If no secret key is set in dev, it returns mode: 'bypassed_missing_secret'
    // If secret key is set, it returns success: false
    assert.strictEqual(typeof result.success, "boolean");
  });

  // Test 7: SMTP Transporter Pooling Configuration
  runTest("SMTP Configuration: Verifies connection pooling settings", () => {
    process.env.EMAIL_USER = "test@sanmora.in";
    process.env.EMAIL_PASS = "test_pass";
    process.env.EMAIL_HOST = "smtp.hostinger.com";
    process.env.EMAIL_PORT = "465";

    const transporter = getTransporter();
    assert.strictEqual(transporter !== null, true, "Transporter created");
    assert.strictEqual(transporter.options.pool, true, "Connection pooling MUST be enabled");
    assert.strictEqual(transporter.options.maxConnections, 3, "Max connections set to 3");
    assert.strictEqual(transporter.options.rateLimit, 5, "Rate limit set to 5 msgs/sec");
    assert.strictEqual(transporter.options.secure, true, "Port 465 is secure SSL");
  });

  // Test 8: Audit Logging Formatting
  runTest("Audit Logging: Logs do not contain plain credentials or unmasked IP", () => {
    let loggedOutput = "";
    const origWarn = console.warn;
    console.warn = (msg) => { loggedOutput += msg; };

    backendSecurity.logEmailAudit({
      endpoint: "/api/consultation",
      clientIp: "192.168.1.100",
      recipient: "info@sanmora.in",
      status: "BLOCKED_RATE_LIMIT",
      details: "Test log output"
    });

    console.warn = origWarn;
    assert.strictEqual(loggedOutput.includes("192.168.*.*"), true, "IP should be masked");
    assert.strictEqual(loggedOutput.includes("test_pass"), false, "Credentials must never be in logs");
  });

  console.log("\n=======================================================");
  console.log(` RESULTS: ${passed}/${total} TESTS PASSED`);
  console.log("=======================================================\n");

  if (passed !== total) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});

