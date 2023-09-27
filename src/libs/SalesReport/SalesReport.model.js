const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const SalesReport = require("../../models/SalesReport")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
SalesReport.sync({ force: false });

exports.createSalesReport = (SalesReportData) => {
  return new Promise(async (resolve, reject) => {
    SalesReport.create(SalesReportData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(SalesReportData);

        console.log(err);
        reject({ error: "SalesReport creation failed" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    SalesReport.findAll({}).then(
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
        `SELECT * FROM "SalesReports" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "SalesReports"`
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
    SalesReport.findByPk(id).then(
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

exports.findSalesReportByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    SalesReport.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "SalesReport Data not found" });
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

exports.findSalesReportByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    SalesReport.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "SalesReport Data not found" });
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

exports.findSalesReportByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    SalesReport.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "SalesReport Data not found" });
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

exports.findSalesReportByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    SalesReport.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "SalesReport Data not found" });
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

exports.updateByID = (SalesReportDataData, id) => {
  return new Promise((resolve, reject) => {
    SalesReport.update(SalesReportDataData, {
      where: {
        SalesReportID: id,
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
    SalesReport.findAll({
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
    SalesReport.destroy({
      where: {
        SalesReportID: id,
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
    SalesReport.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await SalesReport.count();

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
        `SELECT "SalesReports"."SubCounty", COUNT(*) AS count FROM public."SalesReports" GROUP BY "SalesReports"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "SalesReports"."Ward", COUNT(*) AS count FROM public."SalesReports" GROUP BY "SalesReports"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "SalesReports"."NewPlotNumber", COUNT(*) AS count FROM public."SalesReports" GROUP BY "SalesReports"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "SalesReports"."Market", COUNT(*) AS count FROM public."SalesReports" GROUP BY "SalesReports"."Market"`
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
        `SELECT "SalesReports"."SubCounty", COUNT(*) AS count FROM public."SalesReports" GROUP BY "SalesReports"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "SalesReports"."Ward", COUNT(*) AS count FROM public."SalesReports" GROUP BY "SalesReports"."Ward"`
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
