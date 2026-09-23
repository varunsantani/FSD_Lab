const express = require("express");
const Food = require("../models/Food");

const router = express.Router();

// POST / - create a food item
router.post("/", async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET / - get all food items
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /:id - get one food item by ID
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /:id - update a food item by ID
router.put("/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /:id - delete a food item by ID
router.delete("/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({ message: "Food item deleted", food });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
