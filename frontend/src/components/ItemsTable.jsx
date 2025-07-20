import React, { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { useReactToPrint } from "react-to-print";
import "./ItemsTable.css";

function ItemsTable() {
  let [itemData, setItemData] = useState([]);

  let getItems = async () => {
    try {
      let { data } = await api.get("/items/getitems");
      data.reverse();
      setItemData(data);

      console.log(data);
    } catch (err) {
      alert("Data not found");
    }
  };

  // const printRef = useRef();

  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  // });

  let handlePrint = () => {
    window.print();
  };

  //   console.log(printRef.current);

  useEffect(() => {
    getItems();
  }, []);
  // console.log(itemData);

  return (
    <div className="p-6 bg-gray-100 min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50">
      <div className="mb-6 no-print">
        <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-indigo-500 inline-block pb-1">
          STOCKS
        </h2>
      </div>

      <div>
        <button
          onClick={handlePrint}
          className="bg-white hover:shadow-xl transition rounded-xl p-2 flex justify-center items-center gap-2 border border-gray-200 mb-4 no-print"
        >
          <span className="text-3xl">🖨️</span>
          <h3 className="text-lg font-semibold text-gray-700">Print</h3>
          {/* <button className="text-indigo-600 text-sm hover:underline">
                    Go to {label}
                  </button> */}
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
              >
                S. No.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
              >
                Item Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
              >
                Brand
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
              >
                Price
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
              >
                Quantity
              </th>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
              >
                Supplier Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
              >
                Bill Number
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {itemData.map((item, key) => (
              <tr key={key} className="hover:bg-gray-100">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-800 text-start"
                >
                  {key + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-800 text-start"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4 text-gray-700">{item.brand}</td>
                <td className="px-6 py-4 text-gray-700">₹ {item.price}</td>
                <td className="px-6 py-4 text-gray-700">{item.quantity}</td>
                {/* <td className="px-6 py-4 text-gray-700">{item.suppliername}</td>
                <td className="px-6 py-4 text-gray-700">{item.billnumber}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemsTable;

//---------------------------------------

// ItemsTable.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import api from "../services/api";
// import PrintableTable from "./PrintableTable"; // Adjust path if needed

// function ItemsTable() {
//   const [itemData, setItemData] = useState([]);
//   const printRef = useRef();

//   const getItems = async () => {
//     try {
//       const { data } = await api.get("/items/getitems");
//       setItemData(data);
//     } catch (err) {
//       alert("Data not found");
//     }
//   };

//   useEffect(() => {
//     getItems();
//   }, []);

//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//     documentTitle: "Stock Table",
//   });

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="mt-18 text-3xl font-bold text-gray-800 mb-6 border-b-4 border-indigo-500 inline-block pb-1">
//         STOCKS
//       </h2>

//       <button
//         onClick={handlePrint}
//         className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//       >
//         🖨️ Print Table
//       </button>

//       {/* ✅ Use forwardRef component here */}
//       <PrintableTable ref={printRef} itemData={itemData} />
//     </div>
//   );
// }

// export default ItemsTable;
