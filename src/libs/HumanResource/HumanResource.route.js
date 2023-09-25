const HumanResourceController = require("./HumanResource.controller");
const HumanResourceModel = require("./HumanResource.model");

exports.HumanResourceRoutes = function (app) {
  app.get("/humanresource", [HumanResourceController.findAll]);

  app.get("/humanresource/lrnumber", [HumanResourceController.findLRnumber]);

  app.get("/humanresource/topstats", HumanResourceController.findTopStats);

  app.get("/humanresource/stats", HumanResourceController.findStats);

  app.get("/humanresource/:id", [HumanResourceController.findByID]);

  app.get("/humanresource/searchid/:nationalId", [
    HumanResourceController.findHumanResourceByNationalId,
  ]);

  app.get("/humanresource/searchname/:ownerName", [
    HumanResourceController.findHumanResourceByOwnerName,
  ]);

  app.get("/humanresource/searchparcel/:parcelNumber", [
    HumanResourceController.findHumanResourceByParcelNumber,
  ]);

  app.get("/humanresource/searchphone/:phoneNumber", [
    HumanResourceController.findHumanResourceByPhoneNumber,
  ]);

  app.post("/humanresource/create", [HumanResourceController.create]);

  app.put("/humanresource/update/:id", [HumanResourceController.updateByID]);

  app.get("/humanresource/search/:query/:offset", [
    HumanResourceController.findByKeyword,
  ]);

  app.get("/humanresource/lrnumber/:lrnumber/:offset", [
    HumanResourceController.findLRnumber,
  ]);

  app.get("/humanresource/paginated/:lrnumber/:offset", [
    HumanResourceController.findPaginated,
  ]);

  app.delete("/humanresource/delete/:id", [HumanResourceController.deleteById]);
};
