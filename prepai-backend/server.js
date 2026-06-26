require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// Home Route
app.get("/", (req, res) => {
  res.send("PrepAI Backend Running 🚀");
});

// Test Route
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
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
// Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});