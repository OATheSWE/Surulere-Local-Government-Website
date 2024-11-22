import React from "react";
import { TextInput, Textarea, FileInput, Button } from "@mantine/core";
import { styles } from "../data";

const ContactForm: React.FC = () => {
  return (
    <div className={`bg-white flex flex-col items-center`}>
      {/* Header Text */}
      <div className="bg-[#81996521] w-full h-[150px] flex justify-center items-center rounded-es-full rounded-ee-full mb-10">
      <h2 className="text-primary text-center font-semibold text-lg max-w-[500px]">
        USE THE FORM BELOW TO DROP US AN E-MAIL, OLD FASHIONED PHONE CALLS WORK TOO >>> 08012345678
      </h2>
      </div>

      {/* Form Container */}
      <form className="w-full max-w-lg space-y-6 mb-5D">
        {/* Name Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            placeholder="First Name"
            radius="md"
            size="lg"
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
          <TextInput
            placeholder="Last Name"
            radius="md"
            size="lg"
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Contact Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            placeholder="E-mail"
            radius="md"
            size="lg"
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
          <TextInput
            placeholder="Phone Number"
            radius="md"
            size="lg"
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Message Input */}
        <Textarea
          placeholder="Write us a message"
          radius="md"
          size="lg"
          className="border-gray-300 focus:border-primary focus:ring-primary"
          autosize
          minRows={4}
        />

        {/* File Input */}
        <FileInput
          placeholder="Drag and drop photo here or"
          radius="md"
          size="lg"
          classNames={{
            input: "border-gray-300 focus:border-primary focus:ring-primary",
          }}
          // label={
          //   <Button variant="outline" color="green" radius="md" size="sm">
          //     Choose Photos
          //   </Button>
          // }
        />

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="outline"
            color="green"
            radius="md"
            size="lg"
            className="hover:bg-primary hover:text-white transition duration-300"
          >
            Send it
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
