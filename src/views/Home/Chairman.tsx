import React from "react";
import { Card, Text, Image } from "@mantine/core";
import { ImageCollection } from "@/assets";

const MeetOurChairman: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#9bc48b] to-[#d0ddd0] p-8 py-16 flex flex-col lg:flex-row items-center justify-center">
      {/* Text Section */}
      <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
        <Text className="text-center lg:text-left text-4xl font-semibold mb-4">
          MEET OUR CHAIRMAN
        </Text>
        <Text className="text-justify italic mb-4 text-lg leading-relaxed">
          "Dear Citizens of Surulere,
          <br />
          It is my great honor to serve as your Chairman, and I am committed to
          fostering a thriving and united community. Our focus remains on
          improving infrastructure, empowering our youth, and ensuring that
          Surulere continues to be a beacon of progress in Lagos. Together, we
          can build a better future. Thank you for your continued trust and
          support."
        </Text>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-end relative">
        <Image
          src={ImageCollection.chairman} // Replace with actual image path or URL
          alt="Surulere LG Chairman"
          className="w-full"
        />
        <Card className="bg-[#9bc48b] mt-4 text-center rounded-lg shadow-lg p-2 w-full absolute -bottom-3 max-w-[360px] -left-5">
          <Text className="font-semibold">Honorable Bamidele Sulieman Yusuf</Text>
          <Text className="text-sm">Chairman, Surulere Local Government</Text>
        </Card>
      </div>
    </div>
  );
};

export default MeetOurChairman;
