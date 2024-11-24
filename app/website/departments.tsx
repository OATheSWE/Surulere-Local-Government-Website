import { About, SecondNav, TopHero } from "@/src/components";
import React from "react";
///@ts-ignore

const home = () => {
  return (
    <div>
      <TopHero
        headText={`Departments`}
        subText={`Departments in Suruelere Local Government`}
      />
      <SecondNav />
      <About />
    </div>
  );
};

export default home;
