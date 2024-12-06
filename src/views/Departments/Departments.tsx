import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  TextInput,
  Textarea,
  Group,
  Image,
  LoadingOverlay,
  FileInput,
  BackgroundImage,
  SimpleGrid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSpring, animated } from "@react-spring/web";
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import ConfirmModal from "../../components/ConfirmModal";
import SuccessModal from "../../components/SuccessModal";
import classes from "../../components/modals.module.css";
import { api } from "@/src/api";
import { styles } from "@/src/data";
import { router } from "expo-router";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [visible, setVisible] = useState(true); // For LoadingOverlay visibility
  const [visible2, setVisible2] = useState(false); // For LoadingOverlay visibility
  const [modalText, setModalText] = useState(""); // For success modal text
  const successModalRef = useRef(null);
  const confirmModalRef = useRef(null); // Confirm modal reference
  const [fileError, setFileError] = useState("");

  const form = useForm({
    initialValues: {
      department_name: "",
      department_text: "",
      image: null, // For storing the uploaded image object
    },
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(api.fetchAllDepartments, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.data.status === "success") {
        setDepartments(response.data.departments);
        toggleVisibility();
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const toggleVisibility2 = () => {
    setVisible2((prevVisible) => !prevVisible);
  };

  const handleOpenSuccessModal = (text) => {
    setModalText(text);
    setTimeout(() => {
      if (successModalRef.current) {
        successModalRef.current.openModal();
      }
    }, 0);
  };

  const handleAddDepartment = () => {
    form.reset();
    setAddModalOpen(true);
  };

  const handleEditDepartment = (dept) => {
    form.setValues({
      department_name: dept.department_name,
      department_text: dept.department_data.text,
      image: dept.department_data.image, // Assuming the image is already an object; otherwise, process it accordingly
    });
    setSelectedDepartment(dept);
    setEditModalOpen(true);
  };

  const handleAddSubmit = async (values) => {
    toggleVisibility2();
    const departmentPayload = {
      department_name: values.department_name,
      department_data: JSON.stringify({
        text: values.department_text,
        image: values.image,
      }),
    };

    try {
      const response = await axios.post(
        api.createDepartment,
        departmentPayload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      toggleVisibility2();
      if (response.data.status === "success") {
        handleOpenSuccessModal(response.data.message);
        setTimeout(() => {
          router.replace("/admin/departments"); // Use replace instead of push for navigation
        }, 1500);
        setAddModalOpen(false);
        form.reset();
      } else {
        handleOpenSuccessModal(response.data.message);
      }
    } catch (error) {
      toggleVisibility2();
      handleOpenSuccessModal(
        error.response?.data?.message || "An error occurred"
      );
    }
  };

  const handleEditSubmit = async (values) => {
    toggleVisibility2();
    const departmentPayload = {
      department_id: selectedDepartment.department_id,
      department_name: values.department_name,
      department_data: JSON.stringify({
        text: values.department_text,
        image: values.image,
      }),
    };

    try {
      const response = await axios.post(
        api.updateDepartment,
        departmentPayload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      toggleVisibility2();
      if (response.data.status === "success") {
        handleOpenSuccessModal(response.data.message);
        setTimeout(() => {
          router.replace("/admin/departments"); // Use replace instead of push for navigation
        }, 1500);
        setEditModalOpen(false);
        form.reset();
      } else {
        handleOpenSuccessModal(response.data.message);
      }
    } catch (error) {
      toggleVisibility2();
      handleOpenSuccessModal(
        error.response?.data?.message || "An error occurred"
      );
    }
  };

  const handleLogoChange = (file) => {
    if (file) {
      const fileType = file.type.split("/")[1];
      const fileSize = file.size / 1024; // convert to KB

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
        reader.readAsDataURL(file); // Trigger file read
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

  const handleDeleteDepartment = () => {
    if (confirmModalRef.current) {
      confirmModalRef.current.openModal();
    }
  };

  const handleConfirmDelete = async () => {
    toggleVisibility2();
    try {
      const response = await axios.post(
        api.deleteDepartment,
        { department_id: selectedDepartment.department_id },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      toggleVisibility2();
      if (response.data.status === "success") {
        handleOpenSuccessModal(response.data.message);
        setDepartments(
          departments.filter(
            (dept) => dept.department_id !== selectedDepartment.department_id
          )
        );
      } else {
        handleOpenSuccessModal(response.data.message);
      }
    } catch (error) {
      toggleVisibility2();
      handleOpenSuccessModal(
        error.response?.data?.message || "An error occurred"
      );
    }
  };

  // Slide-in animation
  const slideInStyles = useSpring({
    from: { transform: "translateY(100%)" },
    to: { transform: "translateY(0%)" },
    config: { tension: 220, friction: 30 },
  });

  return (
    <div className={`bg-gray-100 py-28 lg:pl-[330px] ${styles.body} w-full`}>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ blur: 2 }}
        loaderProps={{ color: "#98CD5B", type: "bars" }}
      />
      <animated.div
        className={`bg-white w-full rounded-lg p-4`}
        style={slideInStyles}
      >
        <h1 className="text-center font-bold">Departments</h1>
        <Button
          onClick={handleAddDepartment}
          leftSection={<IconPlus />}
          className="bg-primary rounded-full border-primary border-2 hover:bg-transparent hover:text-black transition duration-300 mt-5"
        >
          Add Department
        </Button>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
          mt={`2rem`}
        >
          {departments.map((dept) => (
            <BackgroundImage
              key={dept.department_id}
              className={`max-w-[300px] w-full h-[200px] border-primary border-2 hover:-translate-y-2 duration-300 transition flex flex-col justify-between p-4 rounded-lg`}
              src={`${encodeURIComponent(dept.department_data.image?.path)}`}
            >
              <div>
                <h2 className="text-white bg-primary w-full p-1 rounded-full text-center">{dept.department_name}</h2>
              </div>
              <div className="flex justify-between">
                <IconEdit
                  onClick={() => handleEditDepartment(dept)}
                  className="cursor-pointer bg-primary h-[30px] w-[30px] p-1 rounded-full hover:bg-secondary transition duration-300"
                />
                <IconTrash
                  onClick={() => {
                    setSelectedDepartment(dept);
                    handleDeleteDepartment();
                  }}
                  className="cursor-pointer bg-primary h-[30px] w-[30px] p-1 rounded-full hover:bg-secondary transition duration-300"
                />
              </div>
            </BackgroundImage>
          ))}
        </SimpleGrid>
      </animated.div>

      {/* Add Modal */}
      <Modal
        opened={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Department"
        classNames={classes}
      >
        <LoadingOverlay
          visible={visible2}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
          loaderProps={{ color: "#98CD5B", type: "bars" }}
        />
        <form onSubmit={form.onSubmit(handleAddSubmit)}>
          <TextInput
            required
            label="Department Name"
            {...form.getInputProps("department_name")}
            mb={`md`}
          />
          <Textarea
            label="Description"
            {...form.getInputProps("department_text")}
            mb={`md`}
            minRows={4}
            required
            autosize
          />
          <FileInput
            label="Upload Image (JPEG, PNG, JPG only)"
            required
            onChange={handleLogoChange}
            error={fileError}
            mb={`md`}
          />
          <Button
            type="submit"
            className="bg-primary rounded-full border-primary border-2 hover:bg-transparent hover:text-black transition duration-300 mt-5 w-full"
          >
            Submit
          </Button>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Department"
        classNames={classes}
      >
        <LoadingOverlay
          visible={visible2}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
          loaderProps={{ color: "#98CD5B", type: "bars" }}
        />
        <form onSubmit={form.onSubmit(handleEditSubmit)}>
          <TextInput
            required
            label="Department Name"
            {...form.getInputProps("department_name")}
            mb={`md`}
          />
          <Textarea
            label="Description"
            {...form.getInputProps("department_text")}
            mb={`md`}
            minRows={4}
            autosize
            required
          />
          <FileInput
            label="Upload Image (JPEG, PNG, JPG only)"
            accept="image/jpeg, image/png, image/jpg"
            required
            onChange={handleLogoChange}
            error={fileError}
            mb={`md`}
          />
          <Button
            type="submit"
            className="bg-primary rounded-full border-primary border-2 hover:bg-transparent hover:text-black transition duration-300 mt-5 w-full"
          >
            Update
          </Button>
        </form>
      </Modal>

      {/* Confirm & Success Modals */}
      <ConfirmModal
        ref={confirmModalRef}
        onConfirm={handleConfirmDelete}
        text="Are you sure you want to delete this department?"
      />
      <SuccessModal ref={successModalRef} text={modalText} />
    </div>
  );
}
