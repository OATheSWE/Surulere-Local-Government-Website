import React, { useRef, useState } from "react";
import { TextInput, Textarea, FileInput, Button, LoadingOverlay } from "@mantine/core";
import { styles } from "../data";
import { useForm } from "@mantine/form";
import axios from "axios";
import { api } from "../api";
import SuccessModal from "./SuccessModal";

const ContactForm: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const successModalRef = useRef(null);
  const [fileError, setFileError] = useState("");

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const handleOpenSuccessModal = (text: string) => {
    setModalText(text);
    setTimeout(() => {
      if (successModalRef.current) {
        successModalRef.current.openModal();
      }
    }, 0);
  };

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      message: "",
      image: null,
    },
    validate: {
      first_name: (value) => (value ? null : "First name is required"),
      last_name: (value) => (value ? null : "Last name is required"),
      email: (value) => (value ? null : "Email is required"),
      phone_number: (value) => (value ? null : "Phone number is required"),
      message: (value) => (value ? null : "Message is required"),
    },
  });

  const handleSubmit = async (values: any) => {
    toggleVisibility();
    const payload = {
      data: JSON.stringify(values),
    };

    try {
      const response = await axios.post(api.sendEmail, payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toggleVisibility();
      if (response.data.status === "success") {
        handleOpenSuccessModal(response.data.message);
        form.reset();
      } else {
        handleOpenSuccessModal(response.data.message);
      }
    } catch (error) {
      toggleVisibility();
      handleOpenSuccessModal(
        error.response?.data?.message || "An error occurred"
      );
    }
  };

  const handleLogoChange = (file: File | null) => {
    if (file) {
      const fileType = file.type.split("/")[1];
      const fileSize = file.size / 1024;

      if (
        ["jpeg", "png", "jpg", "jfif"].includes(fileType) &&
        fileSize <= 1024
      ) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const logoData = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: reader.result.split(",")[1],
          };
          form.setFieldValue("image", logoData);
        };
        reader.readAsDataURL(file);
        setFileError("");
      } else {
        setFileError(
          "Please upload a JPEG, PNG, or JPG file with a maximum size of 1MB."
        );
      }
    } else {
      setFileError("File selection is required.");
    }
  };

  return (
    <div className={`bg-white flex flex-col items-center ${styles.body}`}>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ blur: 2 }}
        loaderProps={{ color: "#98CD5B", type: "bars" }}
      />
      {/* Header Text */}
      <div className="bg-[#81996521] w-full h-[150px] flex justify-center items-center rounded-es-full rounded-ee-full mb-10">
        <h2 className="text-primary text-center font-semibold text-lg max-w-[500px]">
          USE THE FORM BELOW TO DROP US AN E-MAIL, OLD FASHIONED PHONE CALLS WORK TOO >>> 08012345678
        </h2>
      </div>

      {/* Form Container */}
      <form
        className="w-full max-w-lg space-y-6 mb-5D"
        onSubmit={form.onSubmit(handleSubmit)} // Using Mantine's form onSubmit
      >
        {/* Name Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            placeholder="First Name"
            radius="md"
            size="lg"
            {...form.getInputProps("first_name")}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
          <TextInput
            placeholder="Last Name"
            radius="md"
            size="lg"
            {...form.getInputProps("last_name")}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Contact Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            placeholder="E-mail"
            radius="md"
            size="lg"
            {...form.getInputProps("email")}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
          <TextInput
            placeholder="Phone Number"
            radius="md"
            size="lg"
            {...form.getInputProps("phone_number")}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Message Input */}
        <Textarea
          placeholder="Write us a message"
          radius="md"
          size="lg"
          {...form.getInputProps("message")}
          className="border-gray-300 focus:border-primary focus:ring-primary"
          autosize
          minRows={4}
        />

        {/* File Input */}
        <FileInput
          label="Select Image"
          onChange={handleLogoChange}
          error={fileError}
          placeholder="Upload Image"
          mb="md"
        />

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="outline"
            color="green"
            radius="md"
            size="lg"
            className="hover:bg-primary hover:text-white transition duration-300 mb-4"
          >
            Send it
          </Button>
        </div>
      </form>
      <SuccessModal ref={successModalRef} text={modalText} />
    </div>
  );
};

export default ContactForm;
