const axios = require("axios");

async function evaluateAnswer(question, answer) {
  try {
    console.log(
  "OpenRouter key loaded:",
  process.env.OPENROUTER_API_KEY
    ? process.env.OPENROUTER_API_KEY.substring(0, 15) + "..."
    : "NOT FOUND"
);
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
      model: "google/gemma-4-26b-a4b-it:free",
        messages: [
          {
            role: "system",
            content:
              "You are an expert technical interviewer. Always respond ONLY with valid JSON."
          },
          {
            role: "user",
            content: `
Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Return ONLY valid JSON in this format:

{
  "score": 8,
  "feedback": "...",
  "strength": "...",
  "improvement": "..."
}
`
          }
        ]
      },
      {
        headers: {
  Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
  "Content-Type": "application/json",
  "HTTP-Referer": "https://prepai-shashank.vercel.app",
  "X-Title": "PrepAI"
}
      }
    );

    let text = response.data.choices[0].message.content;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
  return JSON.parse(text);
} catch {
  return {
    score: 8,
    feedback: text,
    strength: "Good explanation.",
    improvement: "Add more technical details."
  };
}
  } catch (error) {

  console.log("=========== OPENROUTER ERROR ===========");

  if (error.response) {

    console.dir(error.response.data, {
      depth: null,
      colors: false
    });

  } else {

    console.error(error);

  }

  console.log("========================================");

  throw error;

}
}

module.exports = {
  evaluateAnswer,
};