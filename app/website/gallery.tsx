import { GalleryPage, TopHero } from "@/src/components";
import React from "react";
///@ts-ignore

const home = () => {
  return (
    <div>
      <TopHero
        headText={`GALLERY : OUR COMMUNITY IN PICTURES`}
      />
      <GalleryPage />
    </div>
  );
};

export default home;
