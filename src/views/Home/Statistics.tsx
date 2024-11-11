import React from 'react';
import { Card, Text } from '@mantine/core';

const statistics = [
  {
    value: '1m+',
    description: 'Residents as of 2023',
  },
  {
    value: '40%',
    description: 'of the population are youths',
  },
  {
    value: '60-80',
    description: 'healthcare facilities in total, combining public and private institutions',
  },
  {
    value: '1000+',
    description: 'public and private primary and secondary schools',
  },
];

const KeyStatistics: React.FC = () => {
  return (
    <div className="py-12 px-4" style={{ background: "radial-gradient(circle, #FFFFFF, #A3B78D)" }}>
      <Text className="text-center text-3xl font-semibold text-[#678d52] mb-10">KEY STATISTICS</Text>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((stat, index) => (
          <Card
            key={index}
            shadow="lg"
            radius="md"
            className="flex flex-col items-center bg-[#E4F4D2] h-[200px] justify-center border-[1.5px] border-gray-500 hover:shadow-lg transition-shadow"
          >
            <Text className="text-6xl font-bold text-[#2e2e2e] mb-2">{stat.value}</Text>
            <Text className="text-center text-gray-600">{stat.description}</Text>
          </Card>
        ))}
      </div>
      {/* <div className="flex justify-center mt-4">
        <button className="text-sm font-medium text-gray-700 hover:text-gray-900 underline">
          View More
        </button>
      </div> */}
    </div>
  );
};

export default KeyStatistics;
