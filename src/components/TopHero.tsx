import React from "react";
import { BackgroundImage, Container, Text } from "@mantine/core"; // This CSS file will hold the Tailwind styles
import { ImageCollection } from "@/assets";

const TopHero: React.FC = ({ headText, subText }) => {
  return (
    <BackgroundImage
      className="relative bg-cover bg-center h-72 md:h-96 flex items-center justify-center z-10 font-sans"
      src={ImageCollection.hero}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
      {/* Background overlay */}
      <Container className="relative z-10 text-center">
        <Text className="text-white font-bold text-4xl md:text-6xl uppercase">
          {headText}
        </Text>
        <Text className="text-white text-lg md:text-xl mt-2">{subText}</Text>
      </Container>
    </BackgroundImage>
  );
};

export default TopHero;
