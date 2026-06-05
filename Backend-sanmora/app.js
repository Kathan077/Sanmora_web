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
        // Allow all origins to prevent CORS errors during deployment
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

    console.log("Backend Start");
});
