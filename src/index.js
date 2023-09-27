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
const ProductionRecord = require("./libs/ProductionRecord/ProductionRecord.route");
const MarketRecord = require("./libs/MarketRecord/MarketRecord.route");
const CostRecord = require("./libs/CostRecord/CostRecord.route");
const ProductionReport = require("./libs/ProductionReport/ProductionReport.route");
const CostReport = require("./libs/CostReport/CostReport.route");
const SalesReport = require("./libs/SalesReport/SalesReport.route");
const Product = require("./libs/Product/Product.route");

const NodeCache = require("node-cache");
const path = require("path");
const myCache = new NodeCache();

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

// Dev Mode
app.use(function (req, res, next) {
  if (req.url.includes("/api")) {
    req.url = req.url.toString().replace("/api", "");
  }
  if (req.method === "POST" || req.method === "PUT") {
    myCache.flushAll();
  }
  next();
});

app.get("/ol", (req, res) => {
  console.log(req.url);
  res.send("Hello World!");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/ol", express.static(path.join(__dirname, "public/ol")));

app.use(
  express.json({ limit: "50mb", extended: true, parameterLimit: 1000000 })
);

app.get("/map", (req, res) => {
  console.log("connected to nao");
  res.render("map");
});

Auth.AuthRoutes(app);
FarmInfo.FarmInfoRoutes(app);
FarmInventory.FarmInventoryRoutes(app);
FarmEquipment.FarmEquipmentRoutes(app);
Facility.FacilityRoutes(app);
Utility.UtilityRoutes(app);
HumanResource.HumanResourceRoutes(app);
Forest.ForestRoutes(app);
ProductionRecord.ProductionRecordRoutes(app);
MarketRecord.MarketRecordRoutes(app);
CostRecord.CostRecordRoutes(app);
ProductionReport.ProductionReportRoutes(app);
CostReport.CostReportRoutes(app);
SalesReport.SalesReportRoutes(app);
Product.ProductRoutes(app);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
