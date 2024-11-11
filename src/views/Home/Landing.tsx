import { ImageCollection } from "@/assets";
import { styles } from "@/src/data";
import { BackgroundImage } from "@mantine/core";
import React from "react";
import SubscriptionForm from "./SubscriptionForm";
import SustainableProgress from "./Sustainable";
import NewsCarousel from "./News";
///@ts-ignore

const Landing = () => {
  return (
    <BackgroundImage
      className={`${styles.body} relative z-[90]`}
      src={ImageCollection.logo}
    >
      <NewsCarousel />
      <SustainableProgress />
      <SubscriptionForm />
    </BackgroundImage>
  );
};

export default Landing;
