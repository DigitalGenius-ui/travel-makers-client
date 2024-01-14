import {
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { dropMenu } from "../../../../HomeData.json";
import { useMutation } from "@tanstack/react-query";
import { logOutUser } from "../../../FetchData/User/Auth";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const DropDown = () => {
  const currentUser = useCurrentUser();

  const { mutateAsync } = useMutation({
    mutationKey: ["user"],
    mutationFn: logOutUser,
  });

  const signOut = async () => {
    try {
      await mutateAsync();
      localStorage.clear("user");
      // window.location.reload();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar mt={2} name="milad amiri" size="sm" zIndex={10} />
      </MenuButton>
      <MenuList color="black" fontSize="0.9rem">
        <>
          <Link href={`/admin/dashboard/${currentUser.id}`}>
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <MenuDivider />
        </>
        {dropMenu.map((item, i) => (
          <MenuItem key={i}>{item.title}</MenuItem>
        ))}
        <MenuDivider />
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropDown;
