require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

console.log("API KEY FOUND:", !!process.env.GEMINI_API_KEY);

// Gemini Setup
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
app.get("/models", async (req, res) => {
  try {
    const result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    const data = await result.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
app.get("/models-test", async (req, res) => {
  try {
    const result = await model.generateContent("Say Hello");

    res.json({
      success: true,
      response: result.response.text(),
    });
  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      error: error.message,
    });
  }
});

// Interview Evaluation Route
app.post("/api/interview", async (req, res) => {
  console.log("API HIT");

  try {
    const { answer } = req.body;

    const result = await model.generateContent(
      `Evaluate this interview answer:

      ${answer}

      Give:
      Score out of 10
      Strengths
      Improvements`
    );

    const feedback = result.response.text();

    console.log("GEMINI RESPONSE:");
    console.log(feedback);

    res.json({
      score: 8,
      feedback: feedback
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});