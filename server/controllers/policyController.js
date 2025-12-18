import express from "express";
import Policy from "../models/policy.js";
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

    const policy = new Policy(req.body);
    await policy.save();

    res.status(201).send({
      message: "Policy created successfully",
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
    const policies = await Policy.find();

    res.send({
      message: "Policies fetched successfully",
      success: true,
      data: policies,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.delete("/delete-policy/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).send({
        message: "Access denied",
        success: false,
      });
    }

    const policy = await Policy.findByIdAndDelete(req.params.id);

    if (!policy) {
      return res.status(404).send({
        message: "Policy not found",
        success: false,
      });
    }

    res.send({
      message: "Policy deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

export default router;