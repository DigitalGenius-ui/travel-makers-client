import { Button } from "@chakra-ui/react";

export const ActionButton = ({
  isPending,
  onClick,
  variant,
  children,
  type,
  color,
  size = "sm",
  ...rest
}) => {
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
