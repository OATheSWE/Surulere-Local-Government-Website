import React from "react";
import { BackgroundImage, Overlay, TextInput, Button } from "@mantine/core";
import { ImageCollection } from "@/assets";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const SubscriptionForm: React.FC = () => {
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

  return (
    <BackgroundImage
      src={ImageCollection.subform} // Replace with your actual image path
      className="p-10 md:p-16 relative z-10"
      ref={ref}
    >
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content Wrapper */}
      <animated.div
        className="relative z-10 text-center"
        style={leftColAnimation}
      >
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
          Stay informed
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center">
          <TextInput placeholder="Name" className="md:col-span-1 w-full" />
          <TextInput
            placeholder="Phone Number"
            className="md:col-span-1 w-full"
          />
          <TextInput placeholder="Email" className="md:col-span-1 w-full" />
          <Button
            className="md:col-span-1 bg-yellow-400 hover:bg-yellow-500 w-full"
            radius="md"
          >
            SUBSCRIBE
          </Button>
        </div>
        <p className="mt-6 text-gray-200 text-sm">
          *Sign up here to receive ALL notifications for News, Agendas, Minutes,
          & Packets. If you don’t want to receive ALL notifications, please
          visit the{" "}
          <a href="#" className="text-yellow-300 underline">
            Subscribe to Updates
          </a>{" "}
          page to be able to select notifications for specific categories.
        </p>
      </animated.div>
    </BackgroundImage>
  );
};

export default SubscriptionForm;
