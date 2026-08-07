const axios = require("axios");

async function evaluateAnswer(question, answer) {
  const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer.

Question:
${question}

Candidate Answer:
${answer}

Return ONLY valid JSON in this exact format:

{
  "score": 8,
  "feedback": "Short overall feedback.",
  "strength": "One strength.",
  "improvement": "One improvement."
}
`;

  try {
    console.log("Using OpenRouter model...");

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-4-26b-a4b-it:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://prepai-shashank.vercel.app",
          "X-Title": "PrepAI",
        },
        timeout: 30000,
      }
    );

    const text = response.data.choices[0].message.content.trim();

    console.log("AI Response:");
    console.log(text);

    try {
      return JSON.parse(text);
    } catch {
      return {
        score: 7,
        feedback: text,
        strength: "Answer contains useful information.",
        improvement: "Provide more technical details and examples.",
      };
    }
  } catch (error) {
    console.error("========== OPENROUTER ERROR ==========");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error(
        JSON.stringify(error.response.data, null, 2)
      );
    } else {
      console.error(error.message);
    }

    throw error;
  }
}

module.exports = {
  evaluateAnswer,
};