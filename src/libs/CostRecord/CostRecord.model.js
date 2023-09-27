const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const CostRecord = require("../../models/CostRecord")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
CostRecord.sync({ force: false });

exports.createCostRecord = (CostRecordData) => {
  return new Promise(async (resolve, reject) => {
    CostRecord.create(CostRecordData).then(
      (result) => {
        resolve({
          success: "Created successfully!",
        });
      },
      (err) => {
        console.log(CostRecordData);
        console.log(err);
        reject({ error: "CostRecord creation failed!" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    CostRecord.findAll({}).then(
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
        `SELECT * FROM "CostRecords" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "CostRecords"`
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
    CostRecord.findByPk(id).then(
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

exports.findCostRecordByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    CostRecord.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "CostRecord Data not found" });
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

exports.findCostRecordByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    CostRecord.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "CostRecord Data not found" });
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

exports.findCostRecordByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    CostRecord.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "CostRecord Data not found" });
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

exports.findCostRecordByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    CostRecord.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "CostRecord Data not found" });
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

exports.updateByID = (CostRecordDataData, id) => {
  return new Promise((resolve, reject) => {
    CostRecord.update(CostRecordDataData, {
      where: {
        CostRecordID: id,
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
    CostRecord.findAll({
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
    CostRecord.destroy({
      where: {
        CostRecordID: id,
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
    CostRecord.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await CostRecord.count();

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
        `SELECT "CostRecords"."SubCounty", COUNT(*) AS count FROM public."CostRecords" GROUP BY "CostRecords"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "CostRecords"."Ward", COUNT(*) AS count FROM public."CostRecords" GROUP BY "CostRecords"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "CostRecords"."NewPlotNumber", COUNT(*) AS count FROM public."CostRecords" GROUP BY "CostRecords"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "CostRecords"."Market", COUNT(*) AS count FROM public."CostRecords" GROUP BY "CostRecords"."Market"`
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
        `SELECT "CostRecords"."SubCounty", COUNT(*) AS count FROM public."CostRecords" GROUP BY "CostRecords"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "CostRecords"."Ward", COUNT(*) AS count FROM public."CostRecords" GROUP BY "CostRecords"."Ward"`
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
