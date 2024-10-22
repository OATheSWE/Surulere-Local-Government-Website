import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  TextInput,
  Group,
  LoadingOverlay,
  FileInput,
  SimpleGrid,
  ActionIcon,
} from "@mantine/core";
import { useForm, formList } from "@mantine/form";
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import ConfirmModal from "../../components/ConfirmModal";
import SuccessModal from "../../components/SuccessModal";
import classes from "../../components/modals.module.css";
import { api } from "@/src/api";
import { styles } from "@/src/data";
import { router } from "expo-router";
import { useSpring, animated } from "@react-spring/web";

export default function Council() {
  const [councils, setCouncils] = useState([]);
  const [selectedCouncil, setSelectedCouncil] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [modalText, setModalText] = useState("");
  const successModalRef = useRef(null);
  const confirmModalRef = useRef(null);
  const [councilMembers, setCouncilMembers] = useState([]);

  const form = useForm({
    initialValues: {
      council_name: "",
    },
  });

  useEffect(() => {
    fetchCouncils();
  }, []);

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const toggleVisibility2 = () => {
    setVisible2((prevVisible) => !prevVisible);
  };

  const fetchCouncils = async () => {
    try {
      const response = await axios.get(api.fetchAllCouncils);
      if (response.data.status === "success") {
        setCouncils(response.data.councils);
        toggleVisibility();
      }
    } catch (error) {
      console.error("Failed to fetch councils:", error);
    }
  };

  const handleAddCouncil = () => {
    form.reset();
    setCouncilMembers([]);
    setAddModalOpen(true);
  };

  const handleEditCouncil = (council) => {
    form.setValues({
      council_name: council.council_name,
    });
    setCouncilMembers(council.council_data || []);
    setSelectedCouncil(council);
    setEditModalOpen(true);
  };

  const handleAddMember = () => {
    setCouncilMembers((prevMembers) => [
      ...prevMembers,
      { name: "", position: "", phoneNumber: "", image: null },
    ]);
  };

  const handleRemoveMember = (index) => {
    setCouncilMembers((prevMembers) =>
      prevMembers.filter((_, i) => i !== index)
    );
  };

  const handleOpenSuccessModal = (text) => {
    setModalText(text);
    setTimeout(() => {
      if (successModalRef.current) {
        successModalRef.current.openModal();
      }
    }, 0);
  };

  const handleAddSubmit = async (values) => {
    toggleVisibility2();
    const councilPayload = {
      council_name: values.council_name,
      council_data: JSON.stringify(council_members),
    };

    try {
      const response = await axios.post(api.createCouncil, councilPayload);
      toggleVisibility2();
      if (response.data.status === "success") {
        handleOpenSuccessModal(response.data.message);
        setTimeout(() => {
          router.replace("/admin/councils");
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
    const councilPayload = {
      council_id: selectedCouncil.council_id,
      council_name: values.council_name,
      council_data: JSON.stringify(council_members),
    };

    try {
      const response = await axios.post(api.updateCouncil, councilPayload);
      toggleVisibility2();
      if (response.data.status === "success") {
        handleOpenSuccessModal(response.data.message);
        setTimeout(() => {
          router.replace("/admin/councils");
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

  const handleDeleteCouncil = () => {
    if (confirmModalRef.current) {
      confirmModalRef.current.openModal();
    }
  };

  const handleConfirmDelete = async () => {
    toggleVisibility2();
    try {
      const response = await axios.post(
        api.deleteCouncil,
        { council_id: selectedCouncil.council_id },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      toggleVisibility2();
      if (response.data.status === "success") {
        handleOpenSuccessModal(response.data.message);
        setCouncils(
          councils.filter(
            (council) => council.council_id !== selectedCouncil.council_id
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
        <h1 className="text-center font-bold">Council Management</h1>
        <Button
          onClick={handleAddCouncil}
          leftSection={<IconPlus />}
          className="bg-primary rounded-full border-primary"
          mt={`md`}
        >
          Add Council
        </Button>

        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
          mt={`2rem`}
        >
          {councils.map((council) => (
            <div
              className="max-w-[300px] bg-secondary w-full h-[200px] border-primary border-2 hover:-translate-y-2 duration-300 transition flex flex-col justify-between p-4 rounded-lg"
              key={council.council_id}
            >
              <div>
                <h2 className="text-white bg-primary w-full p-1 rounded-full text-center">
                  {council.council_name}
                </h2>
              </div>
              <div className="flex justify-between">
                <IconEdit
                  onClick={() => handleEditCouncil(council)}
                  className="cursor-pointer bg-primary h-[30px] w-[30px] p-1 rounded-full hover:bg-secondary transition duration-300"
                />
                <IconTrash
                  onClick={() => {
                    setSelectedCouncil(council);
                    handleDeleteCouncil();
                  }}
                  className="cursor-pointer bg-primary h-[30px] w-[30px] p-1 rounded-full hover:bg-secondary transition duration-300"
                />
              </div>
            </div>
          ))}
        </SimpleGrid>

        {/* Add Modal */}
        <Modal
          opened={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Add Council"
          classNames={classes}
        >
          <LoadingOverlay visible={visible2} zIndex={1000} />
          <form onSubmit={form.onSubmit(handleAddSubmit)}>
            <TextInput
              label="Council Name"
              {...form.getInputProps("council_name")}
            />
            {councilMembers.map((member, index) => (
              <Group key={index} mt="md">
                <TextInput label="Name" value={member.name} />
                <TextInput label="Position" value={member.position} />
                <ActionIcon onClick={() => handleRemoveMember(index)}>
                  <IconTrash />
                </ActionIcon>
              </Group>
            ))}
            <Button onClick={handleAddMember} mt="md">
              <IconPlus /> Add Member
            </Button>
            <Button type="submit" mt="md">
              Submit
            </Button>
          </form>
        </Modal>

        {/* Edit Modal */}
        <Modal
          opened={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          title="Edit Council"
          classNames={classes}
        >
          <LoadingOverlay visible={visible2} zIndex={1000} />
          <form onSubmit={form.onSubmit(handleEditSubmit)}>
            <TextInput
              label="Council Name"
              {...form.getInputProps("council_name")}
            />
            {councilMembers.map((member, index) => (
              <Group key={index} mt="md">
                <TextInput label="Name" value={member.name} />
                <TextInput label="Position" value={member.position} />
                <ActionIcon onClick={() => handleRemoveMember(index)}>
                  <IconTrash />
                </ActionIcon>
              </Group>
            ))}
            <Button onClick={handleAddMember} mt="md">
              <IconPlus /> Add Member
            </Button>
            <Button type="submit" mt="md">
              Submit
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
      </animated.div>
    </div>
  );
}
