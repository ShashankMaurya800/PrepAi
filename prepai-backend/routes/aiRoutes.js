const express = require("express");
const { evaluateAnswer } = require("../services/openrouterService");

const router = express.Router();

// Generate Interview Question
router.post("/question", async (req, res) => {
  try {
    const { category } = req.body;

    res.json({
      success: true,
      question: `Dummy question for ${category}`,
    });
  } catch (error) {
    console.error("QUESTION ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate question.",
    });
  }
});

// Evaluate Answer
router.post("/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required.",
      });
    }

    const result = await evaluateAnswer(question, answer);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("AI ROUTE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to evaluate answer.",
    });
  }
});

module.exports = router;