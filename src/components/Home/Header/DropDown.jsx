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
import { useCurrentUser } from "../../../Context/UserContext";
import { logOutUser } from "../../../api-call/auth-api";
import { queryClient } from "../../../config/queryClient";
import { USER_KEY } from "../../../constants/react-query";

const DropDown = () => {
  const { currentUser } = useCurrentUser();
  const userImg = currentUser?.userImg;
  const fullName = `${currentUser?.firstName} ${currentUser?.firstName}`;

  const { mutateAsync } = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      queryClient.setQueryData([USER_KEY], null);
    },
  });

  const signOut = async () => {
    await mutateAsync();
    localStorage.clear();
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar src={userImg} mt={2} name={fullName} size="sm" zIndex={10} />
      </MenuButton>
      <MenuList color="black" fontSize="0.9rem">
        <>
          <Link href={`/admin/dashboard/${currentUser?.id}`}>
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <MenuDivider />
        </>
        {dropMenu.slice(0, 3).map((item) => (
          <Link key={item.title} to={`${item.path}/${currentUser?.id}`}>
            <MenuItem>{item.title}</MenuItem>
          </Link>
        ))}
        <MenuDivider />
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropDown;
