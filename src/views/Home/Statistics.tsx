import React from "react";
import { Card, Text } from "@mantine/core";
import { useTrail, animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const statistics = [
  {
    value: "1m+",
    description: "Residents as of 2023",
  },
  {
    value: "60%",
    description: "of the population are youths",
  },
  {
    value: "60-80",
    description:
      "healthcare facilities in total, combining public and private institutions",
  },
  {
    value: "1000+",
    description: "public and private primary and secondary schools",
  },
];

const KeyStatistics: React.FC = () => {
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

  const trail = useTrail(statistics.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 100, friction: 26 },
    delay: 300, // Adjust this delay based on your preference
  });

  return (
    <div
      ref={ref}
      className="py-12 px-4"
      style={{ background: "radial-gradient(circle, #FFFFFF, #A3B78D)" }}
    >
      <animated.div style={leftColAnimation}>
        <Text className="text-center text-3xl font-semibold text-[#678d52] mb-10">
          KEY STATISTICS
        </Text>
      </animated.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trail.map((style, index) => (
          <animated.div key={index} style={style}>
            <Card
              shadow="lg"
              radius="md"
              className="flex flex-col items-center bg-[#E4F4D2] h-[200px] justify-center border-[1.5px] border-gray-500 hover:shadow-lg transition-shadow"
            >
              <Text className="text-6xl font-bold text-[#2e2e2e] mb-2">
                {statistics[index].value}
              </Text>
              <Text className="text-center text-gray-600">
                {statistics[index].description}
              </Text>
            </Card>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default KeyStatistics;
