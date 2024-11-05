import { Slot } from "expo-router";
import TopHeader from "../../src/components/TopHeader";
import NavBar from "../../src/components/NavBar/NavBar";
import { ImageCollection } from "../../assets";
import { Image } from "@mantine/core";

const App = () => {
  return (
    <div>
      <TopHeader />
      <NavBar />
      <Image
        src={ImageCollection.topImage}
        alt="Design"
        className={`w-full h-[15px] -mt-5`}
        loading="lazy"
      />
      <Slot />
    </div>
  );
};

export default App;
