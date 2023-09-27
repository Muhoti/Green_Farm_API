const ProductionRecordController = require("./ProductionRecord.controller");
const ProductionRecordModel = require("./ProductionRecord.model");

exports.ProductionRecordRoutes = function (app) {
  app.get("/productionrecord", [ProductionRecordController.findAll]);

  app.get("/productionrecord/lrnumber", [ProductionRecordController.findLRnumber]);

  app.get("/productionrecord/topstats", ProductionRecordController.findTopStats);

  app.get("/productionrecord/stats", ProductionRecordController.findStats);

  app.get("/productionrecord/:id", [ProductionRecordController.findByID]);

  app.get("/productionrecord/searchid/:nationalId", [
    ProductionRecordController.findProductionRecordByNationalId,
  ]);

  app.get("/productionrecord/searchname/:ownerName", [
    ProductionRecordController.findProductionRecordByOwnerName,
  ]);

  app.get("/productionrecord/searchparcel/:parcelNumber", [
    ProductionRecordController.findProductionRecordByParcelNumber,
  ]);

  app.get("/productionrecord/searchphone/:phoneNumber", [
    ProductionRecordController.findProductionRecordByPhoneNumber,
  ]);

  app.post("/productionrecord/create", [ProductionRecordController.create]);

  app.put("/productionrecord/update/:id", [
    ProductionRecordController.updateByID,
  ]);

  app.get("/productionrecord/search/:query/:offset", [
    ProductionRecordController.findByKeyword,
  ]);

  app.get("/productionrecord/lrnumber/:lrnumber/:offset", [
    ProductionRecordController.findLRnumber,
  ]);

  app.get("/productionrecord/paginated/:lrnumber/:offset", [
    ProductionRecordController.findPaginated,
  ]);

  app.delete("/productionrecord/delete/:id", [ProductionRecordController.deleteById]);
};
