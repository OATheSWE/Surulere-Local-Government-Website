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
  { text: "Home", href: "/website" },
  { text: "Departments", href: "/website/departments" },
  {
    text: "Secretariat",
    links: [
      { href: "/website/exec", text: "Executive Council" },
      { href: "/website/exec", text: "Management Team" },
      { href: "/website/exec", text: "Legislative Arm" },
      { href: "/website/exec", text: "Other Appointees" },
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
      { href: "/website/allBlogs", text: "Blog" },
      { href: "/website/gallery", text: "Gallery" },
      // { href: "/website/events", text: "Events" },
    ],
    icon: (
      <IconChevronDown
        style={{ width: '16px', height: '16px' }}
        color={`#98CD5B`}
      />
    ),
  },
  { text: "History", href: "/website/history" },
  { text: "Contact Us", href: "/website/contact" },
  // { text: "Login", href: "/login" },
];
