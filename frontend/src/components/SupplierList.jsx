import React, { useEffect, useState } from "react";
import api from "../services/api";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";

// Sample supplier data (you can fetch this from an API or props)
// const suppliers = [
//   {
//     id: 1,
//     name: "Anita Sharma",
//     company: "Global Traders Pvt. Ltd.",
//     email: "anita@globaltraders.com",
//     phone: "+91 98765 43210",
//     address: "Mumbai, Maharashtra, India",
//   },
//   {
//     id: 2,
//     name: "Rajesh Mehta",
//     company: "Mehta Electronics",
//     email: "contact@mehtaelectronics.com",
//     phone: "+91 98123 45678",
//     address: "Ahmedabad, Gujarat, India",
//   },
//   {
//     id: 3,
//     name: "Farhan Khan",
//     company: "Elite Supplies Co.",
//     email: "farhan@elitesupplies.com",
//     phone: "+91 90000 12345",
//     address: "Bangalore, Karnataka, India",
//   },
// ];

function SupplierCards() {
  let [suppliers, setSupplierData] = useState([]);

  let getData = async () => {
    try {
      let { data } = await api.get("/suppliers/getsuppliers");
      console.log(data);
      setSupplierData(data);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(suppliers);
  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-6">
    //   <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
    //     🧾 Our Trusted Suppliers
    //   </h1>

    //   <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
    //     {suppliers.map((supplier) => (
    //       <NavLink
    //         to={`/supplierrecord/${supplier._id}`}
    //         key={supplier._id}
    //         className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-transform transform hover:-translate-y-1"
    //       >
    //         <h2 className="text-xl font-semibold text-purple-700 mb-1">
    //           {supplier.supplierName}
    //         </h2>
    //         {/* <p className="text-sm text-gray-600 mb-2 font-medium">
    //           {supplier.company}
    //         </p> */}
    //         <div className="text-sm text-gray-700 space-y-1 mb-4">
    //           {/* <p>
    //             <strong>Email:</strong> {supplier.email}
    //           </p>
    //           <p>
    //             <strong>Phone:</strong> {supplier.phone}
    //           </p>
    //           <p>
    //             <strong>Address:</strong> {supplier.address}
    //           </p> */}
    //         </div>
    //         <button className="w-full bg-purple-600 text-white text-sm font-semibold py-2 rounded-md hover:bg-purple-700 transition">
    //           📞 Contact Supplier
    //         </button>
    //       </NavLink>
    //     ))}
    //   </div>
    // </div>

    //--------------

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Our Suppliers
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 text-sm ">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                S.No.
              </th>
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Supplier Name
              </th>

              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Records
              </th>
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Statements
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {suppliers.map((supplier, index) => (
              <tr
                key={supplier._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap ">
                  {index + 1}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap ">
                  {supplier.supplierName}
                </td>

                {/* <td className="px-4 py-3 text-gray-700">
                      {new Date(supplier.date).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td> */}
                <td className="px-4 py-3 text-gray-700 ">
                  <NavLink to={`/supplierrecord/${supplier._id}`}>
                    👆 View
                  </NavLink>
                </td>

                <td className="px-4 py-3 text-gray-700 ">
                  <NavLink to={`/getsupplierstatement/${supplier._id}`}>
                    👆 View
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierCards;
