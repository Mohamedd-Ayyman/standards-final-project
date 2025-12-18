import express from "express";
import Audit from "../models/audit.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).send({
        message: "Access denied",
        success: false,
      });
    }

    const audit = new Audit({
      ...req.body,
      conductedBy: req.user.userId,
    });

    await audit.save();

    res.status(201).send({
      message: "Audit created successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-all", authMiddleware, async (req, res) => {
  try {
    const audits = await Audit.find()
      .populate("conductedBy", "firstname lastname")
      .populate("policy", "title version");

    res.send({
      message: "Audits fetched successfully",
      success: true,
      data: audits,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

export default router;
