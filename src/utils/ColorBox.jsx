import clsx from "clsx";
import React from "react";

const ColorBox = ({ className }) => {
  return <p className={clsx(`size-2.5 bg-blue-400 rounded-sm`, className)} />;
};

export default ColorBox;
