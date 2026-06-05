require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
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
