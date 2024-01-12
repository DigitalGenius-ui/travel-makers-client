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

const DropDown = () => {
  const getUser = {
    id: 12,
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar mt={2} name="milad amiri" size="sm" zIndex={10} />
      </MenuButton>
      <MenuList color="black" fontSize="0.9rem">
        <>
          <Link href={`/admin/dashboard/${getUser.id}`}>
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <MenuDivider />
        </>
        {dropMenu.map((item, i) => (
          <MenuItem key={i}>{item.title}</MenuItem>
        ))}
        <MenuDivider />
        <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropDown;
