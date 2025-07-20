import React, { useEffect, useState } from "react";
import api from "../services/api";

function AddCustomerPayment() {
  let [customers, setCustomers] = useState([]);
  let [selectedCustomerId, setSelectedCustomerId] = useState("");
  let [amountPaid, setAmountPaid] = useState("");
  let [searchTerm, setSearchTerm] = useState("");
  let [filteredCustomers, setFilteredCustomers] = useState([]);
  let [message, setMessage] = useState("");

  useEffect(() => {
    let getCustomers = async () => {
      try {
        let { data } = await api.get("/customers/getcustomer");

        setCustomers(data);
        setFilteredCustomers(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCustomers();
  }, []);

  useEffect(() => {
    // console.log(customers);
    let filtered = customers.filter((customer) => {
      return customer.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      // customer.customerName;
    });

    console.log(filtered);
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  let handleSelectCustomer = (customer) => {
    setSelectedCustomerId(customer._id);
    setSearchTerm(customer.customerName);
    setFilteredCustomers([]);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCustomerId || !amountPaid) {
      setMessage("Please fill all fields");
      return;
    }
    try {
      await api.post("/customers/addcustomerpayment", {
        customerId: selectedCustomerId,
        amountPaid: Number(amountPaid),
      });
      setMessage("Payment added Successfully");
      setAmountPaid("");
      setSearchTerm("");
      setSelectedCustomerId("");
    } catch (err) {
      alert(err);
      console.log(err);
      setMessage("Failed To add payment");
    }
  };

  console.log(selectedCustomerId);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 px-4">
      <div className="payment-form w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-3xl p-8 relative">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 tracking-wide">
          Customer Payment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Input */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2">
              Customer:
            </label>
            <input
              type="text"
              placeholder="Search customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-300 transition duration-200"
            />

            {/* Dropdown - Keep absolute so it doesn't push form down */}
            {searchTerm && filteredCustomers.length > 0 && (
              <ul className="absolute top-full left-0 right-0 mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-xl shadow-md bg-white z-20">
                {filteredCustomers.map((cust) => (
                  <li
                    key={cust._id}
                    onClick={() => handleSelectCustomer(cust)}
                    className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer transition-colors"
                  >
                    {cust.customerName}
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
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg transition duration-300"
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

export default AddCustomerPayment;
