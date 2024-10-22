import React, { useState, useEffect } from "react";
import {
  PasswordInput,
  Button,
  Card,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import axios from "axios";
import { api } from "@/src/api";
import { styles } from "@/src/data";
import SuccessModal from "../../components/SuccessModal";
import { useSpring, animated } from "@react-spring/web";
import CryptoJS from "crypto-js";
import { router } from "expo-router";
import { useForm } from "@mantine/form";

const Login: React.FC = () => {
  const form = useForm({
    initialValues: {
      password: "",
    },
    validate: {
      password: (value) => (value ? null : "Password is required"),
    },
  });

  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = React.useState("");
  const successModalRef = React.useRef(null);

  const secretKey =
    "39f3b92a5d6c47a4b98f4e0c1c87a24b5e0a21c9b6b2f7a4f8e9f415f95a1b4c5";

  const handleOpenSuccessModal = (text: string) => {
    setModalText(text);
    setTimeout(() => {
      if (successModalRef.current) {
        successModalRef.current.openModal();
      }
    }, 0);
  };

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const handleLogin = async (values: { password: string }) => {
    toggleVisibility();
    try {
      const response = await axios.post(api.login, values, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.data.status === "success") {
        toggleVisibility();
        handleOpenSuccessModal(response.data.message);
        form.reset();
        const userId = "loggedIn";
        const encryptedUserId = CryptoJS.AES.encrypt(userId, secretKey).toString();
        localStorage.setItem("aba", encryptedUserId);
        setTimeout(() => {
          router.replace("/admin/departments");
        }, 1500);
      } else {
        toggleVisibility();
        handleOpenSuccessModal(response.data.message);
        form.reset();
      }
    } catch (error: any) {
      toggleVisibility();
      handleOpenSuccessModal(
        error.response?.data?.message || "An error occurred"
      );
    }
  };

  const slideInStyles = useSpring({
    from: { transform: "translateY(100%)" },
    to: { transform: "translateY(0%)" },
    config: { tension: 220, friction: 30 },
  });

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-white ${styles.body}`}
    >
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ blur: 2 }}
        loaderProps={{ color: "#98CD5B", type: "bars" }}
      />
      <animated.div style={slideInStyles} className={`max-w-[600px] w-full`}>
        <Card shadow="xl" padding="lg" className="bg-gray-50">
          <Text size="lg" fw={500} className="mb-4 text-center">
            Login
          </Text>
          <form
            onSubmit={form.onSubmit(handleLogin)}
            className="max-w-[600px] w-full"
          >
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps("password")}
              error={form.errors.password}
              mb="lg"
            />
            <div className="flex justify-center items-center">
              <Button
                type="submit"
                className="mt-4 bg-primary border-[1.5px] border-primary text-white px-14 h-[40px] rounded-md transition duration-300 hover:bg-transparent hover:text-primary"
              >
                Login
              </Button>
            </div>
          </form>
        </Card>
      </animated.div>
      <SuccessModal ref={successModalRef} text={modalText} />
    </div>
  );
};

export default Login;
