import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React from "react";
import "./App.css";
import Login from "./components/Login";
import AddUser from "./components/AddUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./components/Test";
import AddItems from "./components/AddItems";
import ItemsTable from "./components/ItemsTable";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import FirstPage from "./components/FirstPage";
import LoginAdmin from "./components/LoginAdmin";
import BillGenerator from "./components/BillGenerate";
import SupplierList from "./components/SupplierList";
import SupplierRecord from "./components/SupplierRecord";
import ShowBills from "./components/ShowBills";
import ShowUniqueBill from "./components/ShowUniqueBill";
import MainLayout from "./components/MainLayout";
import CustomerLedger from "./components/CustomerLedger";
import SupplierLedger from "./components/SupplierLedger";
import CustomerList from "./components/CustomerList";
import ShowCustomerBills from "./components/ShowCustomerBills";
import AddCustomerPayment from "./components/AddCustomerPayment";
import ShowCustomerStatements from "./components/ShowCustomerStatements";
import AddSupplierPayment from "./components/AddSupplierPayment";
import ShowSupplierStatement from "./components/ShowSupplierStatement";

function App() {
  return (
    <>
      {/* <Login /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/firstpage" element={<FirstPage />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/" element={<Login />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Pages with navbar */}
          <Route element={<MainLayout />}>
            <Route path="/test" element={<Test />} />
            <Route path="/supplierlist" element={<SupplierList />} />
            <Route path="/additem" element={<AddItems />} />
            <Route path="/billgenerate" element={<BillGenerator />} />
            <Route path="/getitems" element={<ItemsTable />} />
            <Route path="/supplierrecord/:sid" element={<SupplierRecord />} />
            <Route path="/showbills" element={<ShowBills />} />
            <Route path="/showuniquebill/:sid" element={<ShowUniqueBill />} />
            <Route path="/customerledger" element={<CustomerLedger />} />
            <Route path="/supplierledger" element={<SupplierLedger />} />
            <Route path="/customerlist" element={<CustomerList />} />
            <Route
              path="/showcustomerbills/:sid"
              element={<ShowCustomerBills />}
            />
            <Route
              path="/addcustomerpayment"
              element={<AddCustomerPayment />}
            />
            <Route
              path="/getcustomerstatement/:sid"
              element={<ShowCustomerStatements />}
            />
            <Route
              path="/addsupplierpayment"
              element={<AddSupplierPayment />}
            />
            <Route
              path="/getsupplierstatement/:sid"
              element={<ShowSupplierStatement />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
