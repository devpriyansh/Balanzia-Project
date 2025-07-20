import React from "react";
import { href, NavLink } from "react-router-dom";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Footer from "./Footer";

const data = [
  { name: "Mon", stock: 40 },
  { name: "Tue", stock: 65 },
  { name: "Wed", stock: 35 },
  { name: "Thu", stock: 80 },
  { name: "Fri", stock: 55 },
  { name: "Sat", stock: 70 },
  { name: "Sun", stock: 50 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 to-sky-500 p-4">
      {/* Header */}
      <div className="mb-10 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
            <span className="text-purple-600">📊</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Dashboard
            </span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back! Here's your stock summary.
          </p>
        </div>

        <div className="hidden md:block text-right">
          <p className="text-xs text-gray-500">Today</p>
          <p className="text-base font-medium text-gray-700">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Cards Section */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8 ">
        {[
          {
            label: "Add Stock",
            icon: "➕",
            to: "/additem",
          },

          { label: "Billing", icon: "💰", to: "/billgenerate" },
          { label: "Customers", icon: "👤", to: "/customerlist" },
          {
            label: "Add Customer Payment",
            icon: "💵",
            to: "/addcustomerpayment",
          },
          { label: "Suppliers", icon: "🏭", to: "/supplierlist" },
          {
            label: "Add Supplier Payment",
            icon: "💵",
            to: "/addsupplierpayment",
          },
        ].map(({ label, icon, to }) => (
          <NavLink
            to={to}
            key={label}
            className="bg-white hover:shadow-xl transition rounded-xl p-5 flex flex-col items-start gap-2 border border-gray-200"
          >
            <span className="text-3xl">{icon}</span>
            <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
            
          </NavLink>
        ))}
      </div> */}

      <div className="grid grid-cols-3 gap-3">
        <div className="mb-8">
          {/* <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-xl">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
          </div> */}
          <div className="grid grid-rows-2 sm:grid-rows-2 lg:grid-rows-2 gap-6">
            {[
              {
                label: "Add Stock",
                icon: "➕",
                to: "/additem",
                gradient: "from-emerald-400 to-cyan-400",
                iconBg: "bg-emerald-100",
              },
              {
                label: "Billing",
                icon: "💰",
                to: "/billgenerate",
                gradient: "from-amber-400 to-orange-400",
                iconBg: "bg-amber-100",
              },
            ].map(({ label, icon, to, gradient, iconBg }) => (
              <NavLink
                to={to}
                key={label}
                className={`group relative bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:scale-90 transition-all duration-300 rounded-2xl p-4 flex items-center gap-6 border border-white/30 overflow-hidden cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className={`${iconBg} p-3 rounded-2xl shadow-lg`}>
                  <span className="text-3xl">{icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-7 00 group-hover:text-gray-800 transition-colors">
                    {label}
                  </h3>
                  {/* <p className="text-gray-600 mt-1">
                    Manage your {label.toLowerCase()}
                  </p> */}
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Customer Management */}
        <div className="mb-8">
          {/* <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              Customer Management
            </h2>
          </div> */}
          <div className="grid grid-rows-2 sm:grid-rows-2 lg:grid-rows-2 gap-6">
            {[
              {
                label: "Customers",
                icon: "👤",
                to: "/customerlist",
                gradient: "from-blue-400 to-indigo-400",
                iconBg: "bg-blue-100",
              },
              {
                label: "Make Customer Payment",
                icon: "💵",
                to: "/addcustomerpayment",
                gradient: "from-purple-400 to-pink-400",
                iconBg: "bg-purple-100",
              },
            ].map(({ label, icon, to, gradient, iconBg }) => (
              <NavLink
                to={to}
                key={label}
                className={`group relative bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:scale-90 transition-all duration-300 rounded-2xl p-4 flex items-center gap-6 border border-white/30 overflow-hidden cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className={`${iconBg} p-3 rounded-2xl shadow-lg`}>
                  <span className="text-3xl">{icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-700 group-hover:text-gray-800 transition-colors">
                    {label}
                  </h3>
                  {/* <p className="text-gray-600 mt-1">
                    Manage your {label.toLowerCase()}
                  </p> */}
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Supplier Management */}
        <div className="mb-8">
          {/* <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              Supplier Management
            </h2>
          </div> */}
          <div className="grid grid-rows-2 sm:grid-rows-2 lg:grid-rows-2 gap-6">
            {[
              {
                label: "Suppliers",
                icon: "🏭",
                to: "/supplierlist",
                gradient: "from-orange-400 to-red-400",
                iconBg: "bg-orange-100",
              },
              {
                label: "Make Supplier Payment",
                icon: "💵",
                to: "/addsupplierpayment",
                gradient: "from-red-400 to-pink-400",
                iconBg: "bg-red-100",
              },
            ].map(({ label, icon, to, gradient, iconBg }) => (
              <NavLink
                to={to}
                key={label}
                className={`group relative bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:scale-90 transition-all duration-300 rounded-2xl p-4 flex items-center gap-6 border border-white/30 overflow-hidden cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className={`${iconBg} p-3 rounded-2xl shadow-lg`}>
                  <span className="text-3xl">{icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-700 group-hover:text-gray-800 transition-colors">
                    {label}
                  </h3>
                  {/* <p className="text-gray-600 mt-1">
                    Manage your {label.toLowerCase()}
                  </p> */}
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          📈 Weekly Stock Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="stock"
              stroke="#6366F1"
              strokeWidth={3}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

//---------------------------
// import React from "react";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "Mon", stock: 40 },
//   { name: "Tue", stock: 65 },
//   { name: "Wed", stock: 35 },
//   { name: "Thu", stock: 80 },
//   { name: "Fri", stock: 55 },
//   { name: "Sat", stock: 70 },
//   { name: "Sun", stock: 50 },
// ];

// const Dashboard = () => {
//   // For demo purposes, using anchor tags instead of NavLink
//   const NavLink = ({ to, children, ...props }) => (
//     <a href={to} {...props} onClick={(e) => e.preventDefault()}>
//       {children}
//     </a>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
//       {/* Header */}
//       <div className="mb-8 bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 flex items-center justify-between">
//         <div>
//           <h1 className="text-5xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
//             <span className="text-4xl">📊</span>
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
//               Dashboard
//             </span>
//           </h1>
//           <p className="text-gray-600 mt-2 text-lg">
//             Welcome back! Here's your stock summary.
//           </p>
//         </div>
//         <div className="hidden md:block text-right bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl shadow-lg">
//           <p className="text-sm opacity-90">Today</p>
//           <p className="text-lg font-semibold">
//             {new Date().toLocaleDateString("en-IN", {
//               weekday: "short",
//               day: "2-digit",
//               month: "short",
//               year: "numeric",
//             })}
//           </p>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="mb-8">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
//           <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//           {[
//             {
//               label: "Add Stock",
//               icon: "➕",
//               to: "/additem",
//               gradient: "from-emerald-400 to-cyan-400",
//               iconBg: "bg-emerald-100",
//             },
//             {
//               label: "Billing",
//               icon: "💰",
//               to: "/billgenerate",
//               gradient: "from-amber-400 to-orange-400",
//               iconBg: "bg-amber-100",
//             },
//           ].map(({ label, icon, to, gradient, iconBg }) => (
//             <NavLink
//               to={to}
//               key={label}
//               className={`group relative bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 flex items-center gap-6 border border-white/30 overflow-hidden cursor-pointer`}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
//               <div className={`${iconBg} p-4 rounded-2xl shadow-lg`}>
//                 <span className="text-3xl">{icon}</span>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
//                   {label}
//                 </h3>
//                 <p className="text-gray-600 mt-1">
//                   Manage your {label.toLowerCase()}
//                 </p>
//               </div>
//               <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
//                 <svg
//                   className="w-6 h-6 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </div>
//             </NavLink>
//           ))}
//         </div>
//       </div>

// {/* Customer Management */}
// <div className="mb-8">
//   <div className="flex items-center gap-3 mb-6">
//     <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full"></div>
//     <h2 className="text-2xl font-bold text-gray-800">
//       Customer Management
//     </h2>
//   </div>
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//     {[
//       {
//         label: "Customers",
//         icon: "👤",
//         to: "/customerlist",
//         gradient: "from-blue-400 to-indigo-400",
//         iconBg: "bg-blue-100",
//       },
//       {
//         label: "Add Customer Payment",
//         icon: "💵",
//         to: "/addcustomerpayment",
//         gradient: "from-purple-400 to-pink-400",
//         iconBg: "bg-purple-100",
//       },
//     ].map(({ label, icon, to, gradient, iconBg }) => (
//       <NavLink
//         to={to}
//         key={label}
//         className={`group relative bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 flex items-center gap-6 border border-white/30 overflow-hidden cursor-pointer`}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
//         <div className={`${iconBg} p-4 rounded-2xl shadow-lg`}>
//           <span className="text-3xl">{icon}</span>
//         </div>
//         <div>
//           <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
//             {label}
//           </h3>
//           <p className="text-gray-600 mt-1">
//             Manage your {label.toLowerCase()}
//           </p>
//         </div>
//         <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
//           <svg
//             className="w-6 h-6 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </div>
//       </NavLink>
//     ))}
//   </div>
// </div>

// {/* Supplier Management */}
// <div className="mb-8">
//   <div className="flex items-center gap-3 mb-6">
//     <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
//     <h2 className="text-2xl font-bold text-gray-800">
//       Supplier Management
//     </h2>
//   </div>
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//     {[
//       {
//         label: "Suppliers",
//         icon: "🏭",
//         to: "/supplierlist",
//         gradient: "from-orange-400 to-red-400",
//         iconBg: "bg-orange-100",
//       },
//       {
//         label: "Add Supplier Payment",
//         icon: "💵",
//         to: "/addsupplierpayment",
//         gradient: "from-red-400 to-pink-400",
//         iconBg: "bg-red-100",
//       },
//     ].map(({ label, icon, to, gradient, iconBg }) => (
//       <NavLink
//         to={to}
//         key={label}
//         className={`group relative bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 flex items-center gap-6 border border-white/30 overflow-hidden cursor-pointer`}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
//         <div className={`${iconBg} p-4 rounded-2xl shadow-lg`}>
//           <span className="text-3xl">{icon}</span>
//         </div>
//         <div>
//           <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
//             {label}
//           </h3>
//           <p className="text-gray-600 mt-1">
//             Manage your {label.toLowerCase()}
//           </p>
//         </div>
//         <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
//           <svg
//             className="w-6 h-6 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </div>
//       </NavLink>
//     ))}
//   </div>
// </div>

//       {/* Graph Section */}
//       <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/30">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-teal-600 rounded-full"></div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             Weekly Stock Overview
//           </h2>
//           <span className="text-2xl ml-2">📈</span>
//         </div>
//         <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
//           <ResponsiveContainer width="100%" height={350}>
//             <LineChart data={data}>
//               <Line
//                 type="monotone"
//                 dataKey="stock"
//                 stroke="#6366F1"
//                 strokeWidth={4}
//                 dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
//                 activeDot={{ r: 8, fill: "#4F46E5" }}
//               />
//               <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="name"
//                 tick={{ fill: "#6B7280", fontSize: 12 }}
//                 axisLine={{ stroke: "#D1D5DB" }}
//               />
//               <YAxis
//                 tick={{ fill: "#6B7280", fontSize: 12 }}
//                 axisLine={{ stroke: "#D1D5DB" }}
//               />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#1F2937",
//                   color: "#F9FAFB",
//                   border: "none",
//                   borderRadius: "12px",
//                   boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
//                 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
