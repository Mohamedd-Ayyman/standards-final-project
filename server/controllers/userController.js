import User from "../models/user.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/get-logged-in", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    res.send({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).send({
        message: "Access denied",
        success: false,
      });
    }

    const users = await User.find({}, { password: 0 });

    res.send({
      message: "All users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/pending-users", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).send({
        message: "Access denied",
        success: false,
      });
    }

    const pendingUsers = await User.find({
      isApproved: false,
      role: { $ne: "Admin" },
    }).select("-password -isApproved");

    res.send({
      message: "Pending users fetched successfully",
      success: true,
      data: pendingUsers,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/approve-user/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).send({
        message: "Access denied",
        success: false,
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).select("-password");

    res.send({
      message: "User approved successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.delete("/delete-user/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).send({
        message: "Access denied",
        success: false,
      });
    }

    // Check if trying to delete an admin
    const userToDelete = await User.findById(req.params.id);

    if (!userToDelete) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    if (userToDelete.role === "Admin") {
      return res.status(403).send({
        message: "Cannot delete admin users",
        success: false,
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.send({
      message: "User deleted successfully",
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
