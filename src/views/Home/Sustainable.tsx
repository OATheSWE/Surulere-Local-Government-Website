import React from "react";
import {
  Container,
  Text,
  Card,
  Grid,
  BackgroundImage,
  Overlay,
  Image,
} from "@mantine/core";
import { ImageCollection } from "@/assets";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { styles } from "@/src/data";

const SustainabilityCard: React.FC<{
  description: string;
  imageUrl: string;
}> = ({ description, imageUrl }) => (
  <Card
    shadow="sm"
    p={0}
    className="h-[400px] bg-white text-black max-w-[270px] w-full rounded-lg"
  >
    <Image
      src={imageUrl}
      alt="Sustainability Image"
      className="mb-4 w-full h-[230px]"
    />
    <Text className="text-sm px-3">{description}</Text>
  </Card>
);

const SustainableProgress: React.FC = () => {
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
    transform: inView ? "translateX(0)" : "translateX(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  // Animation for the right column (coming from the right)
  const rightColAnimation2 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  return (
    <BackgroundImage
      ref={ref}
      src={ImageCollection.sustain}
      className={`relative z-10 ${styles.body}`}
    >
      {/* <Overlay color="#2e7d32" opacity={0.7} zIndex={1} /> */}
      <div className="absolute inset-0 bg-[#819965D9] opacity-50"></div>

      <div className="relative z-10 py-10 text-center text-black">
        <animated.div style={leftColAnimation}>
          <Text className="text-3xl font-bold mb-4 text-center">
            Our Progress Towards a Sustainable Future
          </Text>
        </animated.div>
        <div className="flex lg:justify-between space-x-3 justify-center items-center max-lg:flex-col">
          <animated.div style={rightColAnimation}>
            <Text className="max-w-[350px] w-full text-lg font-semibold text-center max-lg:mb-6">
              Surulere Local Government is dedicated to creating a sustainable,
              inclusive, and prosperous community in alignment with the United
              Nations' 17 Sustainable Development Goals (SDGs). From healthcare
              and education to clean energy and economic growth, we are taking
              concrete actions to build a better future for all.
            </Text>
          </animated.div>

          <animated.div style={rightColAnimation2}>
            <Grid
              gutter="md"
              className="space-y-6 lg:space-y-0 lg:space-x-4 flex"
            >
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <SustainabilityCard
                  description="Through initiatives such as free healthcare services at local clinics, immunization programs, and maternal health services, Surulere is improving healthcare access for all residents, particularly children and mothers."
                  imageUrl={ImageCollection.goodh} // Replace with actual image URL
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, xs: 6 }}>
                <SustainabilityCard
                  description="Surulere Local Government supports public primary and secondary schools, as well as vocational training programs, ensuring that every child has access to quality education regardless of their background."
                  imageUrl={ImageCollection.quality} // Replace with actual image URL
                />
              </Grid.Col>
            </Grid>
          </animated.div>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default SustainableProgress;
