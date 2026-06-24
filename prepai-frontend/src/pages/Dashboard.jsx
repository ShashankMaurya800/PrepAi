import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2>Total Interviews</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2>Average Score</h2>
          <p className="text-3xl font-bold">0%</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2>Weak Areas</h2>
          <p className="text-3xl font-bold">-</p>
        </div>

      </div>
      <Link
  to="/interview"
  className="inline-block mt-8 bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600"
>
  Start Interview
</Link>

    </div>
  );
}

export default Dashboard;