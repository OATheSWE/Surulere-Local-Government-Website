import { Image, Text } from "@mantine/core";
import { ImageCollection } from "../../../assets";
import { styles } from "../../data";

const Splash = () => {
  return (
    <div className={`w-full bg-primary h-screen flex flex-col justify-center items-center ${styles.body}`}>
      <Text className="text-[20px] font-bold text-center text-white font-sans">
        Surulere<br /><span className="text-center text-[25px]">LG</span>
      </Text>
    </div>
  );
};

export default Splash;
