import conndb from "../../../Middlewire/Conndb";
import Request from "../../../Models/Requests";
import nodemailer from "nodemailer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;
    try {
      const pertrequest = await Request.findOne({ email: email });
      if (pertrequest) {
        const transporter = nodemailer.createTransport({
          service: "gmail", // You can use any email service
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Request Rejected by Baksish",
          html: `
                      <div style="background-color: #fff9ea; padding: 20px; font-family: Arial, sans-serif; color: #441029;">
                        <div style="max-width: 600px; margin: auto; border: 1px solid #441029; border-radius: 10px; overflow: hidden;">
                          <div style="background-color: #441029; padding: 10px; text-align: center;">
                            <h1 style="color: #fff9ea;">Baksish Request Status</h1>
                          </div>
                          <div style="padding: 20px; text-align: center;">
                            <p style="font-size: 18px;">We're sorry,</p>
                            <p style="font-size: 16px;">Your request has been rejected due to invalid details. If you have any queries, please contact our support team.</p>
                          </div>
                          <div style="background-color: #fff9ea; padding: 10px; text-align: center; border-top: 1px solid #441029;">
                            <p style="font-size: 12px; color: #441029;">&copy; 2024 Baksish. All rights reserved.</p>
                          </div>
                        </div>
                      </div>
                    `,
        };

        // Send email and update request status concurrently
        await Promise.all([
          transporter.sendMail(mailOptions),
          Request.updateOne(
            { email: email },
            { $set: { status: "cancelled" } }
          ),
        ]);

        res.status(200).json({
          success: true,
          message: "Signup email sent and request updated",
          data: null,
        });
      } else {
        res
          .status(404)
          .json({ success: false, message: "Request not found", data: null });
      }
    } catch (error) {
      console.error("Error sending email or updating request:", error);
      res.status(400).json({ success: false, message: "Error", data: null });
    }
  } else {
    res
      .status(405)
      .json({ success: false, message: "Method Not Allowed", data: null });
  }
};

export default conndb(handler);
