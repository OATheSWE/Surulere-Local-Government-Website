import { Title, Text, Grid, Image, BackgroundImage } from "@mantine/core";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import { styles } from "../data";
import { ImageCollection } from "@/assets";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../api";

export default function SingleBlog() {
  const [ref, inView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  const { blog_id } = useLocalSearchParams(); // Extract blog_id from URL parameters
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null); // To store the selected blog data

  // Animation for the left column (coming from the left)
  const leftColAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  // Animation for the right column (coming from the right)
  const rightColAnimation2 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-50%)",
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
        const blog = response.data.blogs.find((b) => b.blog_id === blog_id); // Find the matching blog
        setSelectedBlog(blog); // Set the selected blog
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

  if (!selectedBlog) {
    return <div>Loading...</div>; // Show loading state until the selected blog is found
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

  return (
    <section ref={ref} className={`w-full py-10 ${styles.body} bg-default`}>
      <Grid gutter={90} className={`font-sans mt-4`}>
        <Grid.Col span={{ base: 12 }}>
          <animated.div
            style={leftColAnimation}
            className="flex flex-col items-stretch max-lg:mx-auto"
          >
            <Image
              src={`${encodeURIComponent(selectedBlog.blog_data.image.file_path)}`} // Display the image from the selected blog
              className={`w-full object-cover mb-1 shadow-2xl object-top rounded-xl max-h-[400px] h-full`}
              alt="Blog Image"
            />
            <div>
              <span className="text-[13px]">By {selectedBlog.blog_data.blog_author}, </span>
              <span className="text-[13px]">{formatRelativeTime(selectedBlog.created_at)}</span>
            </div>
          </animated.div>
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <animated.div style={rightColAnimation2} className={`text-black`}>
            <Title className={`text-black font-sans mb-2 text-center`} order={4}>
              {selectedBlog.blog_data.blog_title} {/* Display blog title */}
            </Title>

            <Text className="my-2">
              {selectedBlog.blog_data.blog_content} {/* Display blog content */}
            </Text>
          </animated.div>
        </Grid.Col>
      </Grid>
      <BackgroundImage className={`w-full h-[250px] rounded-lg mt-12`} src={`${encodeURIComponent(advert?.advert_data?.file_path)}`} />
    </section>
  );
}
