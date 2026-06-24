import { useState } from "react";
import axios from "axios";
function Interview() {
  const questions = [
    "Tell me about yourself.",
    "What are your strengths?",
    "Why should we hire you?",
    "Explain a challenging project you worked on.", 
    "Where do you see yourself in 5 years?"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async () => {
    console.log("Button Clicked");
  try {
    const response = await axios.post(
      "http://localhost:5000/api/interview",
      {
        answer
      }
    );
    console.log(response.data);
    setFeedback(response.data);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Mock Interview
      </h1>

      <div className="bg-slate-900 p-8 rounded-xl">

        <h2 className="text-3xl mb-6">
          {questions[currentQuestion]}
        </h2>

        <textarea
          rows="8"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full bg-slate-800 rounded-lg p-4"
        />

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Submit Answer
        </button>
        {feedback && (
  <div className="mt-6 bg-slate-800 p-4 rounded-lg">
    <h3 className="text-xl font-bold">
      Score: {feedback.score}/10
    </h3>

    <p className="mt-2">
      {feedback.feedback}
    </p>

    <button
      onClick={() => {
        setFeedback(null);
        setAnswer("");

        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        }
      }}
      className="mt-4 bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600"
    >
      Next Question
    </button>
  </div>
)}

      </div>
    </div>
  );
}

export default Interview;