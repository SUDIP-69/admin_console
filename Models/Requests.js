import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    resturant_name: {
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
  },
  { timestamps: true }
);

const Request =
  mongoose.models.Request || mongoose.model("Request", requestSchema);

export default Request;
