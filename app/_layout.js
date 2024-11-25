import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import "../global.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import { router, Slot } from "expo-router";
import { Notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { Splash } from "../src/views";


const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Set a timer to hide the splash screen after 5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Navigate to /website after the splash screen is hidden
    if (!showSplash) {
      router.replace("/website"); // Use replace to avoid keeping the splash in history
    }
  }, [showSplash, router]);

  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        {showSplash ? (
          <Splash />
        ) : (
          <div>
            <div className="overflow-x-hidden">
              <Slot />
            </div>
          </div>
        )}
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
