function TopNavbar() {
const userData = localStorage.getItem("user");

const user =
  userData && userData !== "undefined"
    ? JSON.parse(userData)
    : null;
  return (
    <div className="bg-slate-900 h-20 flex justify-between items-center px-8 border-b border-slate-800">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back 👋
        </h1>

        <p className="text-slate-400">
          {user?.name || "User"}
        </p>
      </div>

      <div className="flex items-center gap-5">

        <button className="text-white text-xl">
          🔔
        </button>

        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

      </div>

    </div>
  );
}

export default TopNavbar;