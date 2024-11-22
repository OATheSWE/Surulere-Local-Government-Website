import { ContactForm, History, TopHero } from "@/src/components";
import React from "react";
///@ts-ignore

const home = () => {
  return (
    <div>
      <TopHero
        headText={`GET IN TOUCH WITH US`}
      />
      <ContactForm />
    </div>
  );
};

export default home;
