const ProductController = require("./Product.controller");
const ProductModel = require("./Product.model");

exports.ProductRoutes = function (app) {
  app.get("/product", [ProductController.findAll]);

  app.get("/product/lrnumber", [ProductController.findLRnumber]);

  app.get("/product/topstats", ProductController.findTopStats);

  app.get("/product/stats", ProductController.findStats);

  app.get("/product/:id", [ProductController.findByID]);

  app.get("/product/searchid/:nationalId", [
    ProductController.findProductByNationalId,
  ]);

  app.get("/product/searchname/:ownerName", [
    ProductController.findProductByOwnerName,
  ]);

  app.get("/product/searchparcel/:parcelNumber", [
    ProductController.findProductByParcelNumber,
  ]);

  app.get("/product/searchphone/:phoneNumber", [
    ProductController.findProductByPhoneNumber,
  ]);

  app.post("/product/create", [ProductController.create]);

  app.put("/product/update/:id", [ProductController.updateByID]);

  app.get("/product/search/:query/:offset", [ProductController.findByKeyword]);

  app.get("/product/lrnumber/:lrnumber/:offset", [
    ProductController.findLRnumber,
  ]);

  app.get("/product/paginated/:lrnumber/:offset", [
    ProductController.findPaginated,
  ]);

  app.delete("/product/delete/:id", [ProductController.deleteById]);
};
