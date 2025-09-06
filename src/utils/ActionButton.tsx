import { Button, type ButtonProps } from "@chakra-ui/react";
import { type ReactNode } from "react";

type actionsButton = ButtonProps & {
  onClick: () => void;
  children: ReactNode;
  isPending?: boolean;
  color?: string;
};

export const ActionButton = ({
  onClick,
  children,
  isPending,
  color,
  ...props
}: actionsButton) => {
  return (
    <Button
      isLoading={isPending}
      onClick={onClick}
      variant={props.variant || "solid"}
      colorScheme={color || "blue"}
      size={props.size ?? "sm"}
      fontSize="xs"
      px="1rem"
      {...props}
    >
      {children}
    </Button>
  );
};
