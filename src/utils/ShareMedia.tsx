import { IconButton } from "@chakra-ui/react";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";

const ShareMedia = () => {
  return (
    <div className="bg-white p-2 flex items-center gap-1 rounded-md">
      <IconButton
        size="sm"
        aria-label="share btn"
        colorScheme="facebook"
        icon={<FaFacebook className="text-xl" />}
      />
      <IconButton
        size="sm"
        colorScheme="blue"
        aria-label="share btn"
        icon={<FaSquareXTwitter className="text-xl" />}
      />
      <IconButton
        size="sm"
        colorScheme="pink"
        aria-label="share btn"
        icon={<IoIosLink className="text-xl" />}
      />
    </div>
  );
};

export default ShareMedia;
