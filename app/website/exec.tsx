import { About, Councils, SecondNav, TopHero } from "@/src/components";
import React from "react";
///@ts-ignore

const home = () => {
  return (
    <div>
      <TopHero
        headText={`Council's Administration`}
        // subText={`Departments in Suruelre Local Government`}
      />
      <SecondNav />
      <Councils />
    </div>
  );
};

export default home;
