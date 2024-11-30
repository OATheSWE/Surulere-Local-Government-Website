import { BackgroundImage, Grid, Image, Text } from "@mantine/core";
import { useTrail, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { galleryImages, styles } from "../data";
import { useEffect, useState } from "react";
import { api } from "../api";
import axios from "axios";
import { router } from "expo-router";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [ref, inView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  const trail = useTrail(blogs.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 100, friction: 26 },
    delay: 300, // Adjust this delay based on your preference
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

  function formatRelativeTime(timestamp) {
    const now = new Date();
    const pastDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - pastDate) / 1000); // Difference in seconds

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }
  }

  const [advert, setAdvert] = useState();

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const response = await axios.get(api.fetchAllAdverts, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (response.data.status === "success") {
          const allAdverts = response.data.adverts;

          // Randomly select one advert
          if (allAdverts.length > 0) {
            const randomIndex = Math.floor(Math.random() * allAdverts.length);
            setAdvert(allAdverts[randomIndex]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch adverts:", error);
      }
    };

    fetchAdverts();
  }, []);

  const allImages = trail.map((style, index) => (
    <>
      <Grid.Col
        ref={ref}
        span={{ base: 12, xs: 6, sm: 4, md: 3 }}
        key={index}
        className="mt-8"
      >
        <animated.div
          style={style}
          className={`w-full h-[250px] overflow-hidden rounded-xl`}
          onClick={() => {
            router.push(`/website/blog?blog_id=${blogs[index].blog_id}`);
          }}
        >
          <Image
            src={`${encodeURIComponent(
              blogs[index].blog_data.image.file_path
            )}`}
            className={`w-full h-[150px] object-cover object-top rounded-xl transition duration-300 shadow-xl`}
            alt="Gallery Image"
            loading="lazy"
          />
          <Text className="leading-4 my-2">
            {blogs[index].blog_data.blog_title}
          </Text>
          <Text className="text-[13px]">
            By {blogs[index].blog_data.blog_author},{" "}
            <span>{formatRelativeTime(blogs[index].created_at)}</span>
          </Text>
        </animated.div>
      </Grid.Col>
    </>
  ));
  return (
    <>
      <Grid className={`${styles.body} py-16`}>{allImages}</Grid>
      <BackgroundImage
        className={`w-full h-[250px] rounded-lg mt-12`}
        src={`${encodeURIComponent(advert?.advert_data?.file_path)}`}
      />
    </>
  );
};

export default AllBlogs;
