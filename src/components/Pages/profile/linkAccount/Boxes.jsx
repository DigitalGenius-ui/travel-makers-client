import React from "react";
import { SubmitButton } from "../../../../utils/SubmitButton";
import { useCurrentUser } from "../../../../Context/UserContext";

const Boxes = ({ item, setShowModal }) => {
  const { icon, title } = item;
  const { currentUser } = useCurrentUser();
  const getSocial = currentUser?.profile;

  const isConnected = getSocial && getSocial[title];

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 border border-gray-300
    hover:bg-gray-100 py-4"
    >
      <span className="text-4xl">{icon}</span>
      <p className="text-sm text-gray-600 capitalize">{title}</p>
      <SubmitButton
        onClick={() => setShowModal(true)}
        color={isConnected ? "gray" : "blue"}
      >
        {isConnected ? "UnLink" : "Link"}
      </SubmitButton>
    </div>
  );
};

export default Boxes;
