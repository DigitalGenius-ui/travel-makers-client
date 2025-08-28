import { PhoneIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import Screen from "../../utils/Screen";

const Assistance = () => {
  return (
    <div
      id="assistance"
      className="bg-assistance bg-no-repeat bg-cover bg-center h-[450px] 2xl:h-[500px] mb-[2rem]
      flex flex-col justify-center"
    >
      <Screen>
        <div className="flex flex-col gap-6 text-white">
          <h2 className="text-4xl sm:text-5xl font-bold">Need Assistance</h2>
          <p className="text-sm sm:text-lg">
            Need help? Call us or drop a message.
            <br /> Our agents will be in touch shortly.
          </p>
          <Flex alignItems="center" gap="4">
            <Button
              className="w-fit !p-[1.3rem]"
              // colorScheme="whiteAlpha"
              variant="solid"
              size="sm"
              mt="1rem"
              zIndex={0}
            >
              VIEW OFFERS
            </Button>
            <Text mt="4">
              <PhoneIcon />
              +66-825192688
            </Text>
          </Flex>
        </div>
      </Screen>
    </div>
  );
};

export default Assistance;
