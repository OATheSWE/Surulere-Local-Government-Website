import { Slot } from "expo-router";
import TopHeader from "../../src/components/TopHeader";
import NavBar from "../../src/components/NavBar/NavBar";
import Footer from "../../src/components/Footer";
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
      <Footer />
    </div>
  );
};

export default App;
