require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// connect to DB
connectDB();


// middleware
const app = express();
app.use(cors());
app.use(express.json()); // parse JSON bodies


// routes
app.get("/", (req, res) => {
  res.send("BookMyShow API is running");
});
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});