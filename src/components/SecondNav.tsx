import React from "react";
import { styles } from "../data";

const links = [
  "Link 1",
  "Link 2",
  "Link 3",
  "Link 4",
  "Link 5",
  "Link 6",
  "Link 7",
  "Link 8",
  "Link 9",
  "Link 10",
  "Link 11",
  "Link 12",
];

const SecondNav: React.FC = () => {
  // Function to handle the drag-to-scroll behavior
  const handleDragScroll = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    target.onmousedown = (e) => {
      isDragging = true;
      startX = e.pageX - target.offsetLeft;
      scrollLeft = target.scrollLeft;
      document.onmousemove = (ev) => {
        if (!isDragging) return;
        ev.preventDefault();
        const x = ev.pageX - target.offsetLeft;
        const walk = (x - startX) * 1; // The multiplier controls the scroll speed
        target.scrollLeft = scrollLeft - walk;
      };
      document.onmouseup = () => {
        isDragging = false;
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  };

  return (
    <div
      className={`bg-white ${styles.body} py-3 border-y-[1.5px] border-primary flex items-center justify-between overflow-x-auto whitespace-nowrap`}
      onMouseDown={handleDragScroll}
      style={{ cursor: "grab", scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {links.map((link, index) => (
        <a
          key={index}
          href="#"
          className="text-primary hover:underline mx-3 transition duration-300"
        >
          {link}
        </a>
      ))}
    </div>
  );
};

export default SecondNav;
