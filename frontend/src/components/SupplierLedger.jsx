import React from "react";
import { useState } from "react";
import api from "../services/api";
import { useEffect } from "react";

function SupplierLedger() {
  let [suppliers, setSuppliers] = useState([]);

  let getSupplier = async () => {
    try {
      let { data } = await api.get("/suppliers/getsuppliers");
      console.log(data);
      setSuppliers(data);
    } catch (err) {
      console.log(err);
      alert("Error while fetching supplier");
    }
  };

  useEffect(() => {
    getSupplier();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-6">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Supplier Name
              </th>
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Due Amount
              </th>
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Show Bill
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {suppliers.map((supplier) => (
              <tr
                key={supplier._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                  {supplier.supplierName}
                </td>
                {/* <td className="px-4 py-3 text-gray-700">
                  {customer.finalAmount}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {new Date(customer.date).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <NavLink to={`/showuniquebill/${customer._id}`}>
                    👆 View
                  </NavLink>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierLedger;
