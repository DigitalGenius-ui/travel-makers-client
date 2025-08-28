import React from "react";
import { Button, HStack } from "@chakra-ui/react";

type filterProps = {
  getData: any;
  setData: any;
};

const FilterBtn = ({ getData, setData }: filterProps) => {
  const filterBtn = ["12", "24"];
  const uniqueDuration = new Set(filterBtn);

  const filterData = (btn: string) => {
    const newData = getData.filter((item) => item.tourDuration === btn);
    setData(newData);
  };

  return (
    <HStack spacing={2} alignSelf={{ base: "flex-end", md: "flex-start" }}>
      {Array.from(uniqueDuration).map((btn, i) => {
        return (
          <Button
            onClick={() => filterData(btn)}
            key={i}
            textTransform="uppercase"
            variant="ghost"
            colorScheme="blue"
            fontSize={12}
            size={{ base: "sm", "2xl": "md" }}
          >
            {btn === "12" ? "half day trip" : "full day trip"}
          </Button>
        );
      })}
    </HStack>
  );
};

export default FilterBtn;
