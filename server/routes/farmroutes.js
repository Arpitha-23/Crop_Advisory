import express from "express";
import Farm from "../models/farm.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================
// CREATE FARM
// ==========================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      soilType,
      area,
      location,
      crop,
    } = req.body;

    if (!name || !soilType) {
      return res.status(400).json({
        message: "Farm name and soil type are required",
      });
    }

    const newFarm = await Farm.create({
      userId: req.user.id,
      name,
      soilType,
      area,
      location,
      crop,
    });

    res.status(201).json(newFarm);

  } catch (error) {
    console.error("Create farm error:", error);

    res.status(500).json({
      message: "Unable to create farm",
      error: error.message,
    });
  }
});


// ==========================
// GET USER'S FARMS
// ==========================

router.get("/", authMiddleware, async (req, res) => {
  try {
    const farms = await Farm.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(farms);

  } catch (error) {
    console.error("Get farms error:", error);

    res.status(500).json({
      message: "Unable to fetch farms",
      error: error.message,
    });
  }
});


// ==========================
// GET ONE FARM
// ==========================

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const farm = await Farm.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!farm) {
      return res.status(404).json({
        message: "Farm not found",
      });
    }

    res.json(farm);

  } catch (error) {
    console.error("Get farm error:", error);

    res.status(500).json({
      message: "Unable to fetch farm",
      error: error.message,
    });
  }
});


export default router;