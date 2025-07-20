import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./BillGenerate.css";
import api from "../services/api";

function BillGenerator() {
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([{ itemName: "", quantity: 1, price: 0 }]);

  const billRef = useRef();

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === "itemName" ? value : Number(value);
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { itemName: "", quantity: 1, price: 0 }]);
  };

  let removeItem = (indexToRemove) => {
    setItems(items.filter((_, i) => i !== indexToRemove));
  };

  const getTotal = () => {
    let totalAmount = items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    // setAmount(totalAmount);
    return totalAmount;
  };

  let todayDate = new Date().toLocaleDateString();

  const handlePrint = () => {
    // storeBill();
    handleSave();
    window.print();
  };

  let handleSave = async () => {
    let finalAmount = getTotal();
    finalAmount = finalAmount.toString();
    let payload = { customerName, finalAmount, items };
    console.log(payload);

    try {
      await api.post("/bills/addbill", payload);
      alert("Bill Saved Successfully");
    } catch (err) {
      console.log(err);
      alert(err || "Error while saving bill");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 ">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">
          🧾 Bill Generate
        </h2>

        <form className="no-print">
          {/* Customer Name */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              name="customerName"
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          {/* Items */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">
              Items
            </label>
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-14 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Item Name"
                  className="border border-gray-300 rounded-md px-3 py-2 col-span-4"
                  value={item.itemName}
                  onChange={(e) =>
                    handleItemChange(index, "itemName", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  min="1"
                  className="border border-gray-300 rounded-md px-3 py-2  col-span-4"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  min="0"
                  className="border border-gray-300 rounded-md px-3 py-2  col-span-4"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() => {
                    removeItem(index);
                  }}
                  className="col-span-2 text-sm inline-flex items-center bg-red-500 text-white font-medium rounded-md shadow-md p-2"
                >
                  ❌ Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="mt-2 text-sm text-purple-600 hover:underline"
            >
              ➕ Add Item
            </button>
          </div>
        </form>

        {/* Bill Preview / Print Area */}
        <div
          ref={billRef}
          className="bg-white mt-10 p-6 print-area border border-gray-300 rounded-md"
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
              <strong>Customer:</strong> {customerName || "N/A"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date().toLocaleDateString("en-IN", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
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
                <th className="border border-black px-2 py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="border border-black px-2 py-1">
                    {item.itemName || "-"}
                  </td>
                  <td className="border border-black px-2 py-1">
                    {item.quantity}
                  </td>
                  <td className="border border-black px-2 py-1">
                    <input />₹ {item.price.toFixed(2)}
                  </td>
                  <td className="border border-black px-2 py-1">
                    ₹ {(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="text-right text-lg font-bold mt-4">
            <input />
            Grand Total: ₹ {getTotal().toFixed(2)}
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-between text-sm pt-4 border-t border-gray-300">
            <p>Customer Signature</p>
            <p>Authorized Signature</p>
          </div>
        </div>

        {/* Print Button */}
        <div className="text-center mt-8 no-print flex justify-center items-center gap-2">
          {/* <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Save Bill
          </button> */}
          <button
            onClick={handlePrint}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
          >
            🖨️ Print Bill
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillGenerator;
