import React from "react";
import { NavLink, useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect } from "react";
import { useState } from "react";

function ShowCustomerBills() {
  let [customerBills, setCustomerBills] = useState([]);
  let customerId = useParams();

  // let totalAmount = 0;

  // customerBills.forEach((bill) => {
  //   totalAmount = totalAmount + Number(bill.finalAmount);
  // });

  let getCustomerBills = async () => {
    try {
      let { data } = await api.get(
        `/customers/getcustomerbills/${customerId.sid}`
      );

      //   console.log(data);
      setCustomerBills(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCustomerBills();
  }, []);

  console.log(customerBills);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Bills
      </h1>

      {/* <div className="bg-gray-700 text-white rounded-md p-3 mb-4">
        <h3 className="text-lg font-semibold">
          Total Amount : ₹ {totalAmount}
        </h3>
      </div> */}

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
                Date
              </th>
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Amount
              </th>

              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Show Bill Copy
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customerBills.map((customer, index) => (
              <tr
                key={customer._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap ">
                  {index + 1}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap ">
                  {customer.customerName.customerName}
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
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap ">
                  {customer.finalAmount}
                </td>
                <td className="px-4 py-3 text-gray-700 ">
                  <NavLink to={`/showuniquebill/${customer._id}`}>
                    👆 View Bill
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

export default ShowCustomerBills;
