import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    if (req.body.role === "Admin") {
      return res.status(403).send({
        message: "Admin registration is not allowed",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      department: req.body.department,
      isApproved: false,
    });

    await newUser.save();

    res.status(201).send({
      message: "Registration successful. Awaiting admin approval.",
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
  console.log(req.body);
});

router.post("/login", async (req, res) =>  {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        message: "Please enter a registered email",
        success: false,
      });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.send({
        message: "Incorrect password",
        success: false,
      });
    }

    if (user.role !== "Admin" && !user.isApproved) {
      return res.status(403).send({
        message: "Account pending admin approval",
        success: false,
      });
    }

    const authToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        isApproved: user.isApproved,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.send({
      message: "Login successful",
      success: true,
      token: authToken,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

export default router;
