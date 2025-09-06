import { Image, useToast } from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActionButton } from "../../../../utils/ActionButton";

const EmptyMessage = ({ text, getUser }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const handleClick = () => {
    if (!getUser?.profile || !getUser?.profile?.firstName) {
      toast({
        title: "Please add your profile details first.",
        status: "error",
        duration: 2000,
      });
    } else {
      navigate("/profile/posts/createPost");
    }
  };

  return (
    <section className="grid place-items-center h-fit pb-8">
      <Image
        className="w-full sm:w-auto sm:h-[15rem]"
        src="/mailBox.jpg"
        alt="mail-box"
      />
      <p className="text-black/70 text-sm pb-3">No {text} yet</p>
      {getUser && getUser?.id === userId && (
        <ActionButton onClick={handleClick}>Create New Post</ActionButton>
      )}
    </section>
  );
};

export default EmptyMessage;
