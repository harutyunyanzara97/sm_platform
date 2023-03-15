const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');

// env
require("dotenv").config();
const port = process.env.PORT || 3000;

// routes
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const productRoutes = require("./routes/productRoutes");
const planRoutes = require("./routes/planRoutes");
const discountRoutes = require("./routes/discountRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

// ----------------------------------------

// MIDDLEWARE
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));


app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
// use routes

app.use("/api/user", userRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/product", productRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/discount", discountRoutes);
app.use("/api/subscription", subscriptionRoutes);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(__dirname + '/dist/'));

//   app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));
// }

// listen port
app.listen(port, () => console.log(`Server started on port ${port}`));
