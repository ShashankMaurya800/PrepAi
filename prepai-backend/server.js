require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Connect Database
(async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://prepai-shashank.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("PrepAI Backend Running 🚀");
});

// Test Route
app.get("/test", (req, res) => {
  res.send("TEST SUCCESS JULY16");
});

// Dummy Interview Route
app.post("/api/interview", (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({
        error: "Answer is required",
      });
    }

    res.json({
      score: 8,
      feedback: "Interview route working successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});