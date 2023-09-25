const Auth = require("../../models/Auth");
const AuthModel = require("./Auth.model");

exports.insert = (req, res) => {
  console.log(req);
  AuthModel.createAuth(req.body).then(
    (result) => {
      res.status(200).send({ success: "User Created successfully" });
    },
    (err) => {
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

exports.deleteAuthById = (req, res) => {
  AuthModel.deleteAuthById(req.params.authID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAuthById = (req, res) => {
  AuthModel.findAuthById(req.params.authID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};

exports.findAllAuth = (req, res) => {
  AuthModel.findAllAuth().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
