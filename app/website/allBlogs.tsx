import { AllBlogs, SecondNav, TopHero } from "@/src/components";
import React from "react";
///@ts-ignore

const home = () => {
  return (
    <div>
      <TopHero headText={`SURULERE BLOG: STAY INFORMED`} />
      <SecondNav />
      <AllBlogs />
    </div>
  );
};

export default home;
