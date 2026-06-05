require("dotenv").config();
const dns = require("dns");
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: function (origin, callback) {

        callback(null, true);
    },
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handlers
const consultationRouter = require("./routes/consultationRoutes");
const careerRouter = require("./routes/careerRoutes");

// Mount routes
app.use("/api/consultation", consultationRouter);
app.use("/api/career-apply", careerRouter);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Sanmora Web Backend is running." });
});

// Start express server
app.listen(PORT, () => {
    console.log("Backend Start on port", PORT);
    console.log("=== EMAIL DIAGNOSTICS ===");
    console.log("EMAIL_HOST:", process.env.EMAIL_HOST || "smtp.gmail.com");
    console.log("EMAIL_PORT:", process.env.EMAIL_PORT || "587");
    console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Configured" : "NOT SET");
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Configured" : "NOT SET");
    console.log("EMAIL_RECEIVER:", process.env.EMAIL_RECEIVER || "NOT SET");
    console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "Configured (Will bypass SMTP)" : "NOT SET");
    console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY ? "Configured (Will bypass SMTP)" : "NOT SET");
    console.log("=========================");
});
