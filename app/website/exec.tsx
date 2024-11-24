import { api } from "@/src/api";
import { About, Councils, SecondNav, TopHero } from "@/src/components";
import axios from "axios";
import React, { useEffect, useState } from "react";
///@ts-ignore

const home = () => {
  const [councils, setCouncils] = useState([]);
  const [selectedDepartmentData, setSelectedDepartmentData] = useState(null); // State for selected department data

  useEffect(() => {
    fetchCouncils();
  }, []);

  const fetchCouncils = async () => {
    try {
      const response = await axios.get(api.fetchAllCouncils, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.data.status === "success") {
        setCouncils(response.data.councils);
      }
    } catch (error) {
      console.error("Failed to fetch Councils:", error);
    }
  };

  // Function to handle department selection
  const handleDepartmentClick = (councilId) => {
    const department = councils.find(
      (dep) => dep.council_id === councilId
    );
    setSelectedDepartmentData(department ? department.council_data : null);
  };

  return (
    <div>
      <TopHero
        headText={`Council's Administration`}
        // subText={`Departments in Suruelre Local Government`}
      />
      <SecondNav 
        departments={councils} 
        onDepartmentClick={handleDepartmentClick} // Passing handler to SecondNav
      />
      <Councils councilData={selectedDepartmentData}/>
    </div>
  );
};

export default home;
