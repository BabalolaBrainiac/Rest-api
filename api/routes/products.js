const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const multer = require("multer");
const apierror = require("../error/api-error");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadFilter = function (req, file, cb) {
  if (file.mimetype === "images.jpeg" || file.mimetype === "images.png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2024 * 2024 * 3,
  },
  uploadFilter: uploadFilter,
});

router.get("/", (req, res, next) => {
  const id = req.params._id;
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then((results) => {
      console.log(results);
      if (results) {
        res.status(200).json({
          total: results.length,
          results: results,
        });
      } else {
        res.status(404).json({
          message: "No Products Available",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        eroor: err,
      });
    });
});

router.post("/", upload.single("productImage"), (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  res.status(200).json({
    message: "Handling Post requests to ./products",
    createdProduct: product,
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "Invalid ID Entry",
        });
      }
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Product has been updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:productId", (req, res, next) => {
  Product.remove({ _id: req.params.productId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
