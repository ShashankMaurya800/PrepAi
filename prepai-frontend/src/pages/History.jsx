import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("interviewHistory")) || [];

    setHistory(data);
  }, []);

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

                  <span className="bg-blue-600 px-4 py-2 rounded-lg">
                    {item.avgScore}/10
                  </span>

                </div>

                <div className="mt-5 space-y-2">

                  <p>
                    📅 <strong>Date:</strong> {item.date}
                  </p>

                  <p>
                    💼 <strong>Category:</strong> {item.category}
                  </p>

                  <p>
                    ⭐ <strong>Average Score:</strong> {item.avgScore}/10
                  </p>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default History;