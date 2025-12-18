import express from "express";
import InfectionReport from "../models/infectionReport.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
  try {
    if (!["Doctor", "Nurse"].includes(req.user.role)) {
      return res.status(403).send({
        message: "Access denied",
        success: false,
      });
    }

    const report = new InfectionReport({
      ...req.body,
      reportedBy: req.user.userId,
    });

    await report.save();

    res.status(201).send({
      message: "Infection report created",
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
    if (req.user.role !== "Admin") {
      return res.status(403).send({
        message: "Access denied",
        success: false,
      });
    }

    const reports = await InfectionReport.find().populate(
      "reportedBy",
      "firstname lastname role department"
    );

    res.send({
      message: "Infection reports fetched",
      success: true,
      data: reports,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

export default router;
