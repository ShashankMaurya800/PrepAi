import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function History() {
  const [history, setHistory] = useState([]);
  const highestScore =
  history.length > 0
    ? Math.max(...history.map(item => Number(item.avgScore)))
    : 0;

const averageScore =
  history.length > 0
    ? (
        history.reduce(
          (sum, item) => sum + Number(item.avgScore),
          0
        ) / history.length
      ).toFixed(1)
    : 0;


  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("interviewHistory")) || [];

    setHistory(data);
  }, []);
  const clearHistory = () => {

  if (
    !window.confirm(
      "Are you sure you want to delete all interview history?"
    )
  )
    return;

  localStorage.removeItem("interviewHistory");

  setHistory([]);

};

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-3">
          Interview History
        </h1>

        <p className="text-gray-400 mb-8">
          Track your previous interview performance.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-10">

  <div className="bg-slate-900 p-6 rounded-xl shadow-lg">

    <h3 className="text-gray-400">
      Total Interviews
    </h3>

    <p className="text-4xl font-bold mt-2">
      {history.length}
    </p>

  </div>

  <div className="bg-slate-900 p-6 rounded-xl shadow-lg">

    <h3 className="text-gray-400">
      Highest Score
    </h3>

    <p className="text-4xl font-bold text-green-400 mt-2">
      {highestScore}/10
    </p>

  </div>

  <div className="bg-slate-900 p-6 rounded-xl shadow-lg">

    <h3 className="text-gray-400">
      Average Score
    </h3>

    <p className="text-4xl font-bold text-blue-400 mt-2">
      {averageScore}/10
    </p>

  </div>

</div>

        {history.length === 0 ? (
          <div className="bg-slate-900 rounded-xl p-10 text-center">

            <h2 className="text-3xl mb-4">
              📭 No History Found
            </h2>

            <p className="text-gray-400">
              Complete your first interview to see your results here.
            </p>

          </div>
       ) : (
  <>

    <div className="grid gap-6">

      {history.map((item, index) => (
        <div
          key={index}
          className="bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition"
        >
          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-bold">
              Interview #{index + 1}
            </h2>

            <span
              className={`px-4 py-2 rounded-lg font-bold ${
                Number(item.avgScore) >= 8
                  ? "bg-green-600"
                  : Number(item.avgScore) >= 6
                  ? "bg-yellow-600"
                  : "bg-red-600"
              }`}
            >
              {item.avgScore}/10
            </span>

          </div>

          <div className="mt-5 space-y-2">

            <p>📅 <strong>Date:</strong> {item.date}</p>

            <p>💼 <strong>Category:</strong> {item.category}</p>

            <p>⭐ <strong>Average Score:</strong> {item.avgScore}/10</p>

          </div>

        </div>
      ))}

    </div>

    <div className="flex justify-center mt-10">

      <button
        onClick={clearHistory}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
      >
        🗑 Clear History
      </button>

    </div>

  </>
)}

      </div>

    </div>
  );
}

export default History;