require("dotenv").config();
const dns = require("dns");
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for reverse proxies (Render, Vercel, Nginx, Cloudflare)
app.set("trust proxy", 1);

// Allowed Origins for CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [
      "https://sanmora.in",
      "https://www.sanmora.in",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. mobile apps, curl, or same-origin server requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(new Error("CORS policy does not allow access from this origin."));
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// Payload size limits to prevent body-parser Denial of Service
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Route handlers
const consultationRouter = require("./routes/consultationRoutes");
const careerRouter = require("./routes/careerRoutes");

// Mount routes
app.use("/api/consultation", consultationRouter);
app.use("/api/career-apply", careerRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Sanmora Web Backend is running securely.",
    timestamp: new Date().toISOString(),
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  if (err.message && err.message.includes("CORS")) {
    return res.status(403).json({ error: "Access forbidden by CORS policy." });
  }
  console.error("[Backend Error]", err.message || err);
  return res.status(500).json({ error: "Internal server error." });
});

// Start express server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`[Sanmora Backend] Server running securely on port ${PORT}`);
  });
}

module.exports = app;
