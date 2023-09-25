const FarmInventoryController = require("./FarmInventory.controller");
const FarmInventoryModel = require("./FarmInventory.model");

exports.FarmInventoryRoutes = function (app) {
  app.get("/farminventory", [FarmInventoryController.findAll]);

  app.get("/farminventory/lrnumber", [FarmInventoryController.findLRnumber]);

  app.get("/farminventory/topstats", FarmInventoryController.findTopStats);

  app.get("/farminventory/stats", FarmInventoryController.findStats);

  app.get("/farminventory/:id", [FarmInventoryController.findByID]);

  app.get("/farminventory/searchid/:nationalId", [
    FarmInventoryController.findFarmInventoryByNationalId,
  ]);

  app.get("/farminventory/searchname/:ownerName", [
    FarmInventoryController.findFarmInventoryByOwnerName,
  ]);

  app.get("/farminventory/searchparcel/:parcelNumber", [
    FarmInventoryController.findFarmInventoryByParcelNumber,
  ]);

  app.get("/farminventory/searchphone/:phoneNumber", [
    FarmInventoryController.findFarmInventoryByPhoneNumber,
  ]);

  app.post("/farminventory/create", [FarmInventoryController.create]);

  app.put("/farminventory/update/:id", [FarmInventoryController.updateByID]);

  app.get("/farminventory/search/:query/:offset", [
    FarmInventoryController.findByKeyword,
  ]);

  app.get("/farminventory/lrnumber/:lrnumber/:offset", [
    FarmInventoryController.findLRnumber,
  ]);

  app.get("/farminventory/paginated/:lrnumber/:offset", [
    FarmInventoryController.findPaginated,
  ]);

  app.delete("/farminventory/delete/:id", [FarmInventoryController.deleteById]);
};
