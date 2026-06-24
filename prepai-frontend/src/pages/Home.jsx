import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-slate-800">

        <h1 className="text-2xl font-bold text-blue-400">
          PrepAI
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Register
          </Link>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-32 px-6">

        <h1 className="text-6xl font-bold mb-6">
          Crack Interviews with AI
        </h1>

        <p className="text-slate-400 text-xl max-w-2xl mb-8">
          Practice interviews, receive AI feedback, improve weak areas,
          and prepare for placements smarter.
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600"
          >
            Start Practicing
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 border border-slate-700 rounded-xl hover:bg-slate-800"
          >
            Login
          </Link>
        </div>

      </section>

    </div>
  );
}

export default Home;