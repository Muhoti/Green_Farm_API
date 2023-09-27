const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const ProductionReport = require("../../models/ProductionReport")(
  sequelize,
  Sequelize
);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
ProductionReport.sync({ force: false });

exports.createProductionReport = (ProductionReportData) => {
  return new Promise(async (resolve, reject) => {
    ProductionReport.create(ProductionReportData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(ProductionReportData);

        console.log(err);
        reject({ error: "ProductionReport creation failed" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    ProductionReport.findAll({}).then(
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
        `SELECT * FROM "ProductionReports" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "ProductionReports"`
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
    ProductionReport.findByPk(id).then(
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

exports.findProductionReportByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    ProductionReport.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "ProductionReport Data not found" });
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

exports.findProductionReportByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    ProductionReport.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "ProductionReport Data not found" });
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

exports.findProductionReportByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    ProductionReport.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "ProductionReport Data not found" });
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

exports.findProductionReportByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    ProductionReport.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "ProductionReport Data not found" });
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

exports.updateByID = (ProductionReportDataData, id) => {
  return new Promise((resolve, reject) => {
    ProductionReport.update(ProductionReportDataData, {
      where: {
        ProductionReportID: id,
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
    ProductionReport.findAll({
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
    ProductionReport.destroy({
      where: {
        ProductionReportID: id,
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
    ProductionReport.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await ProductionReport.count();

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
        `SELECT "ProductionReports"."SubCounty", COUNT(*) AS count FROM public."ProductionReports" GROUP BY "ProductionReports"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "ProductionReports"."Ward", COUNT(*) AS count FROM public."ProductionReports" GROUP BY "ProductionReports"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "ProductionReports"."NewPlotNumber", COUNT(*) AS count FROM public."ProductionReports" GROUP BY "ProductionReports"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "ProductionReports"."Market", COUNT(*) AS count FROM public."ProductionReports" GROUP BY "ProductionReports"."Market"`
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
        `SELECT "ProductionReports"."SubCounty", COUNT(*) AS count FROM public."ProductionReports" GROUP BY "ProductionReports"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "ProductionReports"."Ward", COUNT(*) AS count FROM public."ProductionReports" GROUP BY "ProductionReports"."Ward"`
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
