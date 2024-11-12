import React from "react";
import { Image, Text } from "@mantine/core";
import { ImageCollection } from "@/assets";

const WelcomeToSurulere: React.FC = () => {
  return (
    <div className="relative">
      <Image src={ImageCollection.wave2} alt="Vector 2" className="w-full absolute -top-7 md:-top-[60px] lg:-top-[80px]" />
      <div className="bg-primary p-8 md:p-16 lg:px-32 relative overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-[#90c462] opacity-50 transform -translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 right-0  w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-[#90c462] opacity-50 transform translate-x-10 translate-y-10"></div>

        {/* Content */}
        <div className="relative z-10">
          <Text className="text-2xl md:text-4xl font-semibold mb-4 text-center">
            WELCOME TO SURULERE
          </Text>
          <hr className="border-t border-gray-700 mx-auto w-[50%] mb-6" />

          <Text className="text-justify text-lg italic mb-4">
            <span className="font-semibold">Surulere</span> (Yoruba word meaning
            <span className="font-semibold"> “Patience is Profitable”</span>), a
            vibrant district in Lagos, Nigeria, has a rich history dating back
            to the colonial era. Originally a residential area for European
            expatriates, Surulere has evolved into a bustling commercial and
            cultural hub.
          </Text>

          <Text className="text-justify text-lg mb-4 leading-relaxed">
            In the early 20th century, Surulere witnessed rapid urbanization and
            population growth, attracting people from various parts of Nigeria
            seeking better opportunities. This influx of residents from
            different ethnic and religious backgrounds contributed to Surulere's
            diverse and vibrant culture.
          </Text>

          <Text className="text-justify text-lg leading-relaxed">
            Despite its modern development, Surulere has retained some of its
            historical charm. The district's grand colonial-style buildings,
            wide avenues, and lush green spaces offer a glimpse into its past.
            Today, Surulere remains a dynamic and exciting place to live and
            visit.
          </Text>
        </div>
      </div>
      <Image src={ImageCollection.wave1} alt="Vector 1" className="w-full absolute -bottom-7 md:-bottom-20" />
    </div>
  );
};

export default WelcomeToSurulere;
