import { Slot } from "expo-router";
import NavBar from "../../src/components/Navigation/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Slot />
    </div>
  );
};

export default App;
