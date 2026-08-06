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
        model: "meta-llama/llama-3.3-8b-instruct:free",
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
},
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let text = response.data.choices[0].message.content;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (error) {
    console.error("OPENROUTER ERROR:");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;
  }
}

module.exports = {
  evaluateAnswer,
};