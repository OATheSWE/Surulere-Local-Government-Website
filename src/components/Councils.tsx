import React from "react";
import { Avatar, Card, Image, Text } from "@mantine/core";
import { styles } from "../data";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { router } from "expo-router";

const ExecCouncil: React.FC = ({ councilData }) => {
  // Sample data for exec members
  const members = [
    {
      name: "Hon. John John",
      position: "Exec Chairman",
      contact: "08090123445",
      imageUrl: "https://via.placeholder.com/80", // Replace with actual image URL
    },
    {
      name: "Hon. Jane Doe",
      position: "Exec Member",
      contact: "08091234567",
      imageUrl: "https://via.placeholder.com/80",
    },
    {
      name: "Hon. Richard Roe",
      position: "Treasurer",
      contact: "08092345678",
      imageUrl: "https://via.placeholder.com/80",
    },
  ];

  if (!councilData) {
    return <p>Please select a council to view its members.</p>;
  }

  return (
    <div className={`w-full py-10 ${styles.body}`}>
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-primary text-center mb-10">
        COUNCIL MEMBERS
      </h1>

      {/* Cards Section */}
      <div className="space-y-8">
        {councilData.map((member, index) => (
          <Card
            key={index}
            shadow="sm"
            className="flex flex-col lg:flex-row justify-between lg:rounded-full rounded-lg items-center border border-primary pl-8 max-lg:pl-0 py-1 max-lg:py-4 pr-0 mr-0 lg:overflow-visible transition duration-300 hover:shadow-2xl"
          >
            {/* Member Details */}
            <div className="flex-1 text-center lg:text-left">
              <Text size="xl" className="text-gray-700 font-bold">
                {member.name}
              </Text>
              <Text className="text-gray-500">{member.position}</Text>
            </div>

            {/* Contact Section */}
            <div className="flex space-x-3 max-lg:mt-4 items-center lg:-mr-8">
              {member.linkedin && (
                <div className="flex flex-col items-center lg:items-end mt-4 lg:mt-0">
                  <Text size="sm" className="text-gray-600 font-medium">
                    Contact
                  </Text>
                  {/* <Text>{member.contact}</Text> */}
                  <div className="flex space-x-2 text-black">
                    {/* <IconBrandTwitter
                  size={20}
                  className="hover:text-primary cursor-pointer transition duration-300"
                  onClick={() => {}}
                />
                <IconBrandFacebook
                  size={20}
                  className="hover:text-primary cursor-pointer transition duration-300"
                  onClick={() => {}}
                /> */}
                    <IconBrandLinkedin
                      size={20}
                      className="hover:text-primary cursor-pointer transition duration-300"
                      onClick={() => {
                        router.push(`${member.linkedin}`);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Member Image */}
              {member.image && (
                <Image
                  src={`http://localhost:8000/${member.image.path}`}
                  radius="50%"
                  className="lg:ml-4 w-[120px] h-[120px]"
                />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExecCouncil;
