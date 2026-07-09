import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-blue-600 text-white px-4 py-2 rounded-lg transition"
      : "px-4 py-2 rounded-lg hover:bg-slate-700 transition";

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700 shadow-lg px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold text-blue-400">
          🤖 PrepAI
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-4 items-center">

        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/interview" className={navLinkClass}>
          Interview
        </NavLink>

        <NavLink to="/history" className={navLinkClass}>
          History
        </NavLink>

      </div>

      {/* User Info */}
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
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;