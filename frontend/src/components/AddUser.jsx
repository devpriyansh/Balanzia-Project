import React, { useState } from "react";
import logo from "/logo2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api";

function AddUser() {
  let [form, setForm] = useState({
    fullname: "",
    mobile: "",
    email: "",
    password: "",
  });
  const navigateToDashboard = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let handleForm = async (e) => {
    e.preventDefault();
    // console.log("inside handleSubmit");
    try {
      const res = await api.post("/users/adduser", form);
      alert("User Created Successfully");
      // navigateToDashboard("/dashboard");
    } catch (err) {
      // alert(err.response?.data);
      console.log(err);
    }
  };
  console.log(form);
  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-no-repeat bg-gradient-to-r from-red-200 to-sky-500"
      style={
        {
          // backgroundImage: `url('https://img.freepik.com/free-photo/school-supplies-table-composition_23-2148939176.jpg?t=st=1744448186~exp=1744451786~hmac=824a73c7d9c36aa11c340cea73d435580db991cf1b337337a39c9d0c20abe6a3&w=1380')`,
          // backgroundRepeat: "no-repeat",
        }
      }
    >
      <form
        onSubmit={handleForm}
        className=" rounded-md w-108 gap-2  h-150 flex flex-col justify-between items-center p-4 "
        style={{ backgroundColor: "white" }}
      >
        <div className="w-full h-1/10 flex items-center justify-center">
          <img className="w-1/2 h-full rounded-md" src={logo} />
        </div>
        <div className="gap-1 flex items-start w-full flex-col">
          <label>Full Name</label>
          <input
            placeholder="Enter Full Name"
            name="fullname"
            onChange={handleChange}
            type="text"
            className="border-1 border-b-blue-950 w-full h-10 rounded-md p-2"
          />
        </div>

        <div className="gap-1 flex items-start w-full flex-col">
          <label>Mobile Number</label>
          <input
            placeholder="Enter Mobile Number"
            name="mobile"
            onChange={handleChange}
            type="tel"
            className="border-1 border-b-blue-950 w-full h-10 rounded-md p-2"
          />
        </div>

        <div className="gap-1 flex items-start w-full flex-col">
          <label>Email</label>
          <input
            placeholder="Enter Email ID"
            name="email"
            onChange={handleChange}
            type="text"
            className="border-1 border-b-blue-950 w-full h-10 rounded-md p-2"
          />
        </div>

        <div className="gap-1 flex items-start w-full flex-col">
          <label>Password</label>
          <input
            placeholder="Enter Password"
            type="password"
            className="border-1 border-b-blue-950 w-full h-10 rounded-md p-2"
          />
        </div>

        <div className="gap-1 flex items-start w-full flex-col">
          <label>Confirm Password</label>
          <input
            placeholder="Confirm Password"
            name="password"
            onChange={handleChange}
            type="password"
            className="border-1 border-b-blue-950 w-full h-10 rounded-md p-2"
          />
        </div>

        <div
          className="cursor-pointer w-full rounded-md"
          style={{ backgroundColor: "#011140" }}
        >
          <button
            type="submit"
            className="p-2 text-white w-full rounded-md cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
