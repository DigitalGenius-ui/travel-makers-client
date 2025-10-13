import clsx from "clsx";
import type { CSSProperties } from "react";

const ColorBox = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <p
      style={style}
      className={clsx(`size-[10px] bg-blue-200 rounded-sm`, className)}
    />
  );
};

export default ColorBox;
