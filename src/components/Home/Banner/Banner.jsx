import Screen from "../../../utils/Screen";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import React from "react";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import SocialButton from "../../../utils/SocialButtons";

const Banner = () => {
  return (
    <section
      id="banner"
      className="relative bg-banner bg-no-repeat bg-top bg-cover text-white">
      <Screen>
        <div className="h-screen md:h-[900px] lg:h-screen flex flex-col gap-3 justify-center">
          <h1 className="font-banner font-extrabold text-4xl md:text-5xl 2xl:text-7xl md:leading-[4rem] 2xl:leading-[5rem]">
            Find your dream <br /> Trip on Travel Makers
          </h1>
          <p className="font-banner text-xl 2xl:text-2xl">
            We offer unbeatable price & Excellent Services
          </p>
          <Flex alignItems="center" gap="4">
            <Button
              className="w-fit !text-white !p-[1.3rem]"
              colorScheme="whiteAlpha"
              variant="outline"
              size={{ base: "sm", "2xl": "lg" }}
              mt="1rem"
              zIndex={0}>
              VIEW OFFERS
            </Button>
            <Text mt="4" fontSize={{ base: "auto", "2xl": "xl" }}>
              <PhoneIcon />
              +66-825192688
            </Text>
          </Flex>
        </div>
        <Flex
          className="absolute bottom-[3rem] md:bottom-[5rem] right-[3rem] !text-xl"
          gap={{ base: "2", "2xl": "4" }}
          flexDirection="column">
          <SocialButton
            size={false}
            icon={<Icon as={FaFacebookF} />}
            path="#"
          />
          <SocialButton size={false} icon={<Icon as={FaXTwitter} />} path="#" />
          <SocialButton
            size={false}
            icon={<Icon as={FaInstagram} />}
            path="#"
          />
        </Flex>
      </Screen>
    </section>
  );
};

export default Banner;
