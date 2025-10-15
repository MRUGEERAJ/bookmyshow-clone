const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// @route   POST api/auth/register
router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  authController.register
);

// @route   POST api/auth/login
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  authController.login
);

// @route   GET api/auth/current-user
router.get("/current-user", authMiddleware, authController.getCurrentUser);

module.exports = router;
