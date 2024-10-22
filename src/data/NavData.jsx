import {
  IconBuilding, // For Departments
  IconUsers,    // For Councils
  IconArticle,  // For Blogs
  IconSpeakerphone,// For Adverts
  IconPhoto,    // For Gallery
} from "@tabler/icons-react";

export const dashboardLinks = [
  { label: "Departments", icon: IconBuilding, link: "/admin/departments" },
  { label: "Councils", icon: IconUsers, link: "/admin/councils" },
  { label: "Blogs", icon: IconArticle, link: "/admin/blogs" },
  { label: "Adverts", icon: IconSpeakerphone, link: "/admin/adverts" },
  { label: "Gallery", icon: IconPhoto, link: "/admin/gallery" },
];
