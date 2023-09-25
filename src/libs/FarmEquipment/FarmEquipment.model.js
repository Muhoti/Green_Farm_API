const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const FarmEquipment = require("../../models/FarmEquipment")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
FarmEquipment.sync({ force: false });

exports.createFarmEquipment = (FarmEquipmentData) => {
  return new Promise(async (resolve, reject) => {
    FarmEquipment.create(FarmEquipmentData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(FarmEquipmentData);

        console.log(err);
        reject({ error: "FarmEquipment creation failed" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    FarmEquipment.findAll({}).then(
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
        `SELECT * FROM "FarmEquipments" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "FarmEquipments"`
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
    FarmEquipment.findByPk(id).then(
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

exports.findFarmEquipmentByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    FarmEquipment.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmEquipment Data not found" });
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

exports.findFarmEquipmentByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    FarmEquipment.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmEquipment Data not found" });
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

exports.findFarmEquipmentByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    FarmEquipment.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmEquipment Data not found" });
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

exports.findFarmEquipmentByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    FarmEquipment.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmEquipment Data not found" });
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

exports.updateByID = (FarmEquipmentDataData, id) => {
  return new Promise((resolve, reject) => {
    FarmEquipment.update(FarmEquipmentDataData, {
      where: {
        FarmEquipmentID: id,
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
    FarmEquipment.findAll({
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
    FarmEquipment.destroy({
      where: {
        FarmEquipmentID: id,
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
    FarmEquipment.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await FarmEquipment.count();

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
        `SELECT "FarmEquipments"."SubCounty", COUNT(*) AS count FROM public."FarmEquipments" GROUP BY "FarmEquipments"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "FarmEquipments"."Ward", COUNT(*) AS count FROM public."FarmEquipments" GROUP BY "FarmEquipments"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "FarmEquipments"."NewPlotNumber", COUNT(*) AS count FROM public."FarmEquipments" GROUP BY "FarmEquipments"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "FarmEquipments"."Market", COUNT(*) AS count FROM public."FarmEquipments" GROUP BY "FarmEquipments"."Market"`
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
        `SELECT "FarmEquipments"."SubCounty", COUNT(*) AS count FROM public."FarmEquipments" GROUP BY "FarmEquipments"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "FarmEquipments"."Ward", COUNT(*) AS count FROM public."FarmEquipments" GROUP BY "FarmEquipments"."Ward"`
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
