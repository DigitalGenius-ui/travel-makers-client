import { ActionButton } from "../../../../utils/ActionButton";
import { useCurrentUser } from "../../../../Context/UserContext";
import type { ReactNode } from "react";

type boxesType = {
  item: {
    title: string;
    icon: ReactNode;
  };
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Boxes = ({ item, setShowModal }: boxesType) => {
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
      <p className="text-sm text-darkText capitalize">{title}</p>
      <ActionButton
        onClick={() => setShowModal(true)}
        color={isConnected ? "gray" : "blue"}
      >
        {isConnected ? "UnLink" : "Link"}
      </ActionButton>
    </div>
  );
};

export default Boxes;
