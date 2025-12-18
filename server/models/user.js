import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    role: {
      type: String,
      enum: ["Admin", "Doctor", "Nurse"],
      required: true,
    },

    department: {
      type: String,
      required: function () {
        return this.role !== "Admin";
      },
    },

    isApproved: {
      type: Boolean,
      default: function () {
        return this.role === "Admin";
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
export default User;
