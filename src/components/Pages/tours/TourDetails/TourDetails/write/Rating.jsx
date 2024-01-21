import { Flex, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";

let emojis = ["☹️", "😑", "🙂", "😁", "😘"];

const Rating = ({ ratingCount, setRatingCount, formik, handleError }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoveredEmoji, setHoveredEmoji] = useState(null);

  const handleClick = (i) => {
    setRatingCount(i);
  };

  const hoverOver = (i) => {
    setHoverIndex(i);
    setHoveredEmoji(emojis[i]);
  };

  const hoverLeave = () => {
    if (ratingCount === hoverIndex) return;

    const newHoverIndex =
      ratingCount !== null && hoverIndex !== null ? ratingCount : null;

    setHoverIndex(newHoverIndex);
    setHoveredEmoji(emojis[ratingCount ?? 0]);
  };

  return (
    <Flex alignItems="center" gap={5} flexWrap="wrap" py="2rem">
      <h4>Add your rating*</h4>
      <HStack spacing={0}>
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => handleClick(i)}
            onMouseEnter={() => hoverOver(i)}
            onMouseLeave={hoverLeave}
            className={`cursor-pointer text-[1.3rem] w-[2rem] h-[2rem] grid place-items-center`}>
            {hoverIndex !== null && i <= hoverIndex ? (
              hoveredEmoji
            ) : (
              <BsEmojiSmile className="text-xl" />
            )}
          </button>
        ))}
      </HStack>
      {handleError("rating") && (
        <span className="text-red-500 text-xs capitalize">
          {formik.errors.rating}
        </span>
      )}
    </Flex>
  );
};

export default Rating;
