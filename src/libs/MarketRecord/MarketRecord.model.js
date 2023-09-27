const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const MarketRecord = require("../../models/MarketRecord")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
MarketRecord.sync({ force: false });

exports.createMarketRecord = (MarketRecordData) => {
  return new Promise(async (resolve, reject) => {
    MarketRecord.create(MarketRecordData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(MarketRecordData);

        console.log(err);
        reject({ error: "MarketRecord creation failed" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    MarketRecord.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        console.log(err);
        reject({ error: err });
      }
    );
  });
};

exports.findPaginated = (lrnumber, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "MarketRecords" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "MarketRecords"`
      );

      resolve({ data: data, total: count[0].count });
    } catch (error) {
      console.log(error);
      reject({ error: "failed" });
    }
  });
};

exports.findByID = (id) => {
  return new Promise(async (resolve, reject) => {
    MarketRecord.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, message: "Data not found" });
        }
        resolve(result);
      },
      (error) => {
        reject({ error: error });
      }
    );
  });
};

exports.findMarketRecordByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    MarketRecord.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "MarketRecord Data not found" });
        }
        resolve(result);
      },
      (err) => {
        console.log(err);
        reject({ error: "failed" });
      }
    );
  });
};

exports.findMarketRecordByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    MarketRecord.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "MarketRecord Data not found" });
        }
        resolve(result);
      },
      (err) => {
        console.log(err);
        reject({ error: "failed" });
      }
    );
  });
};

exports.findMarketRecordByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    MarketRecord.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "MarketRecord Data not found" });
        }
        resolve(result);
      },
      (err) => {
        console.log(err);
        reject({ error: "failed" });
      }
    );
  });
};

exports.findMarketRecordByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    MarketRecord.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "MarketRecord Data not found" });
        }
        resolve(result);
      },
      (err) => {
        console.log(err);
        reject({ error: "failed" });
      }
    );
  });
};

exports.updateByID = (MarketRecordDataData, id) => {
  return new Promise((resolve, reject) => {
    MarketRecord.update(MarketRecordDataData, {
      where: {
        MarketRecordID: id,
      },
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        console.log(err);
        reject(err);
      }
    );
  });
};

exports.findByKeyWord = (query, offset) => {
  return new Promise((resolve, reject) => {
    MarketRecord.findAll({
      where: {
        NationalID: {
          [Sequelize.Op.iLike]: `%${query}%`,
        },
      },
      offset: offset,
      limit: 5,
    }).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, message: "Not found!!" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.deleteById = (id) => {
  return new Promise((resolve, reject) => {
    MarketRecord.destroy({
      where: {
        MarketRecordID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ message: "Deleted Successfully" });
        else reject({ message: "Entry does not exist" });
      },
      (error) => {
        reject({ error: error });
      }
    );
  });
};

exports.findLRnumber = () => {
  return new Promise((resolve, reject) => {
    MarketRecord.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await MarketRecord.count();

        resolve({
          result: result,
          total: total,
        });
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findTopStats = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [sub] = await sequelize.query(
        `SELECT "MarketRecords"."SubCounty", COUNT(*) AS count FROM public."MarketRecords" GROUP BY "MarketRecords"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "MarketRecords"."Ward", COUNT(*) AS count FROM public."MarketRecords" GROUP BY "MarketRecords"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "MarketRecords"."NewPlotNumber", COUNT(*) AS count FROM public."MarketRecords" GROUP BY "MarketRecords"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "MarketRecords"."Market", COUNT(*) AS count FROM public."MarketRecords" GROUP BY "MarketRecords"."Market"`
      );

      resolve({
        Subcounties: sub[0].count,
        Wards: war[0].count,
        Allplots: tpl[0].count,
        Markets: mkts[0].count,
      });
    } catch (error) {
      console.log(error);
      reject({ error: "Retrieve failed" });
    }
  });
};

exports.findStats = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [sub] = await sequelize.query(
        `SELECT "MarketRecords"."SubCounty", COUNT(*) AS count FROM public."MarketRecords" GROUP BY "MarketRecords"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "MarketRecords"."Ward", COUNT(*) AS count FROM public."MarketRecords" GROUP BY "MarketRecords"."Ward"`
      );

      resolve({
        subcounties: sub,
        wards: war,
      });
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
