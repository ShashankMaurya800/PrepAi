const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// Generate Interview Question
router.post("/question", async (req, res) => {

  const { category } = req.body;

  res.json({
    success: true,
    question: `Dummy question for ${category}`
  });

});

// Evaluate Answer
router.post("/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;

    const prompt = `
You are an interview evaluator.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Return ONLY valid JSON.

{
"score": number between 1 and 10,
"feedback":"short feedback",
"strength":"one strength",
"improvement":"one improvement"
}
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");

    res.json(JSON.parse(text));

  }catch (error) {
  console.error("EVALUATION ERROR:");
  console.error(error);

  res.status(500).json({
    error: error.message,
  });
}
});

module.exports = router;