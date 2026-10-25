const express = require("express");
const {
  handleUserSignup,
  handleUserSignin,
} = require("../controllers/user.controller.js");
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin", {
    success: req.query.success,
    error: req.query.error,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", { error: req.query.error });
});

router.post("/signup", handleUserSignup);
router.post("/signin", handleUserSignin);
module.exports = router;
