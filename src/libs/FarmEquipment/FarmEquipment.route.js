const FarmEquipmentController = require("./FarmEquipment.controller");
const FarmEquipmentModel = require("./FarmEquipment.model");

exports.FarmEquipmentRoutes = function (app) {
  app.get("/farmequipment", [FarmEquipmentController.findAll]);

  app.get("/farmequipment/lrnumber", [FarmEquipmentController.findLRnumber]);

  app.get("/farmequipment/topstats", FarmEquipmentController.findTopStats);

  app.get("/farmequipment/stats", FarmEquipmentController.findStats);

  app.get("/farmequipment/:id", [FarmEquipmentController.findByID]);

  app.get("/farmequipment/searchid/:nationalId", [
    FarmEquipmentController.findFarmEquipmentByNationalId,
  ]);

  app.get("/farmequipment/searchname/:ownerName", [
    FarmEquipmentController.findFarmEquipmentByOwnerName,
  ]);

  app.get("/farmequipment/searchparcel/:parcelNumber", [
    FarmEquipmentController.findFarmEquipmentByParcelNumber,
  ]);

  app.get("/farmequipment/searchphone/:phoneNumber", [
    FarmEquipmentController.findFarmEquipmentByPhoneNumber,
  ]);

  app.post("/farmequipment/create", [FarmEquipmentController.create]);

  app.put("/farmequipment/update/:id", [FarmEquipmentController.updateByID]);

  app.get("/farmequipment/search/:query/:offset", [
    FarmEquipmentController.findByKeyword,
  ]);

  app.get("/farmequipment/lrnumber/:lrnumber/:offset", [
    FarmEquipmentController.findLRnumber,
  ]);

  app.get("/farmequipment/paginated/:lrnumber/:offset", [
    FarmEquipmentController.findPaginated,
  ]);

  app.delete("/farmequipment/delete/:id", [FarmEquipmentController.deleteById]);
};
