import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 p-6">

      <h1 className="text-3xl font-bold text-white mb-10">
        PrepAI
      </h1>

      <div className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="text-white hover:bg-slate-700 p-3 rounded-lg"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/interview"
          className="text-white hover:bg-slate-700 p-3 rounded-lg"
        >
          🎤 Interview
        </Link>

        <Link
          to="/history"
          className="text-white hover:bg-slate-700 p-3 rounded-lg"
        >
          📜 History
        </Link>

        <Link
          to="/profile"
          className="text-white hover:bg-slate-700 p-3 rounded-lg"
        >
          👤 Profile
        </Link>

        <button
          onClick={logout}
          className="text-left text-red-400 hover:bg-red-500 hover:text-white p-3 rounded-lg"
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;