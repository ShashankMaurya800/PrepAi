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
        <section className="mt-28">

  <h2 className="text-4xl font-bold text-center mb-12">
    Why Choose PrepAI?
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="bg-slate-800 p-8 rounded-xl hover:scale-105 transition duration-300 shadow-lg">
      <div className="text-5xl mb-4">🎯</div>
      <h3 className="text-2xl font-bold mb-3">
        Mock Interviews
      </h3>
      <p className="text-gray-300">
        Practice HR, Java, SQL, Aptitude and DSA interviews with realistic questions.
      </p>
    </div>

    <div className="bg-slate-800 p-8 rounded-xl hover:scale-105 transition duration-300 shadow-lg">
      <div className="text-5xl mb-4">📊</div>
      <h3 className="text-2xl font-bold mb-3">
        Instant Feedback
      </h3>
      <p className="text-gray-300">
        Receive scores and feedback after every answer to improve continuously.
      </p>
    </div>

    <div className="bg-slate-800 p-8 rounded-xl hover:scale-105 transition duration-300 shadow-lg">
      <div className="text-5xl mb-4">📄</div>
      <h3 className="text-2xl font-bold mb-3">
        Performance Reports
      </h3>
      <p className="text-gray-300">
        Download a complete interview report with scores, feedback and recommendations.
      </p>
    </div>

  </div>

</section>
<section className="mt-28">

  <h2 className="text-4xl font-bold text-center mb-12">
    Features
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-2">🎓 Multiple Categories</h3>
      <p className="text-gray-300">
        Practice HR, Java, SQL, DSA and Aptitude interviews.
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-2">⏳ 30 Second Timer</h3>
      <p className="text-gray-300">
        Improve speed and confidence with timed interview sessions.
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-2">🎤 Voice Answer</h3>
      <p className="text-gray-300">
        Answer interview questions using speech recognition.
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-2">📊 Instant Scoring</h3>
      <p className="text-gray-300">
        Receive immediate scores and feedback after every answer.
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-2">📄 PDF Report</h3>
      <p className="text-gray-300">
        Download your complete interview performance report.
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-2">📈 Performance History</h3>
      <p className="text-gray-300">
        Track your interview progress over multiple practice sessions.
      </p>
    </div>

  </div>

</section>

      </section>
    <footer className="mt-24 bg-slate-900 border-t border-slate-700">

  <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">

    {/* Brand */}

    <div>

      <h2 className="text-3xl font-bold text-blue-400 mb-4">
        PrepAI
      </h2>

      <p className="text-gray-400 leading-7">
        Practice smarter. Crack interviews with confidence.
        PrepAI helps students prepare for technical and HR
        interviews through realistic mock interview sessions.
      </p>

    </div>

    {/* Quick Links */}

    <div>

      <h3 className="text-xl font-semibold mb-4">
        Quick Links
      </h3>

      <ul className="space-y-3 text-gray-400">

        <li>
          <a href="/" className="hover:text-blue-400">
            Home
          </a>
        </li>

        <li>
          <a href="/interview" className="hover:text-blue-400">
            Interview
          </a>
        </li>

        <li>
          <a href="/history" className="hover:text-blue-400">
            History
          </a>
        </li>

      </ul>

    </div>

    {/* Contact */}

    <div>

      <h3 className="text-xl font-semibold mb-4">
        Project Info
      </h3>

      <ul className="space-y-3 text-gray-400">

        <li>🎓 Final Year Project</li>

        <li>💻 React + Node.js + MongoDB</li>

        <li>🚀 Built for Placement Preparation</li>

      </ul>

    </div>

  </div>

  <div className="border-t border-slate-700 py-5">

    <p className="text-center text-gray-500">
      © 2026 PrepAI. All Rights Reserved.
    </p>

  </div>

</footer>
    </div>
  );
}

export default Home;