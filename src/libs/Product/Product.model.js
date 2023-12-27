const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const Product = require("../../models/Product")(sequelize, Sequelize);
const { Op } = require("sequelize");
const Path = require("path");
const { resolve } = require("path");
const { log } = require("console");
const multer = require("multer");

Product.sync({ force: false });

let upload = multer({
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, callback) => {
    const acceptableExtensions = [".png", ".jpg"];
    if (!acceptableExtensions.includes(Path.extname(file.originalname))) {
      return callback(new Error("Unsupported format"));
    }
    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 5000000) {
      return callback(new Error("Image too large"));
    }
    callback(null, true);
  },
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  }),
});

exports.uploadImage = upload.single("Image");

exports.createProduct = (ProductData) => {
  console.log(ProductData);
  return new Promise(async (resolve, reject) => {
    Product.create(ProductData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(ProductData);

        console.log(err);
        reject({ error: "Product creation failed" });
      }
    );
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    Product.findAll({}).then(
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
        `SELECT * FROM "Products" ${
          lrnumber === "all" ? "" : `WHERE "LR_Number"= '${lrnumber}'`
        } LIMIT 10 OFFSET '${offset}'`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*) FROM "Products"`
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
    Product.findByPk(id).then(
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

exports.searchByCategory = (category, limit = 10) => {
  return new Promise(async (resolve, reject) => {
    Product.findAll({
      where: {
        Category: {
          [Op.iLike]: `%${category}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({error: "Product Data Not Found"});
        }
        resolve(result);
      },
      (err) => {
        console.log(err);
        reject({error: "failed"});
      }
    )
  });
};

exports.findProductByNationalId = (id, limit) => {
  return new Promise((resolve, reject) => {
    Product.findAll({
      where: {
        NationalID: {
          [Op.iLike]: `%${id}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Product Data not found" });
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

exports.findProductByOwnerName = (name, limit = 10) => {
  return new Promise((resolve, reject) => {
    Product.findAll({
      where: {
        OwnerName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Product Data not found" });
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

exports.findProductByParcelNumber = (pno, limit = 10) => {
  return new Promise((resolve, reject) => {
    Product.findAll({
      where: {
        NewPlotNumber: {
          [Op.iLike]: `%${pno}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Product Data not found" });
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

exports.findProductByPhoneNumber = (phone, limit) => {
  return new Promise((resolve, reject) => {
    Product.findAll({
      where: {
        Phone: {
          [Op.iLike]: `%${phone}%`,
        },
      },
      limit: limit,
    }).then(
      (result) => {
        if (result == null) {
          reject({ error: "Product Data not found" });
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

exports.updateByID = (ProductDataData, id) => {
  return new Promise((resolve, reject) => {
    Product.update(ProductDataData, {
      where: {
        ProductID: id,
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
    Product.findAll({
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
    Product.destroy({
      where: {
        ProductID: id,
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
    Product.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("LR_Number")),
        "LR_Number",
      ],
    }).then(
      async (result) => {
        const total = await Product.count();

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
        `SELECT "Products"."SubCounty", COUNT(*) AS count FROM public."Products" GROUP BY "Products"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "Products"."Ward", COUNT(*) AS count FROM public."Products" GROUP BY "Products"."Ward"`
      );

      const [tpl] = await sequelize.query(
        `SELECT "Products"."NewPlotNumber", COUNT(*) AS count FROM public."Products" GROUP BY "Products"."NewPlotNumber"`
      );

      const [mkts] = await sequelize.query(
        `SELECT "Products"."Market", COUNT(*) AS count FROM public."Products" GROUP BY "Products"."Market"`
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
        `SELECT "Products"."SubCounty", COUNT(*) AS count FROM public."Products" GROUP BY "Products"."SubCounty"`
      );

      const [war] = await sequelize.query(
        `SELECT "Products"."Ward", COUNT(*) AS count FROM public."Products" GROUP BY "Products"."Ward"`
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
