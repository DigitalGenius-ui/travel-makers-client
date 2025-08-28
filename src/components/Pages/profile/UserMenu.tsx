import { IconButton } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";

type userMenuProps = {
  setResponsiveMenu: Dispatch<SetStateAction<boolean>>;
  memberTitle: string;
};

const UserMenu = ({ setResponsiveMenu, memberTitle }: userMenuProps) => {
  return (
    <div className="shadow-sm bg-gray-100 p-3 flex items-center gap-4 justify-between">
      <div className="flex items-center gap-4">
        <FaUserAlt className="text-2xl text-blue-700" />
        <h3 className="capitalize">{memberTitle}</h3>
      </div>
      <IconButton
        onClick={() => setResponsiveMenu((prev) => !prev)}
        aria-label="open-menu"
        icon={<CgMenuLeft />}
        size="sm"
        fontSize="lg"
        display={{ base: "flex", md: "none" }}
      />
    </div>
  );
};

export default UserMenu;
