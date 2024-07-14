import conndb from "../../../Middlewire/Conndb";
import Request from "../../../Models/Requests";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const requests = await Request.find();
      res.status(200).json({ success: true, data: requests });
    } catch (error) {
      res.status(400).json({ success: false, message: "error", data: null });
    }
  } else {
    res
      .status(405)
      .json({ success: false, message: "Method Not Allowed", data: null });
  }
};

export default conndb(handler);
