import React, { useEffect, useRef, useState } from "react";
import { Group, Box, Burger, Drawer, Text, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, router } from "expo-router";
import classes from "./SideNav.module.css";
import { ImageCollection } from "@/assets";
import {
  IconArticle,
  IconBuilding,
  IconUsers,
  IconLogout,
  IconPhoto,
  IconSearch,
  IconSpeakerphone,
} from "@tabler/icons-react";
import "./Navbar.css"; // Ensure that this CSS handles the overflow styling
import { dashboardLinks, styles } from "@/src/data";
import ConfirmModal from "../ConfirmModal";

export default function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [visible, setVisible] = useState(true);

  const confirmModalRef = useRef(null); // Ref for ConfirmModal

  const iconMap = {
    IconBuilding: IconBuilding, // Added
    IconUsers: IconUsers, // Updated with the correct usage
    IconArticle: IconArticle, // Added
    IconSpeakerphone: IconSpeakerphone, // Added
    IconPhoto: IconPhoto, // Added
  };

  const handleLogout = () => {
    toggleDrawer();
    if (confirmModalRef.current) {
      confirmModalRef.current.openModal();
    }
  };

  const handleConfirmLogout = () => {
    toggleVisibility();
    localStorage.removeItem("aba");
    setTimeout(() => {
      router.replace("/login");
    }, 2000);
  };

  // State to store the user name and role
  const [active, setActive] = useState("Departments");

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const links =
    dashboardLinks.length > 0
      ? dashboardLinks.map((item) => {
          // Dynamically get the icon component from iconMap
          const IconComponent = iconMap[item.icon];

          return (
            <Link
              className={`${classes.link} ${
                item.label === active ? "bg-primary text-white" : ""
              } hover:bg-gray-200 focus:bg-primary focus:text-white`}
              href={item.link}
              key={item.label}
              onPress={(event) => {
                event.preventDefault();
                setActive(item.label);
                router.push(item.link);
              }}
            >
              {/* Render the icon dynamically */}
              {IconComponent && (
                <IconComponent className={classes.linkIcon} stroke={1.5} />
              )}
              <span>{item.label}</span>
            </Link>
          );
        })
      : null;

  const links2 =
    dashboardLinks.length > 0
      ? dashboardLinks.map((item) => {
          // Dynamically get the icon component from iconMap
          const IconComponent = iconMap[item.icon];

          return (
            <Link
              className={`${classes.link} ${
                item.label === active ? "bg-primary text-white" : ""
              } hover:bg-gray-200 focus:bg-primary focus:text-white`}
              href={item.link}
              key={item.label}
              onPress={(event) => {
                event.preventDefault();
                setActive(item.label);
                router.push(item.link);
                toggleDrawer(); // Assuming toggleDrawer is a function to close the drawer
              }}
            >
              {/* Render the icon dynamically */}
              {IconComponent && (
                <IconComponent className={classes.linkIcon} stroke={1.5} />
              )}
              <span>{item.label}</span>
            </Link>
          );
        })
      : null;

  return (
    <Box className="fixed w-full z-[99999] shadow-xl h-[80px]">
      <header
        className={`flex justify-between items-center bg-primary h-[80px] py-6 font-sans ${styles.body}`}
      >
        <div className="lg:hidden">
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            size={23}
            color="white"
          />
        </div>

        <div className="border-white rounded-full border flex items-center max-w-[250px] px-3 py-2 bg-transparent max-lg:hidden ml-60">
          <IconSearch size={"22px"} className="text-white mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full text-white placeholder:text-white outline-none"
          />
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex flex-col">
            <div>
              <Text className="text-[18px] max-[480px]:text-[15px] font-sans text-white font-semibold max-w-[200px] truncate w-full">
                Admin
              </Text>
            </div>
          </div>
        </div>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="70%"
        position="left"
        zIndex={1000000}
        className="font-sans text-black"
      >
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify="space-between">
              <Image src={ImageCollection.logo} className="w-[50px]" />
              <Text fw={700} className="text-primary">
                Surulere
                <br />
                LG
              </Text>
            </Group>
            {links2}
          </div>

          <div className={classes.footer}>
            <a href="#" className={classes.link} onClick={handleLogout}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </div>
        </nav>
      </Drawer>

      <div className="max-lg:hidden -mt-20 w-[300px] z-[150]">
        <nav className={classes.navbar} style={{ width: "300px" }}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify="space-between">
              <Image src={ImageCollection.logo} className="w-[50px]" />
              <Text fw={700} className="text-primary">
                Surulere
                <br />
                LG
              </Text>
            </Group>
            {links}
          </div>

          <div className={classes.footer}>
            <a href="#" className={classes.link} onClick={handleLogout}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </div>
        </nav>
      </div>
      {/* ConfirmModal component instance */}
      <ConfirmModal
        ref={confirmModalRef}
        onConfirm={handleConfirmLogout}
        text={"Are you sure you want to logout?"}
      />
    </Box>
  );
}
