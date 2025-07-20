import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

function ShowCustomerStatements() {
  let [statement, setStatement] = useState([]);
  let [paymentHistory, setPaymentHistory] = useState([]);
  let customerId = useParams();

  useEffect(() => {
    async function getPayments() {
      try {
        let { data } = await api.get(
          `/customers/getcustomeramount/${customerId.sid}`
        );
        setStatement(data);
        setPaymentHistory(data.paymentHistory);

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getPayments();
  }, []);

  console.log(paymentHistory);
  return (
    <div className="max-w-[90%] mx-auto p-6 bg-white shadow-lg rounded-lg mt-10l">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Customer Statement
      </h1>
      <h2 className="text-lg text-gray-600 text-center mb-6">
        {/* {statement.datacustomerName} */}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-blue-100 rounded-xl p-4 shadow">
          <p className="text-gray-700">Total Amount</p>
          <h3 className="text-xl font-bold text-blue-700">
            ₹{statement.totalBillAmount}
          </h3>
        </div>
        <div className="bg-green-100 rounded-xl p-4 shadow">
          <p className="text-gray-700">Paid Amount</p>
          <h3 className="text-xl font-bold text-green-700">
            ₹{statement.paidAmount}
          </h3>
        </div>
        <div className="bg-red-100 rounded-xl p-4 shadow">
          <p className="text-gray-700">Due Amount</p>
          <h3 className="text-xl font-bold text-red-700">
            ₹{statement.dueAmount}
          </h3>
        </div>
      </div>

      {/* <div className="overflow-x-auto">
        <h3 className="text-xl font-semibold mb-3">💰 Transaction History</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Amount Paid</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {statement.paymentHistory?.map((payment, index) => (
              <tr key={payment._id} className="text-center hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2 text-green-700 font-medium">
                  ₹{payment.amountPaid}
                </td>
                <td className="border px-4 py-2">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 text-sm ">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                S.No.
              </th>
              {/* <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Customer Name
              </th> */}

              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {statement.paymentHistory?.map((payment, index) => (
              <tr
                key={payment._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap ">
                  {index + 1}
                </td>
                {/* <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap ">
                  {customer.customerName}
                </td> */}

                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap ">
                  {payment.amountPaid}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {new Date(payment.paymentDate).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                {/* <td className="px-4 py-3 text-gray-700 ">
                  <NavLink to={`/showcustomerbills/${customer._id}`}>
                    👆 View
                  </NavLink>
                </td> */}

                {/* <td className="px-4 py-3 text-gray-700 ">
                  <NavLink to={`/getcustomerstatement/${customer._id}`}>
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

export default ShowCustomerStatements;
