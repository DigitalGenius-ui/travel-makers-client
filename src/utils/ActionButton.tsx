import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

type actionsButton = {
  isPending: boolean;
  onClick: () => void;
  variant: string;
  children: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  color: string;
  size: string;
  rest: any;
};

export const ActionButton = ({
  isPending,
  onClick,
  variant,
  children,
  type,
  color,
  size = "sm",
  ...rest
}: actionsButton) => {
  return (
    <Button
      isLoading={isPending}
      onClick={onClick}
      variant={variant || "solid"}
      type={type}
      colorScheme={color || "blue"}
      size={size}
      fontSize="xs"
      px="1rem"
      {...rest}
    >
      {children}
    </Button>
  );
};
