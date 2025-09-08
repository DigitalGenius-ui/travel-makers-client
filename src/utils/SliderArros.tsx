import { IconButton } from "@chakra-ui/react";
import { type ReactElement } from "react";

type slideProps = {
  icon: ReactElement;
  className: string;
  onClick?: () => void;
  variant?: string;
};

const SliderArrow = ({ icon, className, onClick, variant }: slideProps) => {
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
