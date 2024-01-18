import { Button, HStack } from "@chakra-ui/react";
import React, { useState } from "react";

const btn = ["all", "latest", "with photos"];

const Filter = () => {
  const [active, setActive] = useState("all");
  return (
    <HStack spacing={2} className="mt-[2rem]">
      {btn.map((item, i) => (
        <Button
          onClick={() => setActive(item)}
          colorScheme={item === active ? "blue" : "gray"}
          textTransform="capitalize"
          size="sm"
          key={i}>
          {item}
        </Button>
      ))}
    </HStack>
  );
};

export default Filter;
