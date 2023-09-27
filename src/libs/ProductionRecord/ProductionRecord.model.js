const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const ProductionRecord = require("../../models/ProductionRecord")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
ProductionRecord.sync({ force: false });

exports.createProductionRecord = (ProductionRecordData) => {
  return new Promise(async (resolve, reject) => {
    ProductionRecord.create(ProductionRecordData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(ProductionRecordData);

        console.log(err);
        reject({ error: "ProductionRecord creation failed" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    ProductionRecord.findAll({}).then(
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
        `SELECT * FROM "ProductionRecords" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "ProductionRecords"`
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
    ProductionRecord.findByPk(id).then(
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

exports.findProductionRecordByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    ProductionRecord.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "ProductionRecord Data not found" });
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

exports.findProductionRecordByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    ProductionRecord.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "ProductionRecord Data not found" });
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

exports.findProductionRecordByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    ProductionRecord.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "ProductionRecord Data not found" });
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

exports.findProductionRecordByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    ProductionRecord.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "ProductionRecord Data not found" });
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

exports.updateByID = (ProductionRecordDataData, id) => {
  return new Promise((resolve, reject) => {
    ProductionRecord.update(ProductionRecordDataData, {
      where: {
        ProductionRecordID: id,
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
    ProductionRecord.findAll({
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
    ProductionRecord.destroy({
      where: {
        ProductionRecordID: id,
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
    ProductionRecord.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await ProductionRecord.count();

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
        `SELECT "ProductionRecords"."SubCounty", COUNT(*) AS count FROM public."ProductionRecords" GROUP BY "ProductionRecords"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "ProductionRecords"."Ward", COUNT(*) AS count FROM public."ProductionRecords" GROUP BY "ProductionRecords"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "ProductionRecords"."NewPlotNumber", COUNT(*) AS count FROM public."ProductionRecords" GROUP BY "ProductionRecords"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "ProductionRecords"."Market", COUNT(*) AS count FROM public."ProductionRecords" GROUP BY "ProductionRecords"."Market"`
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
        `SELECT "ProductionRecords"."SubCounty", COUNT(*) AS count FROM public."ProductionRecords" GROUP BY "ProductionRecords"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "ProductionRecords"."Ward", COUNT(*) AS count FROM public."ProductionRecords" GROUP BY "ProductionRecords"."Ward"`
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
