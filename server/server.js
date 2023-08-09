const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
app.use(morgan("dev"));
require("dotenv").config();

const dbConfig = require("./config/dbConfig");
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.listen(port, () => console.log(`nodejs server started on port ${port}`));
