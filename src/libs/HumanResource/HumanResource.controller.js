const HumanResourceModel = require("./HumanResource.model");

exports.create = (req, res) => {
  HumanResourceModel.createHumanResource(req.body).then(
    (result) => {
      console.log(result);
      res.status(200).send(result);
    },
    (err) => {
      console.log(res.body);

      console.log(err);
      res.status(203).send(err);
    }
  );
};

exports.findAll = (req, res) => {
  HumanResourceModel.findAll().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findPaginated = (req, res) => {
  HumanResourceModel.findPaginated(req.params.lrnumber, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findByID = (req, res) => {
  HumanResourceModel.findByID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findHumanResourceByNationalId = (req, res) => {
  HumanResourceModel.findHumanResourceByNationalId(req.params.nationalId).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findHumanResourceByOwnerName = (req, res) => {
  HumanResourceModel.findHumanResourceByOwnerName(req.params.ownerName).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findHumanResourceByParcelNumber = (req, res) => {
  HumanResourceModel.findHumanResourceByParcelNumber(req.params.parcelNumber).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findHumanResourceByPhoneNumber = (req, res) => {
  HumanResourceModel.findHumanResourceByPhoneNumber(req.params.phoneNumber).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateByID = (req, res) => {
  HumanResourceModel.updateByID(req.body, req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error.message);
    }
  );
};

exports.findByKeyword = (req, res) => {
  HumanResourceModel.findByKeyWord(req.params.query, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.deleteById = (req, res) => {
  HumanResourceModel.deleteById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findLRnumber = (req, res) => {
  HumanResourceModel.findLRnumber().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findLRnumber = (req, res) => {
  HumanResourceModel.findLRnumber(req.params.lrnumber, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findTopStats = (req, res) => {
  HumanResourceModel.findTopStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
      console.log(err);
    }
  );
};

exports.findStats = (req, res) => {
  HumanResourceModel.findStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
