let express = require("express");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let User = require("../models/user-model");

// console.log("inside user controller");

let addUser = async (req, res) => {
  let { fullname, mobile, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already Exist" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      fullname,
      mobile,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created Successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

let loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    let match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res
      .status(200)
      .json({ message: `Login Successfully , Welcome ${user.fullname}` });
  } catch (err) {
    res.status(500).json({ error: `Server Error ${err}` });
  }
};

module.exports = { addUser, loginUser };
