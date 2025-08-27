import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

type titleProps = {
  title?: string;
  tag?: string;
  btnText?: string;
  link?: string;
};
const Title = ({ title, tag, btnText, link }: titleProps) => {
  return (
    <Flex
      gap={5}
      alignItems={{ base: "start", md: "center" }}
      mb="2rem"
      justifyContent="space-between"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box display="flex" alignItems="flex-end" gap={3}>
        <Heading as="h2" fontSize={{ base: "1.2rem", "2xl": "2rem" }}>
          {title}
        </Heading>
        <Text
          display={{ base: "none", md: "flex" }}
          fontSize={{ base: "0.7rem", "2xl": "1rem" }}
          color="blue.400"
          fontWeight="bold"
        >
          {tag}
        </Text>
      </Box>
      {btnText && link && (
        <Link to={link}>
          <Button
            alignSelf={{ base: "flex-end", md: "flex-start" }}
            colorScheme="blue"
            rightIcon={<Icon as={FaArrowRight} />}
            variant="outline"
            size={{ base: "sm", "2xl": "md" }}
          >
            {btnText}
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default Title;
