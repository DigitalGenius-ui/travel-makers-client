import {
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { dropMenu } from "../../../../HomeData.json";
import { useMutation } from "@tanstack/react-query";
import { useCurrentUser } from "../../../context/UserContext";
import { logOutUser } from "../../../api-call/auth-api";
import { queryClient } from "../../../config/queryClient";
import { USER_KEY } from "../../../constants/react-query";
import useErrorToest from "../../../hooks/useErrorToest";
import { genderImg } from "../../../constants/assets";

const DropDown = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname.split("/").slice(0, -1).join("/");
  const { currentUser } = useCurrentUser();
  const toast = useToast();
  const userImg = currentUser?.userImg;
  const profile = currentUser?.profile;
  const fullName = `${profile?.firstName} ${profile?.firstName}`;

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
    navigate("/");
  };

  useErrorToest({ isError, error });

  const isAdmin = currentUser?.role === "ADMIN";
  const userGender = profile?.gender as "male" | "female";

  const profileImg = !userImg ? genderImg[userGender] : userImg;

  return (
    <Menu>
      <MenuButton>
        <Avatar src={profileImg} mt={2} name={fullName} size="sm" zIndex={10} />
      </MenuButton>
      <MenuList color="black" fontSize="0.9rem">
        {isAdmin && (
          <Link to={`/dashboard/${currentUser?.id}`}>
            <MenuItem
              _hover={{ bg: "blue.50" }}
              bg={pathName === "/dashboard" ? "blue.100" : ""}
            >
              Dashboard
            </MenuItem>
          </Link>
        )}
        {dropMenu.slice(0, 3).map((item) => (
          <Link key={item.title} to={`${item.path}/${currentUser?.id}`}>
            <MenuItem
              bg={pathName === item.path ? "blue.100" : ""}
              _hover={{ bg: "blue.50" }}
            >
              {item.title}
            </MenuItem>
          </Link>
        ))}
        <MenuDivider />
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropDown;
