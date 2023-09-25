const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const Utility = require("../../models/Utility")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
Utility.sync({ force: false });

exports.createUtility = (UtilityData) => {
  return new Promise(async (resolve, reject) => {
    Utility.create(UtilityData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(UtilityData);

        console.log(err);
        reject({ error: "Utility creation failed" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    Utility.findAll({}).then(
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
        `SELECT * FROM "Utilitys" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "Utilitys"`
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
    Utility.findByPk(id).then(
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

exports.findUtilityByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    Utility.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Utility Data not found" });
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

exports.findUtilityByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    Utility.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Utility Data not found" });
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

exports.findUtilityByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    Utility.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Utility Data not found" });
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

exports.findUtilityByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    Utility.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Utility Data not found" });
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

exports.updateByID = (UtilityDataData, id) => {
  return new Promise((resolve, reject) => {
    Utility.update(UtilityDataData, {
      where: {
        UtilityID: id,
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
    Utility.findAll({
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
    Utility.destroy({
      where: {
        UtilityID: id,
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
    Utility.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await Utility.count();

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
        `SELECT "Utilitys"."SubCounty", COUNT(*) AS count FROM public."Utilitys" GROUP BY "Utilitys"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "Utilitys"."Ward", COUNT(*) AS count FROM public."Utilitys" GROUP BY "Utilitys"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "Utilitys"."NewPlotNumber", COUNT(*) AS count FROM public."Utilitys" GROUP BY "Utilitys"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "Utilitys"."Market", COUNT(*) AS count FROM public."Utilitys" GROUP BY "Utilitys"."Market"`
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
        `SELECT "Utilitys"."SubCounty", COUNT(*) AS count FROM public."Utilitys" GROUP BY "Utilitys"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "Utilitys"."Ward", COUNT(*) AS count FROM public."Utilitys" GROUP BY "Utilitys"."Ward"`
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
