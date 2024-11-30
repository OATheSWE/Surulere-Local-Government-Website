import { BackgroundImage, Grid, Image } from "@mantine/core";
import { useTrail, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { galleryImages, styles } from "../data";
import { api } from "../api";
import axios from "axios";
import { useEffect, useState } from "react";

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);

  const [ref, inView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  const trail = useTrail(gallery.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 100, friction: 26 },
    delay: 300, // Adjust this delay based on your preference
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
        >
          <Image
            src={`${encodeURIComponent(
              gallery[index]?.gallery_data?.file_path
            )}`}
            className={`w-full h-full object-cover object-top rounded-xl transition duration-300 hover:scale-110`}
            alt="Gallery Image"
            loading="lazy"
          />
        </animated.div>
      </Grid.Col>
      <BackgroundImage
        className={`w-full h-[250px] rounded-lg`}
        src={`${encodeURIComponent(advert?.advert_data?.file_path)}`}
      />
    </>
  ));
  return <Grid className={`${styles.body} py-16`}>{allImages}</Grid>;
};

export default GalleryPage;
