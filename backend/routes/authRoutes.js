const express = require("express");

const router = express.Router();

let { addUser, loginUser } = require("../controllers/user.controller");
router.post("/adduser", addUser);
router.post("/login", loginUser);

module.exports = router;

//AddUser

// router.post("/adduser", async (req, res) => {
//   console.log(req.body);

//   const { fullname, mobile, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       email,
//       fullname,
//       mobile,
//       password: hashedPassword,
//     });

//     res.status(201).json({ message: "User registered" });
//   } catch (err) {
//     res
//       .status(400)
//       .json({ error: `Email already in use or server error, OR ${err}` });
//   }
// });

//Login

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credential" });
//     }

//     const token = jwt.sign({ id: user._id }, process, eventNames.JWT_SECRET);
//     res.json({ message: "Login Successful", token });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });
