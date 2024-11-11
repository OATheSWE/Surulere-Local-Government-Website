import React, { useEffect, useState } from "react";
import { Card, Text, Image, Button, BackgroundImage } from "@mantine/core";
import { ImageCollection } from "@/assets";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useSwipeable } from "react-swipeable";

const NewsCard: React.FC<{
  title: string;
  description: string;
  imageUrl: string;
}> = ({ title, description, imageUrl }) => (
  <Card
    shadow="xl"
    padding={0}
    radius="md"
    className="w-full max-w-xs h-[400px]"
  >
    <Image
      src={imageUrl}
      alt={title}
      className="h-48 w-full object-cover rounded-t-md"
    />
    <div className="bg-gradient-to-b from-primary to-white rounded-b-md text-center text-black">
      <Text className="text-lg font-bold px-4 mt-4">{title}</Text>
      <Text className="text-sm px-4 mt-2">{description}</Text>
      <Button
        className="bg-transparent hover:bg-transparent text-right underline transition duration-300 text-black hover:text-primary flex justify-end mt-2"
        component="a"
        href="#"
      >
        Read More
      </Button>
    </div>
  </Card>
);

const NewsCarousel: React.FC = () => {
  const dummyData = [
    {
      title:
        "Aguda Surulere cult clash: Riot for Surulere Lagos - Wetin we know",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      imageUrl: ImageCollection.logo,
    },
    {
      title: "Second News Title",
      description: "Another brief description for the second news item.",
      imageUrl: ImageCollection.logo,
    },
    {
      title: "Third News Title",
      description: "Another brief description for the third news item.",
      imageUrl: ImageCollection.logo,
    },
    {
      title: "Fourth News Title",
      description: "Another brief description for the fourth news item.",
      imageUrl: ImageCollection.logo,
    },
    {
      title: "Fifth News Title",
      description: "Another brief description for the fifth news item.",
      imageUrl: ImageCollection.logo,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768;
      setIsSmallScreen(isSmall);
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dummyData.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dummyData.length - itemsPerPage : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: isSmallScreen, // Enable dragging with mouse on small screens
  });

  return (
    <BackgroundImage src={ImageCollection.bgdesign} className="py-16 bg-white">
      <Text className="text-center mb-6 text-3xl">News & Notices</Text>
      <div
        {...handlers}
        className="flex items-center justify-center overflow-hidden"
      >
        {!isSmallScreen && (
          <button onClick={prevSlide} className="mr-4 hidden md:block">
            <IconArrowLeft size={30} />
          </button>
        )}
        <div className="flex overflow-hidden">
          <div
            className="flex transition-transform ease-in-out duration-500"
            style={{
              transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)`,
              width: `${(100 * dummyData.length) / itemsPerPage}%`,
            }}
          >
            {dummyData.map((newsItem, index) => (
              <div
                key={index}
                className={`w-[${100 / itemsPerPage}%] flex-shrink-0 px-2`}
              >
                <NewsCard
                  title={newsItem.title}
                  description={newsItem.description}
                  imageUrl={newsItem.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
        {!isSmallScreen && (
          <button onClick={nextSlide} className="ml-4 hidden md:block">
            <IconArrowRight size={30} />
          </button>
        )}
      </div>
    </BackgroundImage>
  );
};

export default NewsCarousel;
