import React, { useState } from "react";
import logo from "/logo2.png";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  let [form, setForm] = useState({ email: "", password: "" });
  let navigateToDashboard = useNavigate();

  let handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users/login", form);
      navigateToDashboard("/dashboard");
      alert("Login Successfully");
    } catch (err) {
      alert(err?.response?.error || "Invalid Credential");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-red-200 via-sky-100 to-sky-400 flex items-center justify-center px-4">
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 items-center w-full max-w-5xl bg-white/30 backdrop-blur-lg py-10 rounded-3xl shadow-2xl min-h-[20%]">
        {/* Welcome Section */}
        <div className="text-center lg:text-left space-y-6 p-4">
          <h1 className="text-4xl font-extrabold text-purple-800 drop-shadow-lg">
            🚀 Welcome to Balanzia
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Manage your business with ease. Please login to continue.
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="w-[100%] max-w-md space-y-6 p-8 rounded-2xl "
        >
          {/* <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">
            Login to Your Account
          </h2> */}

          {/* Email Input */}
          <div>
            {/* <label className="block text-gray-800 font-semibold mb-1">
              Email
            </label> */}
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            {/* <label className="block text-gray-800 font-semibold mb-1">
              Password
            </label> */}
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full bg-white px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-sky-500 hover:from-blue-800 hover:to-sky-600 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
