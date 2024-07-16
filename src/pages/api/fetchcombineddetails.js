import conndb from "../../../Middlewire/Conndb";
import Restaurant_credentials from "../../../Models/Restaurant_credentials";
import RestaurantDetails from "../../../Models/RestaurantDetails";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { restaurantid } = req.query;

    try {
      const credentials = await Restaurant_credentials.findOne({
        restaurantid,
      });
      const details = await RestaurantDetails.findOne({ restaurantid });

      if (credentials && details) {
        const mergedDetails = {
          ...credentials._doc,
          ...details._doc,
        };

        res.status(200).json({
          success: true,
          message: "Restaurant details fetched successfully",
          data: mergedDetails,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Restaurant not found",
          data: null,
        });
      }
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
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
