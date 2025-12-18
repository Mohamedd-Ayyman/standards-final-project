import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    version: {
      type: String,
      required: true,
    },

    documentURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Policy = mongoose.model("policies", policySchema);
export default Policy;