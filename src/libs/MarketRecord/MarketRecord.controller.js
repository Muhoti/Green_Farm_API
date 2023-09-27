const MarketRecordModel = require("./MarketRecord.model");

exports.create = (req, res) => {
  MarketRecordModel.createMarketRecord(req.body).then(
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
  MarketRecordModel.findAll().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findPaginated = (req, res) => {
  MarketRecordModel.findPaginated(req.params.lrnumber, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findByID = (req, res) => {
  MarketRecordModel.findByID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findMarketRecordByNationalId = (req, res) => {
  MarketRecordModel.findMarketRecordByNationalId(req.params.nationalId).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findMarketRecordByOwnerName = (req, res) => {
  MarketRecordModel.findMarketRecordByOwnerName(req.params.ownerName).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findMarketRecordByParcelNumber = (req, res) => {
  MarketRecordModel.findMarketRecordByParcelNumber(req.params.parcelNumber).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findMarketRecordByPhoneNumber = (req, res) => {
  MarketRecordModel.findMarketRecordByPhoneNumber(req.params.phoneNumber).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateByID = (req, res) => {
  MarketRecordModel.updateByID(req.body, req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error.message);
    }
  );
};

exports.findByKeyword = (req, res) => {
  MarketRecordModel.findByKeyWord(req.params.query, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.deleteById = (req, res) => {
  MarketRecordModel.deleteById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findLRnumber = (req, res) => {
  MarketRecordModel.findLRnumber().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findLRnumber = (req, res) => {
  MarketRecordModel.findLRnumber(req.params.lrnumber, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findTopStats = (req, res) => {
  MarketRecordModel.findTopStats().then(
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
  MarketRecordModel.findStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
