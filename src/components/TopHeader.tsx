import React from "react";
import { TextInput } from "@mantine/core";
import {
  IconSearch,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { styles } from "../data";
import { Link } from "expo-router";

const TopHeader: React.FC = () => {
  return (
    <header
      className={`flex items-center justify-between py-4 bg-lime-500 space-x-4 ${styles.body}`}
    >
      {/* Search Bar */}
      <TextInput
        placeholder="Search here"
        leftSection={<IconSearch size={16} />}
        classNames={{
          root: "flex-grow max-w-xs",
          input: "rounded-full border-none text-sm",
        }}
      />

      <Link
        href={`/login`}
        className="bg-green-900 py-2.5 max-w-[80px] w-full flex justify-center items-center rounded-full text-white border-[1.5px] border-green-900 transition duration-300 hover:bg-transparent"
      >
        Login
      </Link>

      {/* Social Media Icons */}
      {/* <div className="flex space-x-4 items-center">
        <div className="flex space-x-2 text-black">
          <IconBrandTwitter
            size={20}
            className="hover:text-gray-600 cursor-pointer"
          />
          <IconBrandFacebook
            size={20}
            className="hover:text-gray-600 cursor-pointer"
          />
          <IconBrandInstagram
            size={20}
            className="hover:text-gray-600 cursor-pointer"
          />
        </div>

       
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-sm text-black font-semibold">
          67° F
        </div>
      </div> */}
    </header>
  );
};

export default TopHeader;
