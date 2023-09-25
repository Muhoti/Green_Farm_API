const FarmInfoController = require("./FarmInfo.controller");
const FarmInfoModel = require("./FarmInfo.model");

exports.FarmInfoRoutes = function (app) {
  app.get("/farminfo", [FarmInfoController.findAll]);

  app.get("/farminfo/lrnumber", [FarmInfoController.findLRnumber]);

  app.get("/farminfo/topstats", FarmInfoController.findTopStats);

  app.get("/farminfo/stats", FarmInfoController.findStats);

  app.get("/farminfo/:id", [FarmInfoController.findByID]);

  app.get("/farminfo/searchid/:nationalId", [
    FarmInfoController.findFarmInfoByNationalId,
  ]);

  app.get("/farminfo/searchname/:ownerName", [
    FarmInfoController.findFarmInfoByOwnerName,
  ]);

  app.get("/farminfo/searchparcel/:parcelNumber", [
    FarmInfoController.findFarmInfoByParcelNumber,
  ]);

  app.get("/farminfo/searchphone/:phoneNumber", [
    FarmInfoController.findFarmInfoByPhoneNumber,
  ]);

  app.post("/farminfo/create", [FarmInfoController.create]);

  app.put("/farminfo/update/:id", [FarmInfoController.updateByID]);

  app.get("/farminfo/search/:query/:offset", [
    FarmInfoController.findByKeyword,
  ]);

  app.get("/farminfo/lrnumber/:lrnumber/:offset", [
    FarmInfoController.findLRnumber,
  ]);

  app.get("/farminfo/paginated/:lrnumber/:offset", [
    FarmInfoController.findPaginated,
  ]);

  app.delete("/farminfo/delete/:id", [FarmInfoController.deleteById]);
};
