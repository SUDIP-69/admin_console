import mongoose from "mongoose";

const signInSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const SignIn = mongoose.models.Admin_credentials || mongoose.model("Admin_credentials", signInSchema);

export default SignIn;
