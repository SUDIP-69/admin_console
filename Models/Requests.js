import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    restaurant_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "cancelled","accepted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Request =
  mongoose.models.Request || mongoose.model("Request", requestSchema);

export default Request;
