import { Grid, Image, Text } from "@mantine/core";
import { useTrail, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { galleryImages, styles } from "../data";

const GalleryPage = () => {
  const [ref, inView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  const trail = useTrail(galleryImages.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 100, friction: 26 },
    delay: 300, // Adjust this delay based on your preference
  });

  const allImages = trail.map((style, index) => (
    <Grid.Col ref={ref} span={{ base: 12, xs: 6, sm: 4, md: 3 }} key={index} className="mt-8">
      <animated.div style={style} className={`w-full h-[250px] overflow-hidden rounded-xl`}>
        <Image
          src={galleryImages[index].src}
          className={`w-full h-[150px] object-cover object-top rounded-xl transition duration-300 shadow-xl`}
          alt="Gallery Image"
          loading="lazy"
        />
        <Text className="leading-4 my-2">Lawyer evicts church over illegal possession of property</Text>
        <Text className="text-[13px]">Daniel Ajuwon, <span> 2 hours</span></Text>
      </animated.div>
    </Grid.Col>
  ));
  return <Grid  className={`${styles.body} py-16`}>{allImages}</Grid>;
};

export default GalleryPage;
