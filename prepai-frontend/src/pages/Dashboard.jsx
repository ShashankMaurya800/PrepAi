import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <Navbar />

      <div className="p-10">

        <h1 className="text-4xl font-bold">
          Welcome, {user?.name} 👋
        </h1>

        <p className="text-gray-400 mt-2 mb-10">
          Ready for today's interview practice?
        </p>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400">
              Total Interviews
            </h2>

            <p className="text-4xl font-bold mt-3">
              0
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400">
              Average Score
            </h2>

            <p className="text-4xl font-bold mt-3 text-green-400">
              0%
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400">
              Best Score
            </h2>

            <p className="text-4xl font-bold mt-3 text-yellow-400">
              0
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400">
              Weak Area
            </h2>

            <p className="text-2xl font-bold mt-3 text-red-400">
              -
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="flex gap-5 flex-wrap">

            <Link
              to="/interview"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
            >
              🎤 Start Interview
            </Link>

            <Link
              to="/history"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
            >
              📜 View History
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;