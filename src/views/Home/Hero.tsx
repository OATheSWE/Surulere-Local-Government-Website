// Hero.tsx
import React from "react";
import { Container, Text, Grid, Button, BackgroundImage } from "@mantine/core";
import { ImageCollection } from "@/assets";

const Hero: React.FC = () => {
  return (
    <BackgroundImage
      src={ImageCollection.subform}
      className="relative p-6 h-screen flex justify-center items-center"
    >
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      {/* Main Content */}
      <div className="relative z-10 text-center">
        <Text
          size="xl"
          className="mt-6 text-5xl font-bold text-center text-primary"
        >
          SURULERE<br />LOCAL<br />GOVERNMENT
        </Text>
        <Text
          size="lg"
          className="mt-2 text-xl text-primary font-bold text-center"
        >
          LAGOS, NIGERIA
        </Text>

        {/* Navigation Circles */}
        {/* <Grid className="mt-16 justify-center gap-y-4 md:gap-y-6" gutter="xl">
          {[
            "Latest News",
            "Building & Planning",
            "Projects",
            "Events",
            "Pay your bills",
            "FAQs",
          ].map((label) => (
            <Grid.Col
              key={label}
              span={{ base: 6, sm: 4, md: 2 }}
              className="flex justify-center"
            >
              <Button
                radius="xl"
                size="lg"
                variant="filled"
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-primary text-gray-800 font-semibold flex items-center justify-center rounded-full hover:bg-green-500 transition duration-300"
              >
                {label}
              </Button>
            </Grid.Col>
          ))}
        </Grid> */}
      </div>
    </BackgroundImage>
  );
};

export default Hero;
