const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());
app.use(cookieParser());
//Route Imports
const requests = require("./routes/requestRoute");
const user = require("./routes/userRoute");
const donations = require("./routes/donationRoute");
app.use("/api/v1", requests);
app.use("/api/v1", user);
app.use("/api/v1", donations);
//Middleware for error
app.use(errorMiddleware);

module.exports = app