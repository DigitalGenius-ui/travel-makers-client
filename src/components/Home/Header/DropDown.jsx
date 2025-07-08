import {
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { dropMenu } from "../../../../HomeData.json";
import { useMutation } from "@tanstack/react-query";
import { useCurrentUser } from "../../../Context/UserContext";
import { logOutUser } from "../../../api-call/auth-api";
import { queryClient } from "../../../config/queryClient";
import { USER_KEY } from "../../../constants/react-query";
import useErrorToest from "../../../Hooks/useErrorToest";

const DropDown = () => {
  const { currentUser } = useCurrentUser();
  const toast = useToast();
  const userImg = currentUser?.userImg;
  const fullName = `${currentUser?.firstName} ${currentUser?.firstName}`;

  const { mutateAsync, isError, error } = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      queryClient.setQueryData([USER_KEY], null);
    },
  });

  const signOut = async () => {
    const data = await mutateAsync();
    if (data) {
      localStorage.clear();
      toast({
        title: "User is logged out",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useErrorToest({ isError, error });

  const isAdmin = currentUser?.role === "ADMIN";

  return (
    <Menu>
      <MenuButton>
        <Avatar src={userImg} mt={2} name={fullName} size="sm" zIndex={10} />
      </MenuButton>
      <MenuList color="black" fontSize="0.9rem">
        {isAdmin && (
          <Link to={`dashboard/${currentUser?.id}`}>
            <MenuItem>Dashboard</MenuItem>
          </Link>
        )}
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
