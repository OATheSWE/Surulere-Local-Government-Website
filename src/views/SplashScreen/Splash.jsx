import { Text } from "@mantine/core";
import { ImageCollection } from "../../../assets";
import { styles } from "../../data";
import './Splash.css'

const Splash = () => {
  return (
    <div className={`w-full bg-primary h-screen flex flex-col justify-center items-center ${styles.body}`}>
      {/* Animated Text */}
      <Text className="typewriter text-[30px] font-bold text-center text-[#d3f7c1] font-sans mt-6 radiant">
        WELCOME TO SURULERE LOCAL GOVERNMENT
      </Text>
    </div>
  );
};

export default Splash;
