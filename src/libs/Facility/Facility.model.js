const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const Facility = require("../../models/Facility")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
Facility.sync({ force: false });

exports.createFacility = (FacilityData) => {
  return new Promise(async (resolve, reject) => {
    Facility.create(FacilityData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(FacilityData);

        console.log(err);
        reject({ error: "Facility creation failed" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    Facility.findAll({}).then(
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
        `SELECT * FROM "Facilitys" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "Facilitys"`
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
    Facility.findByPk(id).then(
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

exports.findFacilityByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    Facility.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Facility Data not found" });
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

exports.findFacilityByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    Facility.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Facility Data not found" });
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

exports.findFacilityByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    Facility.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Facility Data not found" });
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

exports.findFacilityByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    Facility.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Facility Data not found" });
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

exports.updateByID = (FacilityDataData, id) => {
  return new Promise((resolve, reject) => {
    Facility.update(FacilityDataData, {
      where: {
        FacilityID: id,
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
    Facility.findAll({
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
    Facility.destroy({
      where: {
        FacilityID: id,
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
    Facility.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await Facility.count();

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
        `SELECT "Facilitys"."SubCounty", COUNT(*) AS count FROM public."Facilitys" GROUP BY "Facilitys"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "Facilitys"."Ward", COUNT(*) AS count FROM public."Facilitys" GROUP BY "Facilitys"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "Facilitys"."NewPlotNumber", COUNT(*) AS count FROM public."Facilitys" GROUP BY "Facilitys"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "Facilitys"."Market", COUNT(*) AS count FROM public."Facilitys" GROUP BY "Facilitys"."Market"`
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
        `SELECT "Facilitys"."SubCounty", COUNT(*) AS count FROM public."Facilitys" GROUP BY "Facilitys"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "Facilitys"."Ward", COUNT(*) AS count FROM public."Facilitys" GROUP BY "Facilitys"."Ward"`
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
