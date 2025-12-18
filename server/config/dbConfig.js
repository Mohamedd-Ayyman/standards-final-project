import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.CONN_STRING, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose default connection is open");
});

db.on("error", (err) => {
  console.error("Mongoose default connection error:", err);
});

db.on("disconnected", () => {
  console.log("Mongoose default connection is disconnected");
});

export default db;
