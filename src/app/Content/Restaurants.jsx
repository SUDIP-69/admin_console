import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/getallrestaurantsignup")
      .then((response) => {
        console.log(response.data.data);
        const verifiedRestaurants = response.data?.data.filter(
          (restaurant) => restaurant.verified === true
        );
        setRestaurants(verifiedRestaurants);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = restaurants.filter((restaurant) =>
    restaurant.restaurantname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 mt-4">
      
      <div className="space-y-4 text-slate-700">
        {filteredData.map((restaurant) => (
          <Link
            href={`/RestaurantDetails/?id=${restaurant.restaurantid}`}
            key={restaurant.restaurantid}
            className="grid grid-cols-8 items-center p-4 border rounded-lg shadow-md hover:bg-[#FFF0E3]"
          >
            <div className="col-span-4">
              <div className="text-lg font-bold">{restaurant.restaurantname}</div>
              <div className="text-sm text-black/30">ID: {restaurant.restaurantid}</div>
            </div>
            <div className="col-span-3">
              <div className="text-lime-600 text-sm">Total Payment: {restaurant.total_payment}</div>
              <div className="text-rose-600 text-sm">Next Renewal: {restaurant.renewal}</div>
            </div>
            <div className="col-span-1 text-right">
              <p className="text-blue-500 hover:underline text-2xl font-bold">
                {">"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
