import conndb from "../../../Middlewire/Conndb";
import SignIn from "../../../Models/SignIn";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    try {
      // Check if admin already exists
      const existingAdmin = await SignIn.findOne({ username });
      if (existingAdmin) {
        return res.status(409).json({
          success: false,
          message: "Username already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new admin
      const newAdmin = new SignIn({
        username,
        password: hashedPassword,
      });

      await newAdmin.save();

      res.status(201).json({
        success: true,
        message: "Admin created successfully",
        data: newAdmin,
      });
    } catch (error) {
      console.error("Error creating admin:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }
};

export default conndb(handler);
