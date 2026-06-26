import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <div>
        <h1 className="text-2xl font-bold text-blue-400">
          PrepAI
        </h1>
      </div>

      <div className="flex gap-6 items-center">

        <Link to="/dashboard" className="hover:text-blue-400">
          Dashboard
        </Link>

        <Link to="/interview" className="hover:text-blue-400">
          Interview
        </Link>

        <Link to="/history" className="hover:text-blue-400">
          History
        </Link>

      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-gray-400">
            {user?.email}
          </p>
        </div>

        <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;