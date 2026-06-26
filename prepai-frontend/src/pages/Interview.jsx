
import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Interview() {
  const questionBank = {
    SQL: [
  "What is a primary key?",
  "Difference between WHERE and HAVING?",
  "What is normalization?",
  "Explain JOINs in SQL.",
  "What is an index in SQL?"
],
OS: [
  "What is a process?",
  "Difference between process and thread?",
  "What is deadlock?",
  "Explain CPU scheduling.",
  "What is virtual memory?"
],
CN: [
  "What is TCP/IP?",
  "Difference between TCP and UDP?",
  "What is DNS?",
  "Explain HTTP and HTTPS.",
  "What is an IP address?"
],
    HR: [
      "Tell me about yourself.",
      "What are your strengths?",
      "Why should we hire you?",
      "Explain a challenging project you worked on.",
      "Where do you see yourself in 5 years?"
    ],

    Java: [
      "What is OOP?",
      "Explain inheritance in Java.",
      "Difference between ArrayList and LinkedList?",
      "What is JVM?",
      "Explain exception handling."
    ],

    DSA: [
      "What is a stack?",
      "Difference between stack and queue?",
      "Explain binary search.",
      "What is time complexity?",
      "What is a linked list?"
    ]
  };

  const [category, setCategory] = useState("HR");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = questionBank[category];

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Please enter an answer");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/interview",
        { answer }
      );

      setFeedback(response.data);

      setHistory([
        ...history,
        {
          question: questions[currentQuestion],
          score: response.data.score,
          feedback: response.data.feedback
        }
      ]);
    } catch (error) {
      console.error(error);
      alert("Backend Error");
    }
  };
const downloadReport = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("PrepAI Interview Report", 20, 20);

  doc.setFontSize(12);
  doc.text(`Category: ${category}`, 20, 35);

  const avgScore =
    history.reduce((sum, item) => sum + item.score, 0) /
    history.length;

  doc.text(
    `Average Score: ${avgScore.toFixed(1)}/10`,
    20,
    45
  );

  let y = 60;

  history.forEach((item, index) => {
    doc.text(
      `Question ${index + 1}: ${item.question}`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Score: ${item.score}/10`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Feedback: ${item.feedback}`,
      20,
      y
    );

    y += 15;

    if (y > 260) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("PrepAI_Report.pdf");
};

  if (isCompleted) {
    const avgScore =
  history.reduce((sum, item) => sum + item.score, 0) /
  history.length;

const chartData = {
  labels: history.map(
    (_, index) => `Q${index + 1}`
  ),

  datasets: [
    {
      label: "Score",
      data: history.map((item) => item.score),
      backgroundColor: "#3B82F6",
    },
  ],
};
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-5xl font-bold mb-8">
          Interview Completed 🎉
        </h1>

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-3xl mb-4">
            Average Score: {avgScore.toFixed(1)}/10
          </h2>

          <p className="mb-6">
            Category: {category}
          </p>

          <p className="mb-6">
            Questions Attempted: {history.length}
          </p>
          <button
  onClick={downloadReport}
  className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600 mb-6"
>
  Download PDF Report
</button>
           <div className="bg-slate-800 p-4 rounded-lg mb-6">
  <h3 className="text-xl font-bold mb-4">
    Score Analysis
  </h3>

  <Bar data={chartData} />
</div>
          {history.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 p-4 rounded-lg mb-4"
            >
              <h3 className="font-bold">
                Question {index + 1}
              </h3>

              <p>{item.question}</p>

              <p className="mt-2">
                Score: {item.score}/10
              </p>

              <p className="mt-2">
                {item.feedback}
              </p>
            </div>
          ))}

          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswer("");
              setFeedback(null);
              setHistory([]);
              setIsCompleted(false);
            }}
            className="mt-6 bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Start Again
          </button>
        </div>
      </div>
    );
  }

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Mock Interview
      </h1>

      <div className="bg-slate-900 p-8 rounded-xl">

        <div className="mb-6">
          <label className="block mb-2">
            Select Category
          </label>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentQuestion(0);
              setAnswer("");
              setFeedback(null);
              setHistory([]);
              setIsCompleted(false);
            }}
            className="bg-slate-800 p-3 rounded-lg"
          >
            <option value="HR">HR Interview</option>
<option value="Java">Java Interview</option>
<option value="DSA">DSA Interview</option>
<option value="SQL">SQL Interview</option>
<option value="OS">Operating System</option>
<option value="CN">Computer Networks</option>
          </select>
        </div>

        <div className="mb-6">
          <p className="mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>

          <div className="w-full bg-slate-700 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

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

                if (
                  currentQuestion <
                  questions.length - 1
                ) {
                  setCurrentQuestion(
                    currentQuestion + 1
                  );
                } else {
                  const avgScore =
  history.reduce((sum, item) => sum + item.score, 0) /
  history.length;

const previousHistory =
  JSON.parse(
    localStorage.getItem("interviewHistory")
  ) || [];

previousHistory.push({
  date: new Date().toLocaleString(),
  category,
  avgScore: avgScore.toFixed(1),
});

localStorage.setItem(
  "interviewHistory",
  JSON.stringify(previousHistory)
);

setIsCompleted(true);
                }
              }}
              className="mt-4 bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600"
            >
              {currentQuestion === questions.length - 1
                ? "Finish Interview"
                : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Interview;

