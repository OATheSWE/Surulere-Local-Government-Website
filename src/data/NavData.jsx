import {
  IconBuilding, // For Departments
  IconUsers, // For Councils
  IconArticle, // For Blogs
  IconSpeakerphone, // For Adverts
  IconPhoto,
  IconChevronDown, // For Gallery
} from "@tabler/icons-react";

export const dashboardLinks = [
  { label: "Departments", icon: IconBuilding, link: "/admin/departments" },
  { label: "Councils", icon: IconUsers, link: "/admin/councils" },
  { label: "Blogs", icon: IconArticle, link: "/admin/blogs" },
  { label: "Adverts", icon: IconSpeakerphone, link: "/admin/adverts" },
  { label: "Gallery", icon: IconPhoto, link: "/admin/gallery" },
];

export const navLinks = [
  { text: "Home", href: "/home" },
  { text: "About", href: "/about" },
  {
    text: "Council's Administration",
    links: [
      { href: "/exec", text: "Executive Council" },
      { href: "/magt", text: "Management Team" },
      { href: "/leg", text: "Legislative Arm" },
      { href: "/other", text: "Other Appointees" },
    ],
    icon: (
      <IconChevronDown
        style={{ width: '16px', height: '16px' }}
        color={`#98CD5B`}
      />
    ),
  },
  {
    text: "Media",
    links: [
      { href: "/blog", text: "Blog" },
      { href: "/gallery", text: "Gallery" },
      { href: "/events", text: "Events" },
    ],
    icon: (
      <IconChevronDown
        style={{ width: '16px', height: '16px' }}
        color={`#98CD5B`}
      />
    ),
  },
  { text: "History", href: "/history" },
  { text: "Contact Us", href: "/contact" },
  { text: "Login", href: "/login" },
];
