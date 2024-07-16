"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const RestaurantDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/fetchcombineddetails?restaurantid=${id}`)
        .then((response) => {
          const data = response.data.data;

          // Filter out the _v and password fields
          const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
            if (key !== "_v" && key !== "password") {
              if (key === "createdAt" || key === "updatedAt") {
                acc[key] = new Date(value).toLocaleDateString();
              } else {
                acc[key] = value;
              }
            }
            return acc;
          }, {});

          setRestaurantDetails(filteredData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching restaurant details:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center bg-[#fff9ea] w-screen h-screen items-center">
        <span className="loader"></span>
      </div>
    );
  }

  if (!restaurantDetails) {
    return (
      <div className="flex items-center justify-center bg-[#fff9ea] min-h-screen">
        <Typography variant="h5">Restaurant not found</Typography>
      </div>
    );
  }

  return (
    <div className="bg-[#fff9ea] w-screen">
      <Container className="py-10">
        <Typography variant="h4" className="text-center mb-8">
          Restaurant Details
        </Typography>
        <Grid container spacing={4}>
          {Object.entries(restaurantDetails).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card className="shadow-lg">
                <CardContent>
                  <Typography variant="h6" className="font-bold capitalize">
                    {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </Typography>
                  <Typography variant="body1">{value?.toString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default RestaurantDetailsPage;
