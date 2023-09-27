const MarketRecordController = require("./MarketRecord.controller");
const MarketRecordModel = require("./MarketRecord.model");

exports.MarketRecordRoutes = function (app) {
  app.get("/marketrecord", [MarketRecordController.findAll]);

  app.get("/marketrecord/lrnumber", [MarketRecordController.findLRnumber]);

  app.get("/marketrecord/topstats", MarketRecordController.findTopStats);

  app.get("/marketrecord/stats", MarketRecordController.findStats);

  app.get("/marketrecord/:id", [MarketRecordController.findByID]);

  app.get("/marketrecord/searchid/:nationalId", [
    MarketRecordController.findMarketRecordByNationalId,
  ]);

  app.get("/marketrecord/searchname/:ownerName", [
    MarketRecordController.findMarketRecordByOwnerName,
  ]);

  app.get("/marketrecord/searchparcel/:parcelNumber", [
    MarketRecordController.findMarketRecordByParcelNumber,
  ]);

  app.get("/marketrecord/searchphone/:phoneNumber", [
    MarketRecordController.findMarketRecordByPhoneNumber,
  ]);

  app.post("/marketrecord/create", [MarketRecordController.create]);

  app.put("/marketrecord/update/:id", [MarketRecordController.updateByID]);

  app.get("/MarketRecord/search/:query/:offset", [
    MarketRecordController.findByKeyword,
  ]);

  app.get("/marketrecord/lrnumber/:lrnumber/:offset", [
    MarketRecordController.findLRnumber,
  ]);

  app.get("/marketrecord/paginated/:lrnumber/:offset", [
    MarketRecordController.findPaginated,
  ]);

  app.delete("/marketrecord/delete/:id", [
    MarketRecordController.deleteById,
  ]);
};
