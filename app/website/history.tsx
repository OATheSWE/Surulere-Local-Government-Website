import { History, TopHero } from "@/src/components";
import React from "react";
///@ts-ignore

const home = () => {
  return (
    <div>
      <TopHero
        headText={`HISTORY OF SURULERE LOCAL GOVERNMENT `}
      />
      <History />
    </div>
  );
};

export default home;
