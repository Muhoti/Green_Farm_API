const AuthController = require("./Auth.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.AuthRoutes = function (app) {
  app.post("/auth/register", [AuthController.insert]);

  app.post("/auth/login", [AuthController.login]);
};
