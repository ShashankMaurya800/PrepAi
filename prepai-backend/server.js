require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
(async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();

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
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// Home Route
app.get("/", (req, res) => {
  res.send("THIS IS NEW BACKEND - JULY16");
});

// Test Route
app.get("/test", (req, res) => {
  res.send("TEST SUCCESS JULY16");
});

// Interview Evaluation Route
app.post("/api/interview", (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({
        error: "Answer is required",
      });
    }

    let score = 5;

    const keywords = [
      "java",
      "class",
      "object",
      "inheritance",
      "polymorphism",
      "database",
      "sql",
      "api",
      "algorithm",
      "project",
      "team",
      "tcp",
      "udp",
      "process",
      "thread",
    ];

    keywords.forEach((word) => {
      if (answer.toLowerCase().includes(word)) {
        score++;
      }
    });

    if (score > 10) score = 10;

    let feedback = "";

    if (score >= 9) {
      feedback =
        "Excellent answer. Strong technical depth and good use of relevant concepts.";
    } else if (score >= 7) {
      feedback =
        "Good answer. Add more real-world examples and technical details.";
    } else {
      feedback =
        "Decent answer. Expand your explanation and include achievements or examples.";
    }

    res.json({
      score,
      feedback,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});
