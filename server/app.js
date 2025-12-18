import express from "express";
import cors from "cors";

import authRouter from "./controllers/authController.js";
import userRouter from "./controllers/userController.js";
import policyRouter from "./controllers/policyController.js";
import infectionRouter from "./controllers/infectionReportController.js";
import auditRouter from "./controllers/auditController.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://hospital-infection-control.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/policy", policyRouter);
app.use("/api/infection", infectionRouter);
app.use("/api/audit", auditRouter);

export default app;
