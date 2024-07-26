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
      // Find user by username
      const user = await SignIn.findOne({ username });

      // Check if user exists and password is correct
      if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
          success: true,
          message: "Successfully signed in",
          data: { username: user.username },
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
          data: null,
        });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        data: null,
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Method Not Allowed",
      data: null,
    });
  }
};

export default conndb(handler);
