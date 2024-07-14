// components/RestaurantList.jsx
import { useState } from "react";
import Link from "next/link";

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const data = [
    {
      id: 1,
      date: "2024-07-13",
      restaurant_name: "Taste of China",
      total_payment: "$1000",
      renewal: "02/11/24",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
      status: "Pending",
    },
    {
      id: 2,
      date: "2024-07-14",
      restaurant_name: "Nizam",
      total_payment: "$1500",
      renewal: "23/12/25",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
      status: "Verified",
    },
    // Add more rows as needed
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((row) => {
    return row.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-2">
      <div className="mb-4 flex items-center">
        {/* <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md mr-4"
        /> */}
      </div>
      <div className="space-y-4 text-slate-700">
        {filteredData.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-md hover:bg-[#FFF0E3]"
          >
            <div>
              <div className="text-lg font-bold">{row.restaurant_name}</div>
              <div className="text-sm text-black/30">ID: {row.id}</div>
            </div>
            <div className="text-left">
              <div className="text-lime-600 text-sm">Total Payment: {row.total_payment}</div>
              <div className="text-rose-600 text-sm">Next Renewal: {row.renewal}</div>
            </div>
            <a className="text-blue-500 hover:underline text-2xl font-bold">
              {">"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
