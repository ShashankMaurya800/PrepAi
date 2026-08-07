import questionBank from "../data/questionBank";
import { useState, useEffect } from "react";
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
import { getRandomQuestions } from "../utils/questionUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Interview() {
  
  
  // ======================
// STATES
// ======================

const [category, setCategory] = useState("HR");

const [questions, setQuestions] = useState([]);

const [currentQuestion, setCurrentQuestion] = useState(0);

const [answer, setAnswer] = useState("");

const [feedback, setFeedback] = useState(null);

const [history, setHistory] = useState([]);

const [isCompleted, setIsCompleted] = useState(false);

const [loading, setLoading] = useState(false);

const [timeLeft, setTimeLeft] = useState(30);

const [listening, setListening] = useState(false);

const currentQuestionText =
  questions[currentQuestion] || "";

useEffect(() => {
  const selectedQuestions = getRandomQuestions(
    questionBank[category],
    5
  );

  setQuestions(selectedQuestions);
  setCurrentQuestion(0);
  setAnswer("");
  setFeedback(null);
  setHistory([]);
  setIsCompleted(false);
  setTimeLeft(30);

}, [category]);

useEffect(() => {
  setTimeLeft(30);

  if (isCompleted) return;
  if (questions.length === 0) return;

  const timer = setInterval(() => {

    setTimeLeft(prev => {

      if (prev <= 1) {

        clearInterval(timer);

        if (currentQuestion < questions.length - 1) {

          setCurrentQuestion(prev => prev + 1);

          setAnswer("");

          setFeedback(null);

          return 30;
        }

        setIsCompleted(true);

        return 30;
      }

      return prev - 1;

    });

  },1000);

  return () => clearInterval(timer);

}, [currentQuestion, questions, isCompleted]);
  const startListening = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    alert("Speech Recognition is not supported.");

    return;

  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.continuous = false;

  recognition.start();

  setListening(true);

  recognition.onresult = (event) => {

    setAnswer(event.results[0][0].transcript);

    setListening(false);

  };

  recognition.onerror = () => {

    setListening(false);

  };

};
  
  const handleSubmit = async () => {
  if (!answer.trim()) {
    alert("Please enter an answer");
    return;
  }

  try {
    setLoading(true);
    const res = await axios.post(
  "https://prepai-e04a.onrender.com/api/ai/evaluate",
      {
        question: questions[currentQuestion],
        answer: answer,
      }
    );

    setFeedback(res.data);

setHistory((prev) => [
  ...prev,
  {
    question: questions[currentQuestion],
    score: res.data.score,
    feedback: res.data.feedback,
  },
]);
    setLoading(false);

  } catch (error) {
    setLoading(false);
    console.error(error);
    alert("Backend Error");
  }
};
const downloadReport = () => {
  const doc = new jsPDF();

  const avgScore =
    history.reduce((sum, item) => sum + item.score, 0) /
    history.length;

  // ===== Title =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("PrepAI Interview Report", 105, 20, { align: "center" });

  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);

  // ===== Basic Details =====
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`Category : ${category}`, 20, 40);
  doc.text(`Date : ${new Date().toLocaleString()}`, 20, 50);
  doc.text(`Questions Attempted : ${history.length}`, 20, 60);
  doc.text(`Average Score : ${avgScore.toFixed(1)} / 10`, 20, 70);

  // ===== Performance =====
  let performance = "";

  if (avgScore >= 9)
    performance = "Outstanding ⭐⭐⭐⭐⭐";
  else if (avgScore >= 8)
    performance = "Excellent ⭐⭐⭐⭐";
  else if (avgScore >= 7)
    performance = "Good ⭐⭐⭐";
  else if (avgScore >= 5)
    performance = "Average ⭐⭐";
  else
    performance = "Needs Improvement ⭐";

  doc.setFont("helvetica", "bold");
  doc.text(`Overall Performance : ${performance}`, 20, 85);

  let y = 100;

  // ===== Questions =====
  history.forEach((item, index) => {

    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");

    doc.text(`Question ${index + 1}`, 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");

    doc.text(doc.splitTextToSize(item.question, 165), 20, y);

    y += 12;

    doc.text(`Score : ${item.score}/10`, 20, y);

    y += 8;

    doc.text(
      doc.splitTextToSize(
        `Feedback : ${item.feedback}`,
        165
      ),
      20,
      y
    );

    y += 18;

    doc.line(20, y - 5, 190, y - 5);

  });

  // ===== Suggestions =====

  if (y > 220) {
    doc.addPage();
    y = 20;
  }

  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Suggestions", 20, y);

  y += 10;

  doc.setFont("helvetica", "normal");

  doc.text("• Continue practicing regularly.", 25, y);

  y += 8;

  doc.text("• Improve weak technical concepts.", 25, y);

  y += 8;

  doc.text("• Work on communication skills.", 25, y);

  y += 8;

  doc.text("• Revise important interview topics.", 25, y);

  // ===== Footer =====

  doc.setFont("helvetica", "italic");

  doc.text(
    "Generated by PrepAI",
    105,
    285,
    { align: "center" }
  );

  doc.save("PrepAI_Report.pdf");
};

  if (isCompleted) {
    const avgScore =
  history.reduce((sum, item) => sum + item.score, 0) /
  history.length;

  let performance = "";
let performanceColor = "";

if (avgScore >= 9) {
  performance = "⭐⭐⭐⭐⭐ Outstanding";
  performanceColor = "text-green-400";
} else if (avgScore >= 8) {
  performance = "⭐⭐⭐⭐ Excellent";
  performanceColor = "text-green-300";
} else if (avgScore >= 7) {
  performance = "⭐⭐⭐ Good";
  performanceColor = "text-yellow-300";
} else if (avgScore >= 5) {
  performance = "⭐⭐ Average";
  performanceColor = "text-orange-300";
} else {
  performance = "⭐ Needs Improvement";
  performanceColor = "text-red-400";
}

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
        <h1 className="text-xl font-bold mb-8">
          <div className="text-center">

  <h1 className="text-5xl font-bold mb-6">
    🎉 Interview Completed
  </h1>

  <h2 className="text-3xl mb-4">
    Average Score
  </h2>

  <p className="text-7xl font-bold text-blue-400">
    {avgScore.toFixed(1)}/10
  </p>

  <p className={`text-3xl mt-5 font-bold ${performanceColor}`}>
    {performance}
  </p>

  {/* Add this badge */}
  <div
    className={`inline-block mt-5 px-6 py-2 rounded-full font-semibold ${
      avgScore >= 8
        ? "bg-green-500/20 text-green-300"
        : avgScore >= 6
        ? "bg-yellow-500/20 text-yellow-300"
        : "bg-red-500/20 text-red-300"
    }`}
  >
    Performance Rating
  </div>

</div>
<div className="bg-slate-800 rounded-xl p-8 mt-8 shadow-lg">

  <h2 className="text-2xl font-bold mb-4">
    📊 Interview Summary
  </h2>

  <p className="mb-3">
    Category :
    <span className="font-bold text-blue-400">
      {" "}
      {category}
    </span>
  </p>

  <p className="mb-3">
    Questions Attempted :
    <span className="font-bold">
      {" "}
      {history.length}
    </span>
  </p>

  <p>
    Date :
    <span className="font-bold">
      {" "}
      {new Date().toLocaleDateString()}
    </span>
  </p>

</div>
<div className="bg-slate-800 rounded-xl p-8 mt-8 shadow-lg">

  <h2 className="text-2xl font-bold mb-5">
    💡 Recommendations
  </h2>

  {avgScore >= 8 ? (

    <ul className="space-y-2">

      <li>✅ Excellent technical knowledge.</li>

      <li>✅ Keep practicing mock interviews.</li>

      <li>✅ Maintain your confidence.</li>

    </ul>

  ) : avgScore >= 6 ? (

    <ul className="space-y-2">

      <li>📘 Revise core concepts.</li>

      <li>🎯 Practice coding questions.</li>

      <li>🗣 Improve communication skills.</li>

    </ul>

  ) : (

    <ul className="space-y-2">

      <li>📖 Revise technical subjects.</li>

      <li>💻 Solve coding problems daily.</li>

      <li>🎤 Practice HR interview questions.</li>

    </ul>

  )}

</div>
        </h1>

        <div className="bg-slate-900 p-8 rounded-xl">
          <div className="grid md:grid-cols-4 gap-5 mb-8">

  <div className="bg-slate-800 rounded-xl p-8 mt-8 shadow-lg">
    <p className="text-gray-400">
      Average Score
    </p>

    <h2 className="text-4xl font-bold text-green-400 mt-2">
      {avgScore.toFixed(1)}/10
    </h2>
  </div>

  <div className="bg-slate-800 rounded-xl p-8 mt-8 shadow-lg">
    <p className="text-gray-400">
      Category
    </p>

    <h2 className="text-3xl font-bold mt-2">
      {category}
    </h2>
  </div>

  <div className="bg-slate-800 rounded-xl p-8 mt-8 shadow-lg">
    <p className="text-gray-400">
      Questions
    </p>

    <h2 className="text-3xl font-bold mt-2">
      {history.length}
    </h2>
  </div>

  <div className="bg-slate-800 rounded-xl p-8 mt-8 shadow-lg">

    <p className="text-gray-400">
      Performance
    </p>

    <h2
      className={`text-2xl font-bold mt-2 ${
        avgScore >= 8
          ? "text-green-400"
          : avgScore >= 6
          ? "text-yellow-400"
          : "text-red-400"
      }`}
    >
      {avgScore >= 8
        ? "Excellent ⭐"
        : avgScore >= 6
        ? "Good 👍"
        : "Needs Practice 📚"}
    </h2>

  </div>

</div>

<div className="flex justify-between items-center mb-8">

  <div>

    <h3 className="text-2xl font-bold">
      Interview Summary
    </h3>

    <p className="text-gray-400 mt-2">
      Great job completing your interview.
      Review your feedback below and
      keep improving.
    </p>

  </div>
  <div className="bg-slate-800 rounded-xl p-8 mt-8 shadow-lg">

  <h2 className="text-2xl font-bold mb-6">
    📊 Score Breakdown
  </h2>

  <table className="w-full text-left">

    <thead>

      <tr className="border-b border-slate-600">

        <th className="py-3">Question</th>

        <th className="py-3">Score</th>

      </tr>

    </thead>

    <tbody>

      {history.map((item, index) => (

        <tr
          key={index}
          className="border-b border-slate-700"
        >

          <td className="py-3">
            Question {index + 1}
          </td>

          <td
            className={`py-3 font-bold ${
              item.score >= 8
                ? "text-green-400"
                : item.score >= 6
                ? "text-yellow-300"
                : "text-red-400"
            }`}
          >
            {item.score}/10
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

  <button
    onClick={downloadReport}
    className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg"
  >
    📄 Download Report
  </button>

</div>
<div className="bg-slate-800 rounded-xl p-8 mt-8 shadow-lg">

  <h2 className="text-2xl font-bold mb-4">
    💡 AI Recommendation
  </h2>

  <ul className="space-y-2 text-gray-300">

    <li>• Give more detailed explanations.</li>

    <li>• Mention real project examples.</li>

    <li>• Explain your thought process clearly.</li>

    <li>• Practice speaking confidently.</li>

  </ul>

</div>

          {history.map((item, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl mb-4 border-l-4 ${
  item.score >= 8
    ? "border-green-500 bg-slate-800"
    : item.score >= 6
    ? "border-yellow-500 bg-slate-800"
    : "border-red-500 bg-slate-800"
}`}
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
              const shuffled = [...questionBank[category]]
  .sort(() => Math.random() - 0.5);

const selected = shuffled.slice(0, 5);

setQuestions(selected);
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
      <h1 className="text-xl font-bold mb-10">
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
  const shuffled = [...questionBank[category]]
  .sort(() => Math.random() - 0.5);

const selected = shuffled.slice(0, 5);

setQuestions(selected);

  setAnswer("");

  setFeedback(null);

  setHistory([]);

  setIsCompleted(false);

setCurrentQuestion(currentQuestion + 1);
setAnswer("");
setFeedback(null);
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

        <div className="flex justify-between mb-5">

  <p className="text-lg">
    ⏳ Time Left
  </p>

  <p className="text-xl font-bold text-red-400">
    {timeLeft}s
  </p>

</div>
        <h2 className="text-3xl mb-6">
  {currentQuestionText}
</h2>

        <textarea
          rows="8"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full bg-slate-800 rounded-lg p-4"
        />
        <button
  onClick={startListening}
  className="mt-4 bg-purple-600 px-5 py-3 rounded-lg hover:bg-purple-700"
>
  {listening ? "🎤 Listening..." : "🎤 Speak Answer"}
</button>

        <button
  onClick={handleSubmit}
  disabled={loading}
  className={`mt-6 px-6 py-3 rounded-lg text-white font-semibold transition ${
    loading
      ? "bg-gray-600 cursor-not-allowed"
      : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  {loading ? "Evaluating..." : "Submit Answer"}
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
  const next = currentQuestion + 1;

setCurrentQuestion(next);
  setAnswer("");

  setFeedback(null);

setCurrentQuestion(currentQuestion + 1);
setAnswer("");
setFeedback(null);
}
                else {
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

