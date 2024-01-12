import { Icon } from "@chakra-ui/react";
import React from "react";
import { RiStarSFill } from "react-icons/ri";

const Stars = ({ review }) => {
  const stars = generateStars(<Icon as={RiStarSFill} />);
  return (
    <div className="flex items-center gap-2">
      <span>{stars}</span>
      <p className="text-xs">{review} Reviews</p>
    </div>
  );
};

export default Stars;

const generateStars = (icon) => {
  const starsGenerate = Array.from({ length: 5 })
    .fill(icon)
    .map((item, i) => (
      <span className="text-yellow-500 text-sm" key={i}>
        {item}
      </span>
    ));
  return starsGenerate;
};
