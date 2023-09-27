const CostRecordController = require("./CostRecord.controller");
const CostRecordModel = require("./CostRecord.model");

exports.CostRecordRoutes = function (app) {
  app.get("/costrecord", [CostRecordController.findAll]);

  app.get("/costrecord/lrnumber", [CostRecordController.findLRnumber]);

  app.get("/costrecord/topstats", CostRecordController.findTopStats);

  app.get("/costrecord/stats", CostRecordController.findStats);

  app.get("/costrecord/:id", [CostRecordController.findByID]);

  app.get("/costrecord/searchid/:nationalId", [
    CostRecordController.findCostRecordByNationalId,
  ]);

  app.get("/costrecord/searchname/:ownerName", [
    CostRecordController.findCostRecordByOwnerName,
  ]);

  app.get("/costrecord/searchparcel/:parcelNumber", [
    CostRecordController.findCostRecordByParcelNumber,
  ]);

  app.get("/costrecord/searchphone/:phoneNumber", [
    CostRecordController.findCostRecordByPhoneNumber,
  ]);

  app.post("/costrecord/create", [CostRecordController.create]);

  app.put("/costrecord/update/:id", [CostRecordController.updateByID]);

  app.get("/costrecord/search/:query/:offset", [
    CostRecordController.findByKeyword,
  ]);

  app.get("/costrecord/lrnumber/:lrnumber/:offset", [
    CostRecordController.findLRnumber,
  ]);

  app.get("/costrecord/paginated/:lrnumber/:offset", [
    CostRecordController.findPaginated,
  ]);

  app.delete("/costrecord/delete/:id", [CostRecordController.deleteById]);
};
