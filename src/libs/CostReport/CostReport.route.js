const CostReportController = require("./CostReport.controller");
const CostReportModel = require("./CostReport.model");

exports.CostReportRoutes = function (app) {
  app.get("/costreport", [CostReportController.findAll]);

  app.get("/costreport/lrnumber", [CostReportController.findLRnumber]);

  app.get("/costreport/topstats", CostReportController.findTopStats);

  app.get("/costreport/stats", CostReportController.findStats);

  app.get("/costrecostreportcord/:id", [CostReportController.findByID]);

  app.get("/costreport/searchid/:nationalId", [
    CostReportController.findCostReportByNationalId,
  ]);

  app.get("/costreport/searchname/:ownerName", [
    CostReportController.findCostReportByOwnerName,
  ]);

  app.get("/costreport/searchparcel/:parcelNumber", [
    CostReportController.findCostReportByParcelNumber,
  ]);

  app.get("/costreport/searchphone/:phoneNumber", [
    CostReportController.findCostReportByPhoneNumber,
  ]);

  app.post("/costreport/create", [CostReportController.create]);

  app.put("/costreport/update/:id", [CostReportController.updateByID]);

  app.get("/CostReport/search/:query/:offset", [
    CostReportController.findByKeyword,
  ]);

  app.get("/costreport/lrnumber/:lrnumber/:offset", [
    CostReportController.findLRnumber,
  ]);

  app.get("/costreport/paginated/:lrnumber/:offset", [
    CostReportController.findPaginated,
  ]);

  app.delete("/costreport/delete/:id", [CostReportController.deleteById]);
};
