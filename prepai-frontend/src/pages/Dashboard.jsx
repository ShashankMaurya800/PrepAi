import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    bestCategory: "-",
    lastInterview: "-",
  });

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const history =
      JSON.parse(localStorage.getItem("interviewHistory")) || [];

    setChartData({
      labels: history.map((_, index) => `Interview ${index + 1}`),
      datasets: [
        {
          label: "Average Score",
          data: history.map((item) => item.avgScore),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59,130,246,0.3)",
          tension: 0.4,
          fill: true,
        },
      ],
    });

    if (history.length === 0) return;

    const total = history.length;

    const average =
      history.reduce((sum, item) => sum + item.avgScore, 0) / total;

    const categoryCount = {};

    history.forEach((item) => {
      categoryCount[item.category] =
        (categoryCount[item.category] || 0) + 1;
    });

    const bestCategory = Object.keys(categoryCount).reduce((a, b) =>
      categoryCount[a] > categoryCount[b] ? a : b
    );

    const lastInterview = history[history.length - 1].date;

    setStats({
      total,
      average: average.toFixed(1),
      bestCategory,
      lastInterview,
    });
  }, []);

  return (
    <div className="flex bg-slate-950 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10 text-white">
        <TopNavbar />

        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400">
              Total Interviews
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.total}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400">
              Average Score
            </h2>

            <p className="text-4xl font-bold mt-2 text-green-400">
              {stats.average}/10
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400">
              Favourite Category
            </h2>

            <p className="text-3xl font-bold mt-2 text-yellow-400">
              {stats.bestCategory}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400">
              Last Interview
            </h2>

            <p className="text-xl mt-2">
              {stats.lastInterview}
            </p>
          </div>

        </div>

        {/* Performance Chart */}
        <div className="bg-slate-900 rounded-xl p-6 mt-10">
          <h2 className="text-2xl font-bold mb-6">
            📈 Performance Trend
          </h2>

          {chartData ? (
            <Line data={chartData} />
          ) : (
            <p>No interview data available.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-5 mt-10">

          <Link
            to="/interview"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg"
          >
            🎤 Start Interview
          </Link>

          <Link
            to="/history"
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg"
          >
            📜 View History
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;