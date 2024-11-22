import React from "react";
import { Avatar, Card, Text } from "@mantine/core";
import { styles } from "../data";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter } from "@tabler/icons-react";

const ExecCouncil: React.FC = () => {
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

  return (
    <div className={`w-full py-10 ${styles.body}`}>
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-primary text-center mb-10">
        EXECUTIVE COUNCIL MEMBERS
      </h1>

      {/* Cards Section */}
      <div className="space-y-8">
        {members.map((member, index) => (
          <Card
            key={index}
            shadow="sm"
            className="flex flex-col lg:flex-row justify-between lg:rounded-full rounded-lg items-center border border-primary pl-8 max-lg:pl-0 py-1 max-lg:py-4 pr-0 mr-0 lg:overflow-visible"
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
            <div className="flex flex-col items-center lg:items-end mt-4 lg:mt-0">
              <Text size="sm" className="text-gray-600 font-medium">
                Contact
              </Text>
              <Text>{member.contact}</Text>
              <div className="flex space-x-2 text-black">
                <IconBrandTwitter
                  size={20}
                  className="hover:text-primary cursor-pointer transition duration-300"
                  onClick={() => {}}
                />
                <IconBrandFacebook
                  size={20}
                  className="hover:text-primary cursor-pointer transition duration-300"
                  onClick={() => {}}
                />
                <IconBrandInstagram
                  size={20}
                  className="hover:text-primary cursor-pointer transition duration-300"
                  onClick={() => {}}
                />
              </div>
            </div>

            {/* Member Image */}
            {member.imageUrl && (
              <Avatar
                src={member.imageUrl}
                size={100}
                radius="50%"
                className="lg:ml-4"
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
