import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

function ShowUniqueBill() {
  let [bill, setBill] = useState([]);

  let customerId = useParams();

  console.log(customerId);

  let getBill = async () => {
    try {
      let { data } = await api.get(`/bills/getuniquebill/${customerId.sid}`);
      console.log(data);
      setBill(data);
    } catch (err) {
      console.log(err);
      alert("Error while showing bill");
    }
  };

  useEffect(() => {
    getBill();
  }, []);
  return (
    <div className="p-6 bg-gray-100 min-h-screen bg-gradient-to-br from-red-200 to-sky-500 ">
      <div>
        {bill.map((uniqueBill) => (
          <div
            key={uniqueBill._id}
            //   ref={billRef}
            className="bg-white mt-10 p-4 print-area border border-gray-300 rounded-md"
          >
            {/* Business Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold uppercase">
                GOVINDAM AND SAHU SONS PVT LTD
              </h1>
              <p className="text-sm">
                In front of HDFC Bank, Main Road, Seoni Malwa (M.P)
              </p>
              <p className="text-sm">
                GSTIN: 23ABCDE1234F1Z1 | Phone: +91 9926405553
              </p>
              <hr className="my-4 border-t-2 border-black" />
            </div>

            {/* Bill Info */}
            <div className="mb-4 flex justify-between text-sm">
              <p>
                <strong>Customer:</strong>{" "}
                {uniqueBill.customerName.customerName}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(uniqueBill.date).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            {/* Items Table */}
            <table className="w-full border border-black text-sm">
              <thead>
                <tr className="bg-gray-200 border-b border-black">
                  <th className="border border-black px-2 py-1">Item Name</th>
                  <th className="border border-black px-2 py-1">Qty</th>
                  <th className="border border-black px-2 py-1">Rate</th>
                  {/* <th className="border border-black px-2 py-1">Amount</th> */}
                </tr>
              </thead>
              <tbody>
                {uniqueBill.items.map((item) => (
                  <tr key={item._id}>
                    <td className="border border-black px-2 py-1">
                      {item.itemName || "-"}
                    </td>
                    <td className="border border-black px-2 py-1">
                      {item.quantity}
                    </td>
                    <td className="border border-black px-2 py-1">
                      <input />₹ {item.price.toFixed(2)}
                    </td>
                    {/* <td className="border border-black px-2 py-1">
                    ₹ {item.finalAmount.toFixed(2)}
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div className="text-right text-lg font-bold mt-4">
              <input />
              Grand Total: ₹ {uniqueBill.finalAmount}
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-between text-sm pt-4 border-t border-gray-300">
              <p>Customer Signature</p>
              <p>Authorized Signature</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowUniqueBill;
