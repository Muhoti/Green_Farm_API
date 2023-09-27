const ProductionReportController = require("./ProductionReport.controller");
const ProductionReportModel = require("./ProductionReport.model");

exports.ProductionReportRoutes = function (app) {
  app.get("/productionreport", [ProductionReportController.findAll]);

  app.get("/productionreport/lrnumber", [
    ProductionReportController.findLRnumber,
  ]);

  app.get(
    "/productionreport/topstats",
    ProductionReportController.findTopStats
  );

  app.get("/productionreport/stats", ProductionReportController.findStats);

  app.get("/productionreport/:id", [ProductionReportController.findByID]);

  app.get("/productionreport/searchid/:nationalId", [
    ProductionReportController.findProductionReportByNationalId,
  ]);

  app.get("/productionreport/searchname/:ownerName", [
    ProductionReportController.findProductionReportByOwnerName,
  ]);

  app.get("/productionreport/searchparcel/:parcelNumber", [
    ProductionReportController.findProductionReportByParcelNumber,
  ]);

  app.get("/productionreport/searchphone/:phoneNumber", [
    ProductionReportController.findProductionReportByPhoneNumber,
  ]);

  app.post("/productionreport/create", [ProductionReportController.create]);

  app.put("/productionreport/update/:id", [
    ProductionReportController.updateByID,
  ]);

  app.get("/productionreport/search/:query/:offset", [
    ProductionReportController.findByKeyword,
  ]);

  app.get("/productionreport/lrnumber/:lrnumber/:offset", [
    ProductionReportController.findLRnumber,
  ]);

  app.get("/productionreport/paginated/:lrnumber/:offset", [
    ProductionReportController.findPaginated,
  ]);

  app.delete("/productionreport/delete/:id", [
    ProductionReportController.deleteById,
  ]);
};
