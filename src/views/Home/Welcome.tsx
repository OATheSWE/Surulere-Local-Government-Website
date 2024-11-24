import React from "react";
import { Image, Text } from "@mantine/core";
import { ImageCollection } from "@/assets";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const WelcomeToSurulere: React.FC = () => {
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

  // Animation for the right column (coming from the right)
  const rightColAnimation3 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  return (
    <div ref={ref} className="relative">
      <Image
        src={ImageCollection.wave2}
        alt="Vector 2"
        className="w-full absolute -top-7 md:-top-[60px] lg:-top-[80px]"
      />
      <div className="bg-primary p-8 md:p-16 lg:px-32 relative overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-[#90c462] opacity-50 transform -translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 right-0  w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-[#90c462] opacity-50 transform translate-x-10 translate-y-10"></div>

        {/* Content */}
        <div className="relative z-10">
          <animated.div style={leftColAnimation}>
            <Text className="text-2xl md:text-4xl font-semibold mb-4 text-center">
              WELCOME TO SURULERE
            </Text>
            <hr className="border-t border-gray-700 mx-auto w-[50%] mb-6" />
          </animated.div>

          <animated.div style={rightColAnimation}>
            <Text className="text-justify text-lg italic mb-4">
              <span className="font-semibold">Surulere</span> (Yoruba word
              meaning
              <span className="font-semibold"> “Patience is Profitable”</span>),
              a vibrant district in Lagos, Nigeria, has a rich history dating
              back to the colonial era. Originally a residential area for
              European expatriates, Surulere has evolved into a bustling
              commercial and cultural hub.
            </Text>
          </animated.div>

          <animated.div style={rightColAnimation2}>
            <Text className="text-justify text-lg mb-4 leading-relaxed">
              In the early 20th century, Surulere witnessed rapid urbanization
              and population growth, attracting people from various parts of
              Nigeria seeking better opportunities. This influx of residents
              from different ethnic and religious backgrounds contributed to
              Surulere's diverse and vibrant culture.
            </Text>
          </animated.div>

          <animated.div style={rightColAnimation3}>
            <Text className="text-justify text-lg leading-relaxed">
              Despite its modern development, Surulere has retained some of its
              historical charm. The district's grand colonial-style buildings,
              wide avenues, and lush green spaces offer a glimpse into its past.
              Today, Surulere remains a dynamic and exciting place to live and
              visit.
            </Text>
          </animated.div>
        </div>
      </div>
      <Image
        src={ImageCollection.wave1}
        alt="Vector 1"
        className="w-full absolute -bottom-7 md:-bottom-20"
      />
    </div>
  );
};

export default WelcomeToSurulere;
