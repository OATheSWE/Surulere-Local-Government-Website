import { Slot } from "expo-router";
import NavBar3 from "../../src/components/Navigation/NavBar3";

const App = () => {
  return (
    <div>
      <NavBar3 />
      <Slot />
    </div>
  );
};

export default App;
