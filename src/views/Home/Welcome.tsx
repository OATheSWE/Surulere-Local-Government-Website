import React from "react";
import { Image, Text } from "@mantine/core";
import { ImageCollection } from "@/assets";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { styles } from "@/src/data";

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
      <div className="bg-primary py-8 md:py-16 relative overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-[#90c462] opacity-50 transform -translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 right-0  w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-[#90c462] opacity-50 transform translate-x-10 translate-y-10"></div>

        {/* Content */}
        <div className={`relative z-10 ${styles.body}`}>
          <animated.div style={leftColAnimation}>
            <Text className="text-2xl md:text-4xl font-semibold mb-4 text-center">
              WELCOME TO SURULERE
            </Text>
            <hr className="border-t border-gray-700 mx-auto w-[50%] mb-6" />
          </animated.div>

          <animated.div style={rightColAnimation}>
            <Text className="text-justify text-lg mb-4">
              With love and the spirit of hospitality I welcome you into the
              central part of Lagos state, a city of diversity yet tranquility,
              Surulere The New Lagos, this city was carefully carved out to
              become a habitable and thriving community, situated at the centre
              it attained a cosmopolitan identity of people from different
              tribes to live communally as one family.
            </Text>
          </animated.div>

          <animated.div style={rightColAnimation2}>
            <Text className="text-justify text-lg mb-4 leading-relaxed">
              It has always lived to its expectations with a serene and urban
              landscape, the only local government in Nigeria with two FIFA
              recognized stadia, an Entertainment hub birthing the Nollywood
              industry of Nigeria, a sociable environment known for its buzzing
              night life and an economical friendly environment, little wonder
              it is home to the first indigenous brewing company; The Nigerian
              Breweries and others like flour mills of Nigeria, Dufil Prima
              foods Plc; makers of Indomie noodles, BAGCO Bag company and many
              more vibrant companies in Surulere.
            </Text>
          </animated.div>

          <animated.div style={rightColAnimation3}>
            <Text className="text-justify text-lg leading-relaxed">
              Enjoy the atmosphere and the Eco friendly neighborhoods, with open
              arms we receive you and implore you to be law abiding as you
              experience a city of love, peace and opportunities.
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
