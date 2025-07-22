const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(
  cors({
    // origin: "http://localhost:5173", // frontend url
    origin: "https://balanzia-project.vercel.app",

    credentials: true, //for cookie
  })
);
app.use(express.json());
app.use(cookieParser()); // read cookies

// app.use(express.urlencoded({ extended: true }));

let userRoutes = require("./routes/authRoutes");
app.use("/api/users", userRoutes);

let itemRoutes = require("./routes/item.route");
app.use("/api/items", itemRoutes);
// console.log("Mongo URI:", process.env.MONGO_URI);

let supplierRoute = require("./routes/supplier.route");
app.use("/api/suppliers", supplierRoute);

let billRoute = require("./routes/bill.route");
app.use("/api/bills", billRoute);

let customerRoute = require("./routes/customer.route");
app.use("/api/customers", customerRoute);

let supplierRecordRoute = require("./routes/supplierRecord.route");
app.use("/api/supplierrecord", supplierRecordRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
