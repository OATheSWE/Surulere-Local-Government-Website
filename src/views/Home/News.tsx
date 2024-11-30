import React, { useEffect, useState } from "react";
import { Card, Text, Image, Button, BackgroundImage } from "@mantine/core";
import { ImageCollection } from "@/assets";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useSwipeable } from "react-swipeable";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { api } from "@/src/api";
import { Link } from "expo-router";
import { styles } from "@/src/data";

const NewsCard: React.FC<{
  title: string;
  description: string;
  imageUrl: string;
  blogId: string;
}> = ({ title, description, imageUrl, blogId }) => (
  <Card
    shadow="xl"
    padding={0}
    radius="md"
    className="w-full max-w-[300px] h-auto"
  >
    <Image
      src={imageUrl}
      alt={title}
      className="h-48 w-full object-cover rounded-t-md"
    />
    <div className="bg-gradient-to-b from-primary to-white rounded-b-md text-center text-black">
      <Text className="text-lg font-bold px-4 mt-4">{title}</Text>
      <Text className="text-sm px-4 mt-2">By {description}</Text>
      <Link
        className="bg-transparent hover:bg-transparent text-right underline transition duration-300 text-black hover:text-primary flex justify-end mt-2"
        href={`/website/blog?blog_id=${blogId}`}
      >
        Read More
      </Link>
    </div>
  </Card>
);

const NewsCarousel: React.FC = () => {
  const blo = [
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
  const [blogs, setBlogs] = useState([]);

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
      prevIndex === blo.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? blo.length - itemsPerPage : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: isSmallScreen, // Enable dragging with mouse on small screens
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

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(api.fetchAllBlogs, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.data.status === "success") {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  return (
    <BackgroundImage ref={ref} src={ImageCollection.bgdesign} className={`py-16 bg-white ${styles.body}`}>
      <animated.div style={leftColAnimation}>
        <Text className="text-center mb-6 text-3xl">News & Notices</Text>
      </animated.div>
      <animated.div
        {...handlers}
        className="flex justify-between overflow-hidden"
        style={rightColAnimation}
      >
        {!isSmallScreen && (
          <button onClick={prevSlide} className="mr-4 hidden md:block">
            <IconArrowLeft size={30} />
          </button>
        )}
        <div className="flex overflow-hidden w-full">
          <div
            className="flex transition-transform ease-in-out duration-500"
            style={{
              transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)`,
              width: `${(100 * blo.length) / itemsPerPage}%`,
            }}
          >
            {blogs.map((newsItem, index) => (
              <div
                key={index}
                className={`w-[${100 / itemsPerPage}%] flex-shrink-0 px-2`}
              >
                <NewsCard
                  title={newsItem.blog_data?.blog_title}
                  description={newsItem.blog_data?.blog_author}
                  imageUrl={`${encodeURIComponent(newsItem.blog_data.image?.file_path)}`}
                  blogId={newsItem.blog_id}
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
      </animated.div>
    </BackgroundImage>
  );
};

export default NewsCarousel;
