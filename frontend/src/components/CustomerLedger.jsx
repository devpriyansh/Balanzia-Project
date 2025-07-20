import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";

function CustomerLedger() {
  let [customers, setCustomers] = useState([]);

  let getCustomers = async () => {
    try {
      let { data } = await api.get("/bills/getbill");
      console.log(data);
    } catch (err) {
      console.log(err);
      alert("Error while fetching customers");
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);
  return <div>CustomerLedger</div>;
}

export default CustomerLedger;
