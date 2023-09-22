const Auth = require("../../models/Auth");
const AuthModel = require("./Auth.model");

exports.insert = (req, res) => {
  AuthModel.createAuth(req.body).then(
    (result) => {
      res.status(200).send({ success: "User Created successfully" });
    },
    (err) => {
      console.log(err);
      res.status(203).send(err);
    }
  );
};

exports.login = (req, res) => {
  AuthModel.loginAuth(res, req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      console.log(err);
      res.status(203).send(err);
    }
  );
};
