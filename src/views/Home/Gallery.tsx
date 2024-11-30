import React, { useEffect, useState } from "react";
import { Card, Text, Image } from "@mantine/core";
import { ImageCollection } from "@/assets";
import { useSwipeable } from "react-swipeable";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { api } from "@/src/api";
import { styles } from "@/src/data";

const GalleryCard: React.FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <Card shadow="xl" padding={0} radius="md" className="h-[300px] rounded-lg">
    <Image
      src={imageUrl} 
      alt="Gallery"
      className="h-[300px] w-full object-cover"
    />
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
  const [gallery, setGallery] = useState([]);


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
      setCurrentIndex1((prev) =>
        prev === dummyData.length - itemsPerPage ? 0 : prev + 1
      );
    }, 5000);

    const interval2 = setInterval(() => {
      setCurrentIndex2((prev) =>
        prev === dummyData.length - itemsPerPage ? 0 : prev + 1
      );
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

  const [ref, inView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  // Animation for the left column (coming from the left)
  const leftColAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  // Animation for the right column (coming from the right)
  const rightColAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  // Animation for the right column (coming from the right)
  const rightColAnimation2 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(api.fetchAllGallery, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.data.status === "success") {
        setGallery(response.data.gallery); 
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    }
  };

  return (
    <div
      className={`py-16 ${styles.body}`}
      style={{ background: "radial-gradient(circle, #FDFDFC, #AEBF9B)" }}
      ref={ref}
    >
      <animated.div style={leftColAnimation}>
        <Text className="text-center mb-6 text-3xl">GALLERY</Text>
      </animated.div>
      <animated.div
        {...handlers1}
        className="flex items-center justify-center overflow-hidden mb-8"
        style={rightColAnimation}
      >
        <div
          className="flex transition-transform ease-in-out duration-500"
          style={{
            transform: `translateX(-${(currentIndex1 / itemsPerPage) * 100}%)`,
            width: `${(100 * gallery.length) / itemsPerPage}%`,
          }}
        >
          {gallery.map((GalleryItem, index) => (
            <div
              key={index}
              className={`w-[${100 / itemsPerPage}%] flex-shrink-0 px-2`}
            >
              <GalleryCard imageUrl={`${encodeURIComponent(GalleryItem.gallery_data?.file_path)}`} />
            </div>
          ))}
        </div>
      </animated.div>
      <animated.div
        {...handlers2}
        className="flex items-center justify-center overflow-hidden"
        style={rightColAnimation2}
      >
        <div
          className="flex transition-transform ease-in-out duration-500"
          style={{
            transform: `translateX(-${(currentIndex2 / itemsPerPage) * 100}%)`,
            width: `${(100 * gallery.length) / itemsPerPage}%`,
          }}
        >
          {gallery.map((GalleryItem, index) => (
            <div
              key={index}
              className={`w-[${100 / itemsPerPage}%] flex-shrink-0 px-2`}
            >
              <GalleryCard imageUrl={`${encodeURIComponent(GalleryItem.gallery_data?.file_path)}`} />
            </div>
          ))}
        </div>
      </animated.div>
    </div>
  );
};

export default GalleryCarousel;
