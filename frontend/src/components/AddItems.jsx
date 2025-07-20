import React, { useEffect, useState } from "react";
import api from "../services/api";

function AddItems() {
  const [supplierInfo, setSupplierInfo] = useState({
    supplierName: "",
    billNumber: "",
    totalAmount: "",
    // paidAmount: "",
    // dueAmount: "",
  });

  const [items, setItems] = useState([
    {
      name: "",
      brand: "",
      // color: "",
      price: "",
      // category: "",
      quantity: "",
      // description: "",
    },
  ]);

  let [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    let getSupplier = async () => {
      try {
        let { data } = await api.get("/suppliers/getsuppliers");
        setSuppliers(data);
        console.log(data);
      } catch (err) {
        console.log("Failed to fetch supplier", err);
      }
    };
    getSupplier();
  }, []);

  const handleSupplierChange = (e) => {
    setSupplierInfo({ ...supplierInfo, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index][e.target.name] = e.target.value;
    setItems(updatedItems);
  };

  const addNewItem = () => {
    setItems([
      ...items,
      {
        name: "",
        brand: "",
        // color: "",
        price: "",
        // category: "",
        quantity: "",
        // description: "",
      },
    ]);
  };

  const removeItem = (indexToRemove) => {
    setItems(items.filter((_, i) => i !== indexToRemove));
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const payload = {
      ...supplierInfo,
      items,
    };

    try {
      await api.post("/suppliers/addsupplier", payload); // You can change endpoint accordingly
      alert("Items Added Successfully");
      // Reset
      setSupplierInfo({ suppliername: "", billnumber: "" });
      setItems([
        {
          name: "",
          brand: "",
          // color: "",
          price: "",
          // category: "",
          quantity: "",
          // description: "",
        },
      ]);
    } catch (err) {
      console.error(err);
      alert("Error adding items");
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-4">
      <form
        onSubmit={handleForm}
        className="bg-white shadow-2xl rounded-xl w-full max-w-6xl p-8 space-y-8"
      >
        <h2 className="flex items-center justify-center gap-3 text-4xl font-bold text-gray-900 tracking-tight leading-snug">
          <span className="text-5xl ">📈</span>
          <span className="text-purple-700">Add Stocks</span>
        </h2>

        {/* Supplier Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Supplier Name
            </label>
            <input
              name="supplierName"
              list="supplierList"
              value={supplierInfo.supplierName || ""}
              placeholder="Enter Supplier Name"
              onChange={handleSupplierChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <datalist id="supplierList">
              {suppliers.map((s, i) => (
                <option key={i} value={s.supplierName} />
              ))}
            </datalist>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Supplier Bill Number
            </label>
            <input
              name="billNumber"
              type="text"
              value={supplierInfo.billNumber || ""}
              placeholder="Enter Bill Number"
              onChange={handleSupplierChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Items Section */}
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4"
          >
            <h3 className="text-lg font-semibold text-purple-700">
              Item {index + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { name: "name", placeholder: "Item Name" },
                { name: "brand", placeholder: "Brand" },
                { name: "price", placeholder: "Price" },
                { name: "quantity", placeholder: "Quantity" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field.name}
                  </label>
                  <input
                    name={field.name}
                    type={
                      field.name === "price" || field.name === "quantity"
                        ? "number"
                        : "text"
                    }
                    value={item[field.name]}
                    placeholder={`Enter ${field.placeholder}`}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              ))}
              {/* Description */}
              {/* <div className="md:col-span-3 flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={item.description || ""}
                  placeholder="Enter Description"
                  onChange={(e) => handleItemChange(index, e)}
                  className="border border-gray-300 rounded-md p-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div> */}
            </div>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-700 transition"
              >
                ❌ Remove
              </button>
            )}
          </div>
        ))}

        {/* Add Item Button */}
        <div className="text-center flex gap-3">
          <button
            type="button"
            onClick={addNewItem}
            className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition"
          >
            ➕ Add Another Item
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className=" flex flex-col ">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Total Amount
              </label>
              <input
                name="totalAmount"
                type="text"
                value={supplierInfo.totalAmount || ""}
                placeholder={`Enter Total Amount`}
                onChange={handleSupplierChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* <div className=" flex flex-col ">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Paid Amount
              </label>
              <input
                name="paidAmount"
                type="text"
                value={supplierInfo.paidAmount || ""}
                placeholder={`Enter Paid Amount`}
                onChange={handleSupplierChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div> */}

            {/* <div className=" flex flex-col ">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Due Amount
              </label>
              <input
                name="dueAmount"
                type="text"
                value={supplierInfo.dueAmount || ""}
                placeholder={`Enter Due Amount`}
                onChange={handleSupplierChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div> */}
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded-md font-semibold transition"
          >
            Submit Items
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItems;

//--------------------------------------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import api from "../services/api";
// import logo from "/logo2.png";

// function AddItems() {
//   let [form, setForm] = useState({
//     suppliername: "",
//     billnumber: "",
//     name: "",
//     brand: "",
//     color: "",
//     price: "",
//     category: "",
//     quantity: "",
//     description: "",
//   });

//   let handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   let handleForm = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/items/additem", form);

//       alert("Item Added Successfully");
//     } catch (err) {
//       //   alert(err?.response?.error);
//       console.log(err);
//     }
//   };

//   console.log(form);
//   return (
//     <div className="w-screen min-h-screen flex justify-center items-center bg-gradient-to-br from-red-200 to-sky-500 p-4">
//       <form
//         onSubmit={handleForm}
//         className="bg-white shadow-2xl rounded-xl w-full max-w-4xl p-8 space-y-6"
//       >
//         {/* Logo */}
//         {/* <div className="flex justify-center">
//           <img className="w-40 h-16 object-contain" src={logo} alt="Logo" />
//         </div> */}

//         {/* Heading */}
//         <h2 className="text-center text-2xl font-bold text-gray-800 ">
//           Add New Item
//         </h2>

//         {/* Input Rows */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Supplier Name
//             </label>
//             <input
//               name="suppliername"
//               type="text"
//               placeholder="Enter Supplier Name"
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Supplier Bill Number
//             </label>
//             <input
//               name="billnumber"
//               type="text"
//               placeholder="Enter Item Name"
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Item Name
//             </label>
//             <input
//               name="name"
//               type="text"
//               placeholder="Enter Item Name"
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Brand
//             </label>
//             <input
//               name="brand"
//               type="text"
//               placeholder="Enter Brand"
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Color
//             </label>
//             <input
//               name="color"
//               type="text"
//               placeholder="Enter Color"
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Price
//             </label>
//             <input
//               name="price"
//               type="text"
//               placeholder="Enter Price"
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <input
//               name="category"
//               type="text"
//               placeholder="Enter Category"
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Quantity
//             </label>
//             <input
//               name="quantity"
//               type="text"
//               placeholder="Enter Quantity"
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="lg:col-span-3 flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               placeholder="Enter Description"
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             ></textarea>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded-md font-semibold transition"
//           >
//             Add Item
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AddItems;
