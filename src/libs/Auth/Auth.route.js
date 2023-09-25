const AuthController = require("./Auth.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.AuthRoutes = function (app) {
  app.post("/auth/register", [AuthController.insert]);

  app.post("/auth/login", [AuthController.login]);

  app.delete("/auth/:authID", [AuthController.deleteAuthById]);

  app.get("/auth/:authID", [AuthController.findAuthById]);

  app.get("/auth", [AuthController.findAllAuth]);
};
