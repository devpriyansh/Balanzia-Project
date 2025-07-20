import React from "react";
import { useState } from "react";
import api from "../services/api";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function CustomerList() {
  let [customersInfo, setCustomerInfo] = useState([]);

  let getCustomersInfo = async () => {
    try {
      let { data } = await api.get("/customers/getcustomer");

      console.log(data);
      setCustomerInfo(data);
    } catch (err) {
      console.log(err);
      alert("Error while fetching customers");
    }
  };

  useEffect(() => {
    getCustomersInfo();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Our Customers
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 text-sm ">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                S.No.
              </th>
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Customer Name
              </th>

              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Bills
              </th>
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Statements
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customersInfo.map((customer, index) => (
              <tr
                key={customer._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap ">
                  {index + 1}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap ">
                  {customer.customerName}
                </td>

                {/* <td className="px-4 py-3 text-gray-700">
                  {new Date(customer.date).toLocaleString("en-IN", {
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
                  <NavLink to={`/showcustomerbills/${customer._id}`}>
                    👆 View
                  </NavLink>
                </td>

                <td className="px-4 py-3 text-gray-700 ">
                  <NavLink to={`/getcustomerstatement/${customer._id}`}>
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

export default CustomerList;
