import { Icon } from "@chakra-ui/react";
import clsx from "clsx";
import { type ReactNode } from "react";
import { RiStarSFill } from "react-icons/ri";

const Stars = ({
  review,
  showText = true,
}: {
  review: number | undefined;
  showText?: boolean;
}) => {
  const stars = generateStars(<Icon as={RiStarSFill} />, review);
  return (
    <div className="flex items-center gap-2">
      <span>{stars}</span>
      <p className="text-xs pt-[0.3rem]">
        {review} <span className={clsx(!showText && "hidden")}>Reviews</span>
      </p>
    </div>
  );
};

export default Stars;

const generateStars = (icon: ReactNode, length: number | undefined) => {
  if (!length) return;
  const newLength = length === 0 ? 1 : length < 5 ? length : 5;
  return Array.from({ length: newLength })
    .fill(icon)
    .map((item, i) => (
      <span className="text-yellow-500 text-sm" key={i}>
        {item as ReactNode}
      </span>
    ));
};
