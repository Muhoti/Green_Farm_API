const ForestController = require("./Forest.controller");
const ForestModel = require("./Forest.model");

exports.ForestRoutes = function (app) {
  app.get("/forest", [ForestController.findAll]);

  app.get("/forest/lrnumber", [ForestController.findLRnumber]);

  app.get("/forest/topstats", ForestController.findTopStats);

  app.get("/forest/stats", ForestController.findStats);

  app.get("/forest/:id", [ForestController.findByID]);

  app.get("/forest/searchid/:nationalId", [
    ForestController.findForestByNationalId,
  ]);

  app.get("/forest/searchname/:ownerName", [
    ForestController.findForestByOwnerName,
  ]);

  app.get("/forest/searchparcel/:parcelNumber", [
    ForestController.findForestByParcelNumber,
  ]);

  app.get("/forest/searchphone/:phoneNumber", [
    ForestController.findForestByPhoneNumber,
  ]);

  app.post("/forest/create", [ForestController.create]);

  app.put("/forest/update/:id", [ForestController.updateByID]);

  app.get("/forest/search/:query/:offset", [ForestController.findByKeyword]);

  app.get("/forest/lrnumber/:lrnumber/:offset", [
    ForestController.findLRnumber,
  ]);

  app.get("/forest/paginated/:lrnumber/:offset", [
    ForestController.findPaginated,
  ]);

  app.delete("/forest/delete/:id", [ForestController.deleteById]);
};
