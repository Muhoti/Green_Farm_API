const FacilityController = require("./Facility.controller");
const FacilityModel = require("./Facility.model");

exports.FacilityRoutes = function (app) {
  app.get("/facility", [FacilityController.findAll]);

  app.get("/facility/lrnumber", [FacilityController.findLRnumber]);

  app.get("/facility/topstats", FacilityController.findTopStats);

  app.get("/facility/stats", FacilityController.findStats);

  app.get("/facility/:id", [FacilityController.findByID]);

  app.get("/facility/searchid/:nationalId", [
    FacilityController.findFacilityByNationalId,
  ]);

  app.get("/facility/searchname/:ownerName", [
    FacilityController.findFacilityByOwnerName,
  ]);

  app.get("/facility/searchparcel/:parcelNumber", [
    FacilityController.findFacilityByParcelNumber,
  ]);

  app.get("/facility/searchphone/:phoneNumber", [
    FacilityController.findFacilityByPhoneNumber,
  ]);

  app.post("/facility/create", [FacilityController.create]);

  app.put("/facility/update/:id", [FacilityController.updateByID]);

  app.get("/facility/search/:query/:offset", [
    FacilityController.findByKeyword,
  ]);

  app.get("/facility/lrnumber/:lrnumber/:offset", [
    FacilityController.findLRnumber,
  ]);

  app.get("/facility/paginated/:lrnumber/:offset", [
    FacilityController.findPaginated,
  ]);

  app.delete("/facility/delete/:id", [FacilityController.deleteById]);
};
