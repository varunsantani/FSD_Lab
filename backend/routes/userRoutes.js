const express = require("express");
const { body, validationResult } = require("express-validator");
const { registerUser, loginUser, getProfile } = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  handleValidationErrors,
  registerUser
);
router.post("/login", loginUser);
router.get("/profile", authenticateToken, getProfile);

module.exports = router;
