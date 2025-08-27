import { Badge, HStack, Text } from "@chakra-ui/react";
import React from "react";

const ratingText: Record<number, string> = {
  1: "Poor",
  2: "Normal",
  3: "Good",
  4: "Excellent",
  5: "OutStanding",
};

type outStandingProps = {
  fontSize: number;
  size: number;
  rating: number;
};

const OutStanding = ({ fontSize, size, rating }: outStandingProps) => {
  return (
    <HStack spacing={1}>
      <Badge fontSize={size} borderRadius="md" colorScheme="blue">
        <span>{Number(rating).toFixed()}/</span>
        <span>5</span>
      </Badge>
      <Text fontSize={fontSize} fontWeight="bold" color="#04246b">
        {ratingText[rating]}
      </Text>
    </HStack>
  );
};

export default OutStanding;
