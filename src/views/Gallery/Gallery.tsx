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

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [modalText, setModalText] = useState("");
  const successModalRef = useRef(null);
  const confirmModalRef = useRef(null);
  const [fileError, setFileError] = useState("");

  const form = useForm({
    initialValues: {
      image: null,
    },
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(api.fetchAllGallery, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.data.status === "success") {
        setGallery(response.data.gallery);
        toggleVisibility();
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
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

  const handleAddGallery = () => {
    form.reset();
    setAddModalOpen(true);
  };

  const handleEditGallery = (Gallery) => {
    form.setValues({
      image: Gallery.gallery_data,
    });
    setSelectedGallery(Gallery);
    setEditModalOpen(true);
  };

  const handleAddSubmit = async (values) => {
    toggleVisibility2();
    const GalleryPayload = {
      image_data: JSON.stringify(values.image),
    };

    try {
      const response = await axios.post(api.createGallery, GalleryPayload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toggleVisibility2();
      if (response.data.status === "success") {
        handleOpenSuccessModal(response.data.message);
        setTimeout(() => {
          router.replace("/admin/gallery");
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
    const GalleryPayload = {
      gallery_id: selectedGallery.gallery_id,
      image_data: JSON.stringify(values.image),
    };

    try {
      const response = await axios.post(api.updateGallery, GalleryPayload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toggleVisibility2();
      if (response.data.status === "success") {
        handleOpenSuccessModal(response.data.message);
        setTimeout(() => {
          router.replace("/admin/gallery");
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

  const handleDeleteGallery = () => {
    if (confirmModalRef.current) {
      confirmModalRef.current.openModal();
    }
  };

  const handleConfirmDelete = async () => {
    toggleVisibility2();
    try {
      const response = await axios.post(
        api.deleteGallery,
        { gallery_id: selectedGallery.gallery_id },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      toggleVisibility2();
      if (response.data.status === "success") {
        handleOpenSuccessModal(response.data.message);
        setGallery(
          gallery.filter(
            (Gallery) => Gallery.gallery_id !== selectedGallery.gallery_id
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

  const handleLogoChange = (file) => {
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
        <h1 className="text-center font-bold">Gallery</h1>
        <Button
          onClick={handleAddGallery}
          leftSection={<IconPlus />}
          className="bg-primary rounded-full border-primary border-2 hover:bg-transparent hover:text-black transition duration-300 mt-5"
        >
          Add Gallery
        </Button>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
          mt={`2rem`}
        >
          {gallery.map((Gallery) => (
            <BackgroundImage
              key={Gallery.gallery_id}
              className={`max-w-[300px] w-full h-[200px] border-primary border-2 hover:-translate-y-2 duration-300 transition flex flex-col justify-between p-4 rounded-lg`}
              src={`http://localhost:8000/${encodeURIComponent(
                Gallery.gallery_data.file_path
              )}`}
            >
              <div className="flex justify-between">
                <IconEdit
                  onClick={() => handleEditGallery(Gallery)}
                  className="cursor-pointer bg-primary h-[30px] w-[30px] p-1 rounded-full hover:bg-secondary transition duration-300"
                />
                <IconTrash
                  onClick={() => {
                    setSelectedGallery(Gallery);
                    handleDeleteGallery();
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
        title="Add Gallery"
        classNames={classes}
      >
        <LoadingOverlay
          visible={visible2}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
          loaderProps={{ color: "#98CD5B", type: "bars" }}
        />
        <form onSubmit={form.onSubmit(handleAddSubmit)}>
          <FileInput
            label="Select Gallery"
            onChange={handleLogoChange}
            error={fileError}
            placeholder="Upload Image"
            required
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
        title="Edit Gallery"
        classNames={classes}
      >
        <LoadingOverlay
          visible={visible2}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
          loaderProps={{ color: "#98CD5B", type: "bars" }}
        />
        <form onSubmit={form.onSubmit(handleEditSubmit)}>
          <FileInput
            label="Select Gallery"
            onChange={handleLogoChange}
            error={fileError}
            placeholder="Upload Image"
            required
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

      <ConfirmModal
        ref={confirmModalRef}
        onConfirm={handleConfirmDelete}
        text="Are you sure you want to delete this department?"
      />
      <SuccessModal ref={successModalRef} text={modalText} />
    </div>
  );
}