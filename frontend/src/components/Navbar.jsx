import { Link, Outlet } from "react-router-dom"; // if you're using React Router
import logo from "/LogoRB.png";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="sticky w-full shadow-md px-6 py-4 flex items-center justify-between no-print bg-gradient-to-br from-red-200 to-sky-500">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto mr-2" />
          {/* <span className="text-xl font-bold text-gray-800">StockMate</span> */}
        </div>

        {/* Right: Links */}
        <div className="hidden md:flex gap-6">
          <Link
            to="/dashboard"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/additem"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Add Stock
          </Link>
          <Link
            to="/getitems"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Stock List
          </Link>
          <Link
            to="/reports"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Reports
          </Link>
          <Link
            to="/settings"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Settings
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
