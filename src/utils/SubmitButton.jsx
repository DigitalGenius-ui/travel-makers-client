import { Button } from "@chakra-ui/react";

export const SubmitButton = ({
  isPending,
  onClick,
  variant,
  children,
  type,
  color,
  ...rest
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
      px="1rem"
      {...rest}
    >
      {children}
    </Button>
  );
};
