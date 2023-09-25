const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const FarmInventory = require("../../models/FarmInventory")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
FarmInventory.sync({ force: false });

exports.createFarmInventory = (FarmInventoryData) => {
  return new Promise(async (resolve, reject) => {
    FarmInventory.create(FarmInventoryData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(FarmInventoryData);

        console.log(err);
        reject({ error: "FarmInventory creation failed" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    FarmInventory.findAll({}).then(
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
        `SELECT * FROM "FarmInventorys" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "FarmInventorys"`
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
    FarmInventory.findByPk(id).then(
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

exports.findFarmInventoryByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    FarmInventory.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmInventory Data not found" });
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

exports.findFarmInventoryByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    FarmInventory.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmInventory Data not found" });
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

exports.findFarmInventoryByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    FarmInventory.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmInventory Data not found" });
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

exports.findFarmInventoryByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    FarmInventory.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "FarmInventory Data not found" });
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

exports.updateByID = (FarmInventoryDataData, id) => {
  return new Promise((resolve, reject) => {
    FarmInventory.update(FarmInventoryDataData, {
      where: {
        FarmInventoryID: id,
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
    FarmInventory.findAll({
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
    FarmInventory.destroy({
      where: {
        FarmInventoryID: id,
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
    FarmInventory.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await FarmInventory.count();

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
        `SELECT "FarmInventorys"."SubCounty", COUNT(*) AS count FROM public."FarmInventorys" GROUP BY "FarmInventorys"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "FarmInventorys"."Ward", COUNT(*) AS count FROM public."FarmInventorys" GROUP BY "FarmInventorys"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "FarmInventorys"."NewPlotNumber", COUNT(*) AS count FROM public."FarmInventorys" GROUP BY "FarmInventorys"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "FarmInventorys"."Market", COUNT(*) AS count FROM public."FarmInventorys" GROUP BY "FarmInventorys"."Market"`
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
        `SELECT "FarmInventorys"."SubCounty", COUNT(*) AS count FROM public."FarmInventorys" GROUP BY "FarmInventorys"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "FarmInventorys"."Ward", COUNT(*) AS count FROM public."FarmInventorys" GROUP BY "FarmInventorys"."Ward"`
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
