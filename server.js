const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

const uri =
  "mongodb://localhost:27017/";

// Import all Routers
const defaultRouter = require("./routes/defaultRoutes");
const personnelRouter = require("./routes/personnelRoutes");

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.Promise = global.Promise;
mongoose
  .connect(uri)
  .then(() => {
    console.log("[System] Connected to Database.");
  })
  .catch(err => {
    console.log("[System] Cannot connect to the database.", err);
    process.exit();
  });
  
  app.use("/", defaultRouter);
  app.use("/personnel", personnelRouter);
  
  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });