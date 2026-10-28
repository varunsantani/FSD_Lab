const express = require("express");
const { authenticateToken, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route accessible to both users and admins
router.get(
  "/dashboard",
  authenticateToken,
  authorize("user", "admin"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome to the protected dashboard",
      user: req.user,
    });
  }
);

// Admin-only protected route
router.get(
  "/admin",
  authenticateToken,
  authorize("admin"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome to the Admin Dashboard",
      user: req.user,
    });
  }
);

module.exports = router;