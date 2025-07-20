import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import api from "../services/api";

function SupplierRecord() {
  let [supplierRecord, setSupplierRecord] = useState([]);
  // let [totalAmount, setTotalAmount] = useState(0)

  let supplierId = useParams();

  let suppliername;

  let nameArray = supplierRecord.map((supplier) => {
    return (suppliername = supplier.supplier?.supplierName);
  });

  // console.log(ese);

  let getData = async () => {
    try {
      let res = await api.get(
        `/supplierrecord/getsupplierrecords/${supplierId.sid}`
      );
      let ans = res.data;

      //If we want only items than below flatmap is used
      //   const allItems = ans.flatMap((record) => record.items);
      //   console.log(allItems);

      setSupplierRecord(ans);

      //   setSupplierRecord(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(supplierRecord);

  useEffect(() => {
    getData();
  }, []);

  //   console.log(SupplierRecord);

  return (
    // <div>
    //   {supplierRecord.map((record, index) => (
    //     <div key={record._id}>
    //       <h3>Supplier: {record.supplier?.supplierName}</h3>
    //       <ul>
    //         {record.items.map((item, idx) => (
    //           <li key={item._id}>
    //             {item.name} - {item.brand} - ₹{item.price}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   ))}
    // </div>

    <div className="p-6 bg-gradient-to-br from-red-200 to-sky-500 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-600 mb-8 text-center">
        {suppliername} Records
      </h1>

      <div className="">
        {supplierRecord.map((record) => (
          <div
            key={record._id}
            className="bg-white rounded-lg shadow-lg p-2 hover:shadow-xl transition-shadow duration-300 w-full mb-5"
          >
            <div className="bg-blue-500 text-white rounded-md p-3 mb-4">
              {/* <h3 className="text-lg font-semibold">
                Supplier: {record.supplier?.supplierName}
              </h3> */}

              <h3 className="text-lg font-semibold">
                Bill Number: {record.billNumber}
              </h3>

              <h3 className="text-lg font-semibold">
                Total Bill Amount: ₹ {record.totalAmount}
              </h3>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                      Color
                    </th>
                    <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {record.items.map((item, idx) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{item.brand}</td>
                      <td className="px-4 py-3 text-gray-700">{item.color}</td>
                      <td className="px-4 py-3 text-gray-700">₹{item.price}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SupplierRecord;
