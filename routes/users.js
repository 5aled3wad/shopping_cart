var express = require("express");
const User = require("../models/users");

var router = express.Router();

/* GET users listing. */
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  let userData = new User({
    email: req.body.email,
    password: req.body.password,
  })
    .save()
    .then((doc) => {
      console.log(`Data Save Successfully 
      ${doc}`);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("OK");
});

module.exports = router;
