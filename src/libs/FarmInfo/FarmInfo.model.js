const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const FarmInfo = require("../../models/FarmInfo")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
FarmInfo.sync({ force: false });

exports.createFarmInfo = (FarmInfoData) => {
  return new Promise(async (resolve, reject) => {
    FarmInfo.create(FarmInfoData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(FarmInfoData);

        console.log(err);
        reject({ error: "FarmInfo creation failed" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    FarmInfo.findAll({}).then(
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
        `SELECT * FROM "FarmInfos" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "FarmInfos"`
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
    FarmInfo.findByPk(id).then(
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

exports.findFarmInfoByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    FarmInfo.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmInfo Data not found" });
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

exports.findFarmInfoByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    FarmInfo.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmInfo Data not found" });
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

exports.findFarmInfoByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    FarmInfo.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmInfo Data not found" });
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

exports.findFarmInfoByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    FarmInfo.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmInfo Data not found" });
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

exports.updateByID = (FarmInfoDataData, id) => {
  return new Promise((resolve, reject) => {
    FarmInfo.update(FarmInfoDataData, {
      where: {
        FarmInfoID: id,
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
    FarmInfo.findAll({
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
    FarmInfo.destroy({
      where: {
        FarmInfoID: id,
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
    FarmInfo.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await FarmInfo.count();

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
        `SELECT "FarmInfos"."SubCounty", COUNT(*) AS count FROM public."FarmInfos" GROUP BY "FarmInfos"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "FarmInfos"."Ward", COUNT(*) AS count FROM public."FarmInfos" GROUP BY "FarmInfos"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "FarmInfos"."NewPlotNumber", COUNT(*) AS count FROM public."FarmInfos" GROUP BY "FarmInfos"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "FarmInfos"."Market", COUNT(*) AS count FROM public."FarmInfos" GROUP BY "FarmInfos"."Market"`
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
        `SELECT "FarmInfos"."SubCounty", COUNT(*) AS count FROM public."FarmInfos" GROUP BY "FarmInfos"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "FarmInfos"."Ward", COUNT(*) AS count FROM public."FarmInfos" GROUP BY "FarmInfos"."Ward"`
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
