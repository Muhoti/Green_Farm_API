const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const HumanResource = require("../../models/HumanResource")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
HumanResource.sync({ force: false });

exports.createHumanResource = (HumanResourceData) => {
  return new Promise(async (resolve, reject) => {
    HumanResource.create(HumanResourceData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(HumanResourceData);

        console.log(err);
        reject({ error: "HumanResource creation failed" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    HumanResource.findAll({}).then(
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
        `SELECT * FROM "HumanResources" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "HumanResources"`
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
    HumanResource.findByPk(id).then(
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

exports.findHumanResourceByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    HumanResource.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "HumanResource Data not found" });
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

exports.findHumanResourceByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    HumanResource.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "HumanResource Data not found" });
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

exports.findHumanResourceByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    HumanResource.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "HumanResource Data not found" });
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

exports.findHumanResourceByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    HumanResource.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "HumanResource Data not found" });
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

exports.updateByID = (HumanResourceDataData, id) => {
  return new Promise((resolve, reject) => {
    HumanResource.update(HumanResourceDataData, {
      where: {
        HumanResourceID: id,
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
    HumanResource.findAll({
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
    HumanResource.destroy({
      where: {
        HumanResourceID: id,
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
    HumanResource.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await HumanResource.count();

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
        `SELECT "HumanResources"."SubCounty", COUNT(*) AS count FROM public."HumanResources" GROUP BY "HumanResources"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "HumanResources"."Ward", COUNT(*) AS count FROM public."HumanResources" GROUP BY "HumanResources"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "HumanResources"."NewPlotNumber", COUNT(*) AS count FROM public."HumanResources" GROUP BY "HumanResources"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "HumanResources"."Market", COUNT(*) AS count FROM public."HumanResources" GROUP BY "HumanResources"."Market"`
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
        `SELECT "HumanResources"."SubCounty", COUNT(*) AS count FROM public."HumanResources" GROUP BY "HumanResources"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "HumanResources"."Ward", COUNT(*) AS count FROM public."HumanResources" GROUP BY "HumanResources"."Ward"`
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
