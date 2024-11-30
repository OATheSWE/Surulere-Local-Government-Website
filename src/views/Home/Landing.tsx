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


  return (
    <div
      className={` relative z-[90]`}
    >
      <Hero />
      <WelcomeToSurulere />
      <MeetOurChairman />
      <KeyStatistics />
      <GalleryCarousel />
      <NewsCarousel />
      <SustainableProgress />
      <SubscriptionForm />
    </div>
  );
};

export default Landing;
