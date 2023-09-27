const ProductionRecordModel = require("./ProductionRecord.model");

exports.create = (req, res) => {
  ProductionRecordModel.createProductionRecord(req.body).then(
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
  ProductionRecordModel.findAll().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findPaginated = (req, res) => {
  ProductionRecordModel.findPaginated(req.params.lrnumber, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findByID = (req, res) => {
  ProductionRecordModel.findByID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findProductionRecordByNationalId = (req, res) => {
  ProductionRecordModel.findProductionRecordByNationalId(req.params.nationalId).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findProductionRecordByOwnerName = (req, res) => {
  ProductionRecordModel.findProductionRecordByOwnerName(req.params.ownerName).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findProductionRecordByParcelNumber = (req, res) => {
  ProductionRecordModel.findProductionRecordByParcelNumber(req.params.parcelNumber).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findProductionRecordByPhoneNumber = (req, res) => {
  ProductionRecordModel.findProductionRecordByPhoneNumber(req.params.phoneNumber).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateByID = (req, res) => {
  ProductionRecordModel.updateByID(req.body, req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error.message);
    }
  );
};

exports.findByKeyword = (req, res) => {
  ProductionRecordModel.findByKeyWord(req.params.query, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.deleteById = (req, res) => {
  ProductionRecordModel.deleteById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findLRnumber = (req, res) => {
  ProductionRecordModel.findLRnumber().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findLRnumber = (req, res) => {
  ProductionRecordModel.findLRnumber(req.params.lrnumber, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findTopStats = (req, res) => {
  ProductionRecordModel.findTopStats().then(
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
  ProductionRecordModel.findStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
