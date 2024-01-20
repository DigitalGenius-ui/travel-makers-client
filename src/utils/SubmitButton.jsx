import { Button } from "@chakra-ui/react";

export const SubmitButton = ({
  isPending,
  onClick,
  variant,
  children,
  type,
  color,
}) => {
  return (
    <Button
      isLoading={isPending}
      onClick={onClick}
      variant={variant || "solid"}
      type={type}
      colorScheme={color || "blue"}
      size="sm"
      fontSize="xs"
      px="1rem">
      {children}
    </Button>
  );
};
