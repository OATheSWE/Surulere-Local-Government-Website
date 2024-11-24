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

export default function CouncilManagement() {
  const [councils, setCouncils] = useState([]);
  const [selectedCouncil, setSelectedCouncil] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [visible, setVisible] = useState(true); // For LoadingOverlay visibility
  const [visible2, setVisible2] = useState(false); // For LoadingOverlay visibility
  const [modalText, setModalText] = useState(""); // For success modal text
  const successModalRef = useRef(null);
  const confirmModalRef = useRef(null); // Confirm modal reference
  const [fileError, setFileError] = useState("");
  const [councilName, setCouncilName] = useState("");
  const [members, setMembers] = useState([]); // Holds array of member objects

  // Add a new empty member input set
  const handleAddMember = () => {
    setMembers([
      ...members,
      { name: "", position: "", image: null, linkedin: "" },
    ]);
  };

  // Update a specific member
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  // Remove a specific member input set
  const handleRemoveMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchCouncils();
  }, []);

  const fetchCouncils = async () => {
    try {
      const response = await axios.get(api.fetchAllCouncils, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.data.status === "success") {
        setCouncils(response.data.councils);
        toggleVisibility();
      }
    } catch (error) {
      console.error("Failed to fetch Councils:", error);
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

  const handleEditCouncil = (council) => {
    // Set the council name
    setCouncilName(council.council_name);

    // Populate members array with the council data
    setMembers(
      council.council_data.map((member) => ({
        name: member.name,
        position: member.position,
        linkedin: member.linkedin,
        image: member.image.name, // Process image if needed (e.g., convert URLs or blobs)
      }))
    );

    setSelectedCouncil(council);

    // Open the edit modal
    setEditModalOpen(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    toggleVisibility2();
    const formData = new FormData();
    formData.append("council_name", councilName);
    formData.append("council_data", JSON.stringify(members));

    try {
      const response = await axios.post(api.createCouncil, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toggleVisibility2();
      if (response.data.status) {
        handleOpenSuccessModal(response.data.message);
        setTimeout(() => {
          router.replace("/admin/councils"); // Use replace instead of push for navigation
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    toggleVisibility2();
    const formData = new FormData();
    formData.append("council_id", selectedCouncil.council_id);
    formData.append("council_name", councilName);
    formData.append("council_data", JSON.stringify(members));

    try {
      const response = await axios.post(api.updateCouncil, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toggleVisibility2();
      if (response.data.status === "success") {
        handleOpenSuccessModal(response.data.message);
        setTimeout(() => {
          router.replace("/admin/councils"); // Use replace instead of push for navigation
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

  const handleLogoChange = (file, index) => {
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
          handleMemberChange(index, "image", logoData);
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
            (dept) => dept.council_id !== selectedCouncil.council_id
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
        <h1 className="text-center font-bold">Councils</h1>
        <Button
          onClick={() => setAddModalOpen(true)}
          leftSection={<IconPlus />}
          className="bg-primary rounded-full border-primary border-2 hover:bg-transparent hover:text-black transition duration-300 mt-5"
        >
          Add Council
        </Button>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
          mt={`2rem`}
        >
          {councils.map((dept) => (
            <div
              key={dept.council_id}
              className={`max-w-[300px] w-full h-[200px] border-primary bg-gray-400 border-2 hover:-translate-y-2 duration-300 transition flex flex-col justify-between p-4 rounded-lg`}
              src={``}
            >
              <div>
                <h2 className="text-white bg-primary w-full p-1 rounded-full text-center">
                  {dept.council_name}
                </h2>
              </div>
              <div className="flex justify-between">
                <IconEdit
                  onClick={() => handleEditCouncil(dept)}
                  className="cursor-pointer bg-primary h-[30px] w-[30px] p-1 rounded-full hover:bg-secondary transition duration-300"
                />
                <IconTrash
                  onClick={() => {
                    setSelectedCouncil(dept);
                    handleDeleteCouncil();
                  }}
                  className="cursor-pointer bg-primary h-[30px] w-[30px] p-1 rounded-full hover:bg-secondary transition duration-300"
                />
              </div>
            </div>
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
        <form>
          <TextInput
            label="Council Name"
            placeholder="Enter council name"
            value={councilName}
            onChange={(e) => setCouncilName(e.target.value)}
            required
          />

          <Button
            onClick={handleAddMember}
            leftSection={<IconPlus />}
            variant="outline"
            mt="md"
          >
            Add Member
          </Button>

          {members.map((member, index) => (
            <div
              key={index}
              className="mt-8 border border-primary p-4 rounded-md"
            >
              <Group grow>
                <TextInput
                  label="Name"
                  value={member.name}
                  onChange={(e) =>
                    handleMemberChange(index, "name", e.target.value)
                  }
                  placeholder="Enter your name"
                />
                <TextInput
                  label="Position"
                  value={member.position}
                  onChange={(e) =>
                    handleMemberChange(index, "position", e.target.value)
                  }
                  placeholder="Enter position"
                />
              </Group>
              <Group grow mt="md">
                <FileInput
                  label="Upload Image"
                  accept="image/jpeg, image/png, image/jpg image/jfif"
                  required
                  onChange={(e) => handleLogoChange(e, index)} // Pass index along with the file
                  error={fileError}
                  // mb={`md`}
                />
                <TextInput
                  label="LinkedIn Profile"
                  value={member.linkedin}
                  onChange={(e) =>
                    handleMemberChange(index, "linkedin", e.target.value)
                  }
                  placeholder="Enter the URL"
                />
              </Group>
              <Button
                onClick={() => handleRemoveMember(index)}
                leftSection={<IconTrash />}
                fullWidth
                mt="md"
                className="bg-red-600 text-white transition duration-300 border-[1.5px] border-red-600 hover:bg-transparent hover:text-red-600"
              >
                Remove Member
              </Button>
            </div>
          ))}

          <Button
            type="submit"
            onClick={handleAddSubmit}
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

        <form>
          <TextInput
            label="Council Name"
            placeholder="Enter council name"
            value={councilName}
            onChange={(e) => setCouncilName(e.target.value)}
            required
          />

          <Button
            onClick={handleAddMember}
            leftSection={<IconPlus />}
            variant="outline"
            mt="md"
          >
            Add Member
          </Button>

          {members.map((member, index) => (
            <div
              key={index}
              className="mt-8 border border-primary p-4 rounded-md"
            >
              <Group grow>
                <TextInput
                  label="Name"
                  value={member.name}
                  onChange={(e) =>
                    handleMemberChange(index, "name", e.target.value)
                  }
                  placeholder="Enter your name"
                />
                <TextInput
                  label="Position"
                  value={member.position}
                  onChange={(e) =>
                    handleMemberChange(index, "position", e.target.value)
                  }
                  placeholder="Enter position"
                />
              </Group>
              <Group grow mt="md">
                <FileInput
                  label="Upload Image"
                  accept="image/jpeg, image/png, image/jpg image/jfif"
                  required
                  onChange={(e) => handleLogoChange(e, index)} // Pass index along with the file
                  error={fileError}
                  // mb={`md`}
                />
                <TextInput
                  label="LinkedIn Profile"
                  value={member.linkedin}
                  onChange={(e) =>
                    handleMemberChange(index, "linkedin", e.target.value)
                  }
                  placeholder="Enter the URL"
                />
              </Group>
              <Button
                onClick={() => handleRemoveMember(index)}
                leftSection={<IconTrash />}
                fullWidth
                mt="md"
                className="bg-red-600 text-white transition duration-300 border-[1.5px] border-red-600 hover:bg-transparent hover:text-red-600"
              >
                Remove Member
              </Button>
            </div>
          ))}

          <Button
            type="submit"
            onClick={handleEditSubmit}
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
