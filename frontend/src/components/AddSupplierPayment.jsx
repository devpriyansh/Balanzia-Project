import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";

function AddSupplierPayment() {
  let [suppliers, setSuppliers] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  let [amountPaid, setAmountPaid] = useState("");
  let [filteredSuppliers, setFilteredSuppliers] = useState([]);
  let [selectedSupplierId, setSelectedSupplierId] = useState("");
  let [message, setMessage] = useState("");

  useEffect(() => {
    let getSuppliers = async () => {
      try {
        let { data } = await api.get("/suppliers/getsuppliers");

        setSuppliers(data);

        setFilteredSuppliers(data);
      } catch (err) {
        console.log(err);
      }
    };
    getSuppliers();
  }, []);

  useEffect(() => {
    let filtered = suppliers.filter((supplier) => {
      return supplier.supplierName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

    console.log(suppliers);

    setFilteredSuppliers(filtered);
  }, [searchTerm, suppliers]);

  let handleSelectSupplier = (supp) => {
    setSelectedSupplierId(supp._id);
    setSearchTerm(supp.supplierName);
    setFilteredSuppliers([]);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSupplierId || !amountPaid) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      await api.post("/suppliers/addsupplierpayment", {
        supplierId: selectedSupplierId,
        amountPaid: Number(amountPaid),
      });
      setMessage("Payment Added Successfully");
      setSearchTerm("");
      setAmountPaid("");
      setSelectedSupplierId("");
    } catch (err) {
      setMessage("Failed to add Payment");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 px-4">
      <div className="payment-form w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-3xl p-8 relative">
        <h2 className="text-3xl font-bold text-center text-yellow-700 mb-6 tracking-wide">
          Supplier Payment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Supplier Input */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2">
              Supplier:
            </label>
            <input
              type="text"
              placeholder="Search Suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 transition duration-200"
            />

            {/* Dropdown - Positioned absolutely to prevent layout shift */}
            {searchTerm && filteredSuppliers.length > 0 && (
              <ul className="absolute top-full left-0 right-0 mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-xl shadow-md bg-white z-20">
                {filteredSuppliers.map((supp) => (
                  <li
                    key={supp._id}
                    onClick={() => handleSelectSupplier(supp)}
                    className="px-4 py-2 text-sm hover:bg-yellow-100 cursor-pointer transition-colors"
                  >
                    {supp.supplierName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Amount Paid:
            </label>
            <input
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              placeholder="Enter amount"
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-300 transition duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-yellow-800 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            Add Payment
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-green-600 animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddSupplierPayment;
