import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
  "https://prepai-e04a.onrender.com/api/auth/login",
  form
);

      // Save JWT Token
      localStorage.setItem("token", res.data.token);

      // Save User Details
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message || "Login Failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-8 rounded-xl w-96">

        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-gray-400 mt-5 text-center">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-400 ml-2"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;