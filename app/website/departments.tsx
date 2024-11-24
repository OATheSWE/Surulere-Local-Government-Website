import { api } from "@/src/api";
import { About, SecondNav, TopHero } from "@/src/components";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentData, setSelectedDepartmentData] = useState(null); // State for selected department data

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(api.fetchAllDepartments, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.data.status === "success") {
        setDepartments(response.data.departments);
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  // Function to handle department selection
  const handleDepartmentClick = (departmentId) => {
    const department = departments.find(dep => dep.department_id === departmentId);
    setSelectedDepartmentData(department ? department.department_data : null);
  };

  return (
    <div>
      <TopHero
        headText="Departments"
        subText="Departments in Suruelere Local Government"
      />
      <SecondNav 
        departments={departments} 
        onDepartmentClick={handleDepartmentClick} // Passing handler to SecondNav
      />
      <About departmentData={selectedDepartmentData} /> {/* Passing selected department data to About */}
    </div>
  );
};

export default Home;
