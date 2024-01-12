import { IconButton } from "@chakra-ui/react";

const SliderArrow = ({ icon, className, onClick, variant }) => {
  return (
    <IconButton
      onClick={onClick}
      className={`${className}`}
      size="sm"
      fontSize="lg"
      variant={variant || "solid"}
      colorScheme="blue"
      aria-label="arrow btn"
      icon={icon}
    />
  );
};

export default SliderArrow;
