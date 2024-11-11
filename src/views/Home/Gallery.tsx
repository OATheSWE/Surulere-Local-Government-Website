import React, { useEffect, useState } from "react";
import { Card, Text, Image } from "@mantine/core";
import { ImageCollection } from "@/assets";
import { useSwipeable } from "react-swipeable";

const GalleryCard: React.FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <Card shadow="xl" padding={0} radius="md" className="h-[300px] rounded-lg">
    <Image src={imageUrl} alt="Gallery" className="h-[300px] w-full object-cover" />  
  </Card>
);

const GalleryCarousel: React.FC = () => {
  const dummyData = [
    { imageUrl: ImageCollection.subform },
    { imageUrl: ImageCollection.subform },
    { imageUrl: ImageCollection.subform },
    { imageUrl: ImageCollection.subform },
    { imageUrl: ImageCollection.subform },
  ];

  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
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
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide functionality for the first and second sliders
  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentIndex1((prev) => (prev === dummyData.length - itemsPerPage ? 0 : prev + 1));
    }, 5000);

    const interval2 = setInterval(() => {
      setCurrentIndex2((prev) => (prev === dummyData.length - itemsPerPage ? 0 : prev + 1));
    }, 5000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [itemsPerPage, dummyData.length]);

  const nextSlide1 = () => {
    setCurrentIndex1((prevIndex) =>
      prevIndex === dummyData.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const prevSlide1 = () => {
    setCurrentIndex1((prevIndex) =>
      prevIndex === 0 ? dummyData.length - itemsPerPage : prevIndex - 1
    );
  };

  const nextSlide2 = () => {
    setCurrentIndex2((prevIndex) =>
      prevIndex === dummyData.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const prevSlide2 = () => {
    setCurrentIndex2((prevIndex) =>
      prevIndex === 0 ? dummyData.length - itemsPerPage : prevIndex - 1
    );
  };

  const handlers1 = useSwipeable({
    onSwipedLeft: () => nextSlide1(),
    onSwipedRight: () => prevSlide1(),
    trackMouse: isSmallScreen,
  });

  const handlers2 = useSwipeable({
    onSwipedLeft: () => nextSlide2(),
    onSwipedRight: () => prevSlide2(),
    trackMouse: isSmallScreen,
  });

  return (
    <div className="py-16" style={{ background: "radial-gradient(circle, #FDFDFC, #AEBF9B)" }}>
      <Text className="text-center mb-6 text-3xl">Gallery</Text>
      <div {...handlers1} className="flex items-center justify-center overflow-hidden mb-8">
        <div className="flex transition-transform ease-in-out duration-500" style={{
          transform: `translateX(-${(currentIndex1 / itemsPerPage) * 100}%)`,
          width: `${(100 * dummyData.length) / itemsPerPage}%`
        }}>
          {dummyData.map((GalleryItem, index) => (
            <div key={index} className={`w-[${100 / itemsPerPage}%] flex-shrink-0 px-2`}>
              <GalleryCard imageUrl={GalleryItem.imageUrl} />
            </div>
          ))}
        </div>
      </div>
      <div {...handlers2} className="flex items-center justify-center overflow-hidden">
        <div className="flex transition-transform ease-in-out duration-500" style={{
          transform: `translateX(-${(currentIndex2 / itemsPerPage) * 100}%)`,
          width: `${(100 * dummyData.length) / itemsPerPage}%`
        }}>
          {dummyData.map((GalleryItem, index) => (
            <div key={index} className={`w-[${100 / itemsPerPage}%] flex-shrink-0 px-2`}>
              <GalleryCard imageUrl={GalleryItem.imageUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryCarousel;
