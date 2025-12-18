import mongoose from "mongoose";

const infectionReportSchema = new mongoose.Schema(
  {
    infectionType: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const InfectionReport = mongoose.model(
  "infectionReports",
  infectionReportSchema
);

export default InfectionReport;
