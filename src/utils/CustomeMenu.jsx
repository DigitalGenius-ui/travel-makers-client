import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const CustomeMenu = ({ value, children, variant }) => {
  return (
    <Menu>
      <MenuButton
        variant={variant ?? "outline"}
        color={!variant && "white"}
        bgColor={!variant && "blue.500"}
        size={"sm"}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {value}
      </MenuButton>
      <MenuList>{children}</MenuList>
    </Menu>
  );
};

export default CustomeMenu;
