import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { GrMapLocation } from "react-icons/gr";
import { LuMousePointerClick } from "react-icons/lu";
import { AiOutlineAccountBook } from "react-icons/ai";
import Screen from "../../../utils/Screen";

const HowWorks = () => {
  return (
    <Screen>
      <Flex
        mb="4rem"
        gap={{ base: "3rem", lg: "0.5rem" }}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Box mr={{ base: "auto", lg: "3rem" }}>
          <Heading as="h2" fontSize="2rem">
            How it works ?
          </Heading>
          <Text color="blue.300" fontWeight="bold">
            Search-Select-Book
          </Text>
        </Box>
        <Box
          flex={1}
          display="flex"
          alignItems={{ base: "start", md: "center" }}
          gap={2}
          justifyContent="space-between"
          flexDirection={{ base: "column", md: "row" }}
        >
          <IconBox
            icon={<GrMapLocation />}
            title="search"
            tag="Find your dream trip"
          />
          <IconBox
            icon={<LuMousePointerClick />}
            title="Select"
            tag="Select Trip package"
          />
          <IconBox
            icon={<AiOutlineAccountBook />}
            title="book"
            tag="Booking and pay"
          />
        </Box>
      </Flex>
    </Screen>
  );
};

export default HowWorks;

const IconBox = ({ icon, title, tag }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-[4rem] h-[4rem] rounded-full grid place-items-center bg-gradient
      text-white text-2xl"
      >
        {icon}
      </div>
      <div>
        <h2 className="text-lg uppercase font-bold">{title}</h2>
        <p className="text-xs text-blue-400 font-bold">{tag}</p>
      </div>
    </div>
  );
};
