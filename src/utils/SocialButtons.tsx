import { Button } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const SocialButton = ({
  path,
  icon,
  size,
}: {
  path: string;
  icon: ReactNode;
  size: boolean;
}) => {
  return (
    <a href={path}>
      <Button
        size={{ base: size ? "sm" : "md", "2xl": size ? "md" : "lg" }}
        fontSize={{ "2xl": size ? "md" : "3xl" }}
        variant={size ? "solid" : "ghost"}
        colorScheme="whiteAlpha"
      >
        {icon}
      </Button>
    </a>
  );
};

export default SocialButton;
