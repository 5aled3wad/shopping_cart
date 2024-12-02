var express = require("express");
var router = express.Router();
const Products = require("../models/products");

/* GET home page. */
router.get("/", function (req, res, next) {
  Products.find()
    .then((doc) => {
      // console.log(doc);
      // to push 3 in one array [ [{},{},{}] , [{},{},{}] , [{},{},{}] ]
      let productGrid = [];
      let colGrid = 3;

      for (let i = 0; i < doc.length; i += colGrid) {
        productGrid.push(doc.slice(i, i + colGrid));
      }
      console.log(productGrid);
      res.render("index", { title: "Shopping-cart", products: productGrid });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
