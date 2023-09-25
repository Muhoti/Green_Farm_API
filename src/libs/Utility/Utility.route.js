const UtilityController = require("./Utility.controller");
const UtilityModel = require("./Utility.model");

exports.UtilityRoutes = function (app) {
  app.get("/utility", [UtilityController.findAll]);

  app.get("/utility/lrnumber", [UtilityController.findLRnumber]);

  app.get("/utility/topstats", UtilityController.findTopStats);

  app.get("/utility/stats", UtilityController.findStats);

  app.get("/utility/:id", [UtilityController.findByID]);

  app.get("/utility/searchid/:nationalId", [
    UtilityController.findUtilityByNationalId,
  ]);

  app.get("/utility/searchname/:ownerName", [
    UtilityController.findUtilityByOwnerName,
  ]);

  app.get("/utility/searchparcel/:parcelNumber", [
    UtilityController.findUtilityByParcelNumber,
  ]);

  app.get("/utility/searchphone/:phoneNumber", [
    UtilityController.findUtilityByPhoneNumber,
  ]);

  app.post("/utility/create", [UtilityController.create]);

  app.put("/utility/update/:id", [UtilityController.updateByID]);

  app.get("/utility/search/:query/:offset", [UtilityController.findByKeyword]);

  app.get("/utility/lrnumber/:lrnumber/:offset", [
    UtilityController.findLRnumber,
  ]);

  app.get("/utility/paginated/:lrnumber/:offset", [
    UtilityController.findPaginated,
  ]);

  app.delete("/utility/delete/:id", [UtilityController.deleteById]);
};
