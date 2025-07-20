import React from "react";
import { useNavigate } from "react-router-dom";
import "./FirstPage.css";

function FirstPage() {
  const navigate = useNavigate();

  const navigateToAdmin = () => {
    navigate("/loginadmin");
  };

  const navigateToUser = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 min-h-screen flex flex-col items-center justify-center text-gray-800 px-4">
      <header className="mb-12 text-center animate-fade-in">
        <h1 className="text-5xl font-extrabold mb-3 text-purple-700 drop-shadow-lg">
          🚀 Welcome to Balanzia
        </h1>
        <p className="text-lg text-gray-600">
          Please choose your role to get started
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-slow">
        {/* Admin Card */}
        <div
          onClick={navigateToAdmin}
          className="cursor-pointer bg-white border border-purple-200 rounded-2xl shadow-lg p-10 transition transform hover:scale-105 hover:shadow-2xl hover:bg-purple-50 hover:border-purple-400"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-purple-600 text-3xl">🛠️</span>
            <h2 className="text-2xl font-semibold">Admin</h2>
          </div>
          <p className="text-gray-600">
            Manage users, view system analytics, and configure application
            settings.
          </p>
        </div>

        {/* User Card */}
        <div
          onClick={navigateToUser}
          className="cursor-pointer bg-white border border-green-200 rounded-2xl shadow-lg p-10 transition transform hover:scale-105 hover:shadow-2xl hover:bg-green-50 hover:border-green-400"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-600 text-3xl">👤</span>
            <h2 className="text-2xl font-semibold">User</h2>
          </div>
          <p className="text-gray-600">
            Access your dashboard, update your profile, and explore the
            features.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-500 animate-fade-in-slow">
        &copy; 2025 MyApp. All rights reserved.
      </footer>
    </div>
  );
}

export default FirstPage;
