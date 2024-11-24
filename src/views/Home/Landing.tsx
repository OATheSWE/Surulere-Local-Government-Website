import { ImageCollection } from "@/assets";
import { styles } from "@/src/data";
import { BackgroundImage } from "@mantine/core";
import React, { useEffect, useState } from "react";
import SubscriptionForm from "./SubscriptionForm";
import SustainableProgress from "./Sustainable";
import NewsCarousel from "./News";
import GalleryCarousel from "./Gallery";
import KeyStatistics from "./Statistics";
import MeetOurChairman from "./Chairman";
import WelcomeToSurulere from "./Welcome";
import Hero from "./Hero";
import axios from "axios";
import { api } from "@/src/api";

const Landing = () => {
  const [adverts, setAdverts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch adverts once on component mount
  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const response = await axios.get(api.fetchAllAdverts, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        if (response.data.status === "success") {
          setAdverts(response.data.adverts);
        }
      } catch (error) {
        console.error("Failed to fetch adverts:", error);
      }
    };

    fetchAdverts();
  }, []);

  // Update the background image index every 5 seconds
  useEffect(() => {
    if (adverts.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % adverts.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval); // Cleanup
    }
  }, [adverts]);

  // Safely extract the current image path
  const currentBackgroundImage =
    adverts[currentImageIndex]?.advert_data?.file_path;

  return (
    <BackgroundImage
      className={`${styles.body} relative z-[90]`}
      src={currentBackgroundImage}
    >
      <Hero />
      <WelcomeToSurulere />
      <MeetOurChairman />
      <KeyStatistics />
      <GalleryCarousel />
      <NewsCarousel />
      <SustainableProgress />
      <SubscriptionForm />
    </BackgroundImage>
  );
};

export default Landing;
