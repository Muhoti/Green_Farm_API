const SalesReportController = require("./SalesReport.controller");
const SalesReportModel = require("./SalesReport.model");

exports.SalesReportRoutes = function (app) {
  app.get("/salesreport", [SalesReportController.findAll]);

  app.get("/salesreport/lrnumber", [SalesReportController.findLRnumber]);

  app.get("/salesreport/topstats", SalesReportController.findTopStats);

  app.get("/salesreport/stats", SalesReportController.findStats);

  app.get("/salesreport/:id", [SalesReportController.findByID]);

  app.get("/salesreport/searchid/:nationalId", [
    SalesReportController.findSalesReportByNationalId,
  ]);

  app.get("/salesreport/searchname/:ownerName", [
    SalesReportController.findSalesReportByOwnerName,
  ]);

  app.get("/salesreport/searchparcel/:parcelNumber", [
    SalesReportController.findSalesReportByParcelNumber,
  ]);

  app.get("/salesreport/searchphone/:phoneNumber", [
    SalesReportController.findSalesReportByPhoneNumber,
  ]);

  app.post("/salesreport/create", [SalesReportController.create]);

  app.put("/salesreport/update/:id", [SalesReportController.updateByID]);

  app.get("/salesreport/search/:query/:offset", [
    SalesReportController.findByKeyword,
  ]);

  app.get("/salesreport/lrnumber/:lrnumber/:offset", [
    SalesReportController.findLRnumber,
  ]);

  app.get("/salesreport/paginated/:lrnumber/:offset", [
    SalesReportController.findPaginated,
  ]);

  app.delete("/salesreport/delete/:id", [SalesReportController.deleteById]);
};
