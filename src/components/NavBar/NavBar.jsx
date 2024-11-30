import React, { useEffect, useState } from "react";
import {
  Group,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Image,
  Menu,
  Collapse,
  Text,
} from "@mantine/core";
import classes from "./NavBar.module.css";
import "./Navbar.css";
import { useDisclosure } from "@mantine/hooks";
import { navLinks, styles } from "../../data";
import { Link } from "expo-router";
import { ImageCollection } from "../../../assets";

export default function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [imageSrc, setImageSrc] = useState(ImageCollection.logo);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpinning(true);
      setTimeout(() => {
        setSpinning(false);
        setImageSrc((prevSrc) =>
          prevSrc === ImageCollection.logo
            ? ImageCollection.logo
            : ImageCollection.logo
        );
      }, 2000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Mapping through navLinks to handle links with and without submenus
  const items = navLinks.map((link, index) => {
    if (link.links) {
      // For links with submenus
      return (
        <Menu
          key={link.text}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              className={`font-sans ${classes.link} relative group cursor-pointer`}
            >
              <div className="flex justify-between items-center">
                <span>{link.text}</span>
                <span>{link.icon}</span>
              </div>
              <span className="absolute h-0.5 w-0 bg-primary bottom-[1px] left-1/2 transition-all ease-out duration-300 group-hover:w-full group-hover:left-0"></span>
            </a>
          </Menu.Target>
          <Menu.Dropdown>
            {link.links.map((item, subIndex) => (
              <Menu.Item key={subIndex}>
                <Link
                  href={item.href}
                  className="font-sans transition duration-300 hover:text-primary"
                >
                  {item.text}
                </Link>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      );
    }
    // For links without submenus
    return (
      <Link
        key={index}
        href={link.href || "#"}
        className={`font-sans ${classes.link} relative group`}
      >
        {link.text}
        <span className="absolute h-0.5 w-0 bg-primary bottom-[1px] left-1/2 transition-all ease-out duration-300 group-hover:w-full group-hover:left-0"></span>
      </Link>
    );
  });

  // Mapping through navLinks to handle links with and without submenus
  const items2 = navLinks.map((link, index) => {
    if (link.links) {
      // For links with submenus
      return (
        <Menu
          key={link.text}
          trigger="click"
          transitionProps={{ exitDuration: 0 }}
          withinPortal={false}
        >
          <Menu.Target>
            <a
              className={`font-sans ${classes.link} relative group cursor-pointer`}
            >
              <div className="flex justify-between items-center">
                <span>{link.text}</span>
                <span>{link.icon}</span>
              </div>
              <span className="absolute h-0.5 w-0 bg-primary bottom-[1px] left-1/2 transition-all ease-out duration-300 group-hover:w-full group-hover:left-0"></span>
            </a>
          </Menu.Target>
          <Menu.Dropdown>
            {link.links.map((item, subIndex) => (
              <Menu.Item key={subIndex}>
                <Link
                  href={item.href}
                  className="font-sans transition duration-300 hover:text-primary"
                >
                  {item.text}
                </Link>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      );
    }
    // For links without submenus
    return (
      <Link
        key={index}
        href={link.href || "#"}
        className={`font-sans ${classes.link} flex justify-between relative group`}
        onClick={closeDrawer}
      >
        {link.text}
        <span className="absolute h-0.5 w-0 bg-primary bottom-[1px] left-1/2 transition-all ease-out duration-300 group-hover:w-full group-hover:left-0"></span>
      </Link>
    );
  });

  return (
    <Box className="relative z-[10]">
      <header
        className={`flex max-lg:justify-end lg:justify-center  items-center font-sans bg-white ${classes.header} ${styles.body}`}
      >
        <Group h="100%" gap={0} className="hidden lg:flex">
          {items}
        </Group>
        <Burger
          opened={drawerOpened}
          onClick={toggleDrawer}
          hiddenFrom="md"
          size={23}
          color="black"
        />
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="70%"
        position="right"
        hiddenFrom="md"
        zIndex={1000000}
        className="font-sans text-white p-0 m-0"
      >
        <ScrollArea
          h="calc(100vh - 80px)"
          mx="-md"
          className="px-10"
          bg="#ffffff"
        >
          {items2}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
