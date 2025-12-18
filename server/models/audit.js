import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    auditType: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    complianceScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    conductedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "policies",
      required: true,
    },
  },
  { timestamps: true }
);

const Audit = mongoose.model("audits", auditSchema);
export default Audit;
