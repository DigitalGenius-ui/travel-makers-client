import { Icon } from "@chakra-ui/react";
import React from "react";
import { RiStarSFill } from "react-icons/ri";

const Stars = ({ review }) => {
  const stars = generateStars(<Icon as={RiStarSFill} />, review);
  return (
    <div className="flex items-center gap-2">
      <span>{stars}</span>
      <p className="text-xs pt-[0.3rem]">{review} Reviews</p>
    </div>
  );
};

export default Stars;

const generateStars = (icon, length) => {
  const newLength = length === 0 ? 1 : length < 5 ? length : 5;
  return Array.from({ length: newLength })
    .fill(icon)
    .map((item, i) => (
      <span className="text-yellow-500 text-sm" key={i}>
        {item}
      </span>
    ));
};
