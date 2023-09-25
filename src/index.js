require("dotenv").config();

const express = require("express");
const app = express();
const env = require("./configs/env");
const Auth = require("./libs/Auth/Auth.route");
const FarmInfo = require("./libs/FarmInfo/FarmInfo.route");
const FarmInventory = require("./libs/FarmInventory/FarmInventory.route");
const FarmEquipment = require("./libs/FarmEquipment/FarmEquipment.route");
const Facility = require("./libs/Facility/Facility.route");
const Utility = require("./libs/Utility/Utility.route");
const HumanResource = require("./libs/HumanResource/HumanResource.route");
const Forest = require("./libs/Forest/Forest.route");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );

  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

app.use(
  express.json({ limit: "50mb", extended: true, parameterLimit: 1000000 })
);

Auth.AuthRoutes(app);
FarmInfo.FarmInfoRoutes(app);
FarmInventory.FarmInventoryRoutes(app);
FarmEquipment.FarmEquipmentRoutes(app);
Facility.FacilityRoutes(app);
Utility.UtilityRoutes(app);
HumanResource.HumanResourceRoutes(app);
Forest.ForestRoutes(app);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
