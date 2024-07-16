import conndb from "../../../Middlewire/Conndb";
import RestaurantDetails from "../../../Models/RestaurantDetails";
import Restaurant_credentials from "../../../Models/Restaurant_credentials";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const [restaurants, credentials] = await Promise.all([
        RestaurantDetails.find(),
        Restaurant_credentials.find(),
      ]);

      const combinedData = restaurants.map((restaurant) => {
        const credential = credentials.find(
          (cred) =>
            cred.restaurantid.toString() === restaurant.restaurantid.toString()
        );

        return {
          ...restaurant._doc,
          credentials: credential ? credential._doc : {},
        };
      });

      res.status(200).json({ success: true, data: combinedData });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: "Error", data: null });
    }
  } else {
    res
      .status(405)
      .json({ success: false, message: "Method Not Allowed", data: null });
  }
};

export default conndb(handler);
