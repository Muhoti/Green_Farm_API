const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const CostReport = require("../../models/CostReport")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
CostReport.sync({ force: false });

exports.createCostReport = (CostReportData) => {
  return new Promise(async (resolve, reject) => {
    CostReport.create(CostReportData).then(
      (result) => {
        resolve({
          success: "Created successfully!",
        });
      },
      (err) => {
        console.log(CostReportData);
        console.log(err);
        reject({ error: "CostReport creation failed!" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    CostReport.findAll({}).then(
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
        `SELECT * FROM "CostReports" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "CostReports"`
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
    CostReport.findByPk(id).then(
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

exports.findCostReportByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    CostReport.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "CostReport Data not found" });
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

exports.findCostReportByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    CostReport.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "CostReport Data not found" });
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

exports.findCostReportByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    CostReport.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "CostReport Data not found" });
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

exports.findCostReportByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    CostReport.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "CostReport Data not found" });
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

exports.updateByID = (CostReportDataData, id) => {
  return new Promise((resolve, reject) => {
    CostReport.update(CostReportDataData, {
      where: {
        CostReportID: id,
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
    CostReport.findAll({
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
    CostReport.destroy({
      where: {
        CostReportID: id,
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
    CostReport.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await CostReport.count();

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
        `SELECT "CostReports"."SubCounty", COUNT(*) AS count FROM public."CostReports" GROUP BY "CostReports"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "CostReports"."Ward", COUNT(*) AS count FROM public."CostReports" GROUP BY "CostReports"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "CostReports"."NewPlotNumber", COUNT(*) AS count FROM public."CostReports" GROUP BY "CostReports"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "CostReports"."Market", COUNT(*) AS count FROM public."CostReports" GROUP BY "CostReports"."Market"`
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
        `SELECT "CostReports"."SubCounty", COUNT(*) AS count FROM public."CostReports" GROUP BY "CostReports"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "CostReports"."Ward", COUNT(*) AS count FROM public."CostReports" GROUP BY "CostReports"."Ward"`
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
