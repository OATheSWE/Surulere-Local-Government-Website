import { ImageCollection } from "@/assets";
import { styles } from "@/src/data";
import { BackgroundImage } from "@mantine/core";
import React from "react";
import SubscriptionForm from "./SubscriptionForm";
///@ts-ignore


const Landing = () => {
  return (
    <BackgroundImage
    className={`${styles.body}`}
    src={ImageCollection.logo}
  >
    <SubscriptionForm />
  </BackgroundImage>
  );
};

export default Landing;
