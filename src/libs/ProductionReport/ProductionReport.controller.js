const ProductionReportModel = require("./ProductionReport.model");

exports.create = (req, res) => {
  ProductionReportModel.createProductionReport(req.body).then(
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
  ProductionReportModel.findAll().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findPaginated = (req, res) => {
  ProductionReportModel.findPaginated(req.params.lrnumber, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findByID = (req, res) => {
  ProductionReportModel.findByID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findProductionReportByNationalId = (req, res) => {
  ProductionReportModel.findProductionReportByNationalId(req.params.nationalId).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findProductionReportByOwnerName = (req, res) => {
  ProductionReportModel.findProductionReportByOwnerName(req.params.ownerName).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findProductionReportByParcelNumber = (req, res) => {
  ProductionReportModel.findProductionReportByParcelNumber(req.params.parcelNumber).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findProductionReportByPhoneNumber = (req, res) => {
  ProductionReportModel.findProductionReportByPhoneNumber(req.params.phoneNumber).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateByID = (req, res) => {
  ProductionReportModel.updateByID(req.body, req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error.message);
    }
  );
};

exports.findByKeyword = (req, res) => {
  ProductionReportModel.findByKeyWord(req.params.query, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.deleteById = (req, res) => {
  ProductionReportModel.deleteById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findLRnumber = (req, res) => {
  ProductionReportModel.findLRnumber().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findLRnumber = (req, res) => {
  ProductionReportModel.findLRnumber(req.params.lrnumber, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findTopStats = (req, res) => {
  ProductionReportModel.findTopStats().then(
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
  ProductionReportModel.findStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
