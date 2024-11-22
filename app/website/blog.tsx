import { AllBlogs, SecondNav, SingleBlog, TopHero } from "@/src/components";
import React from "react";
///@ts-ignore

const home = () => {
  return (
    <div>
      <TopHero headText={`SURULERE BLOG: STAY INFORMED`} />
      <SecondNav />
      <SingleBlog />
    </div>
  );
};

export default home;
