import React from "react";
import { styles } from "../data";

const SecondNav: React.FC = ({ departments, onDepartmentClick }) => {
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
      style={{
        cursor: "grab",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {departments.map((department) => (
        <p
          key={department.department_id || department.council_id}
          className="text-primary hover:underline mx-3 transition duration-300"
          onClick={() => onDepartmentClick(department.department_id || department.council_id)} // Trigger department click
        >
          {department.department_name || department.council_name}
        </p>
      ))}
    </div>
  );
};

export default SecondNav;
