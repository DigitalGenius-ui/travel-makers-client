import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { FaUserFriends } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Stars from "../../../utils/stars";
import { type tourType } from "../../../api-call/tour-api";

const TourCard = ({ item }: { item: tourType }) => {
  const isNewTour =
    new Date(item.createAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <Link
      to={`/tour/${item.id}`}
      className="shadow-xl hover:opacity-80 cursor-pointer !bg-white"
    >
      {/* card image   */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)),url(${
            item.tourImages && item.tourImages[0]
          })`,
        }}
        className="relative h-[17rem] md:h-[13rem] 2xl:h-[16rem] bg-cover bg-no-repeat bg-center"
      >
        <div className="absolute top-3 left-3 text-white">
          <Stars review={item?.reviews?.length} />
        </div>
        {isNewTour && (
          <span
            className="bg-gradient rounded-full px-[1rem] py-[0.3rem] text-white text-xs
            uppercase absolute -bottom-3 left-4"
          >
            New Tour
          </span>
        )}
      </div>
      {/* card contents  */}
      <div className="px-[1rem] py-[1.5rem]">
        <h2 className="font-bold text-lg pb-2 line-clamp-1">{item.title}</h2>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          color="gray.600"
        >
          <Flex
            flexDirection="column"
            textTransform="capitalize"
            gap={1}
            fontWeight="bold"
          >
            <HStack spacing={2}>
              <Icon as={FaUserFriends} fontSize={16} color="blue.600" />
              <span className="text-xs">{item.category}</span>
            </HStack>
            <HStack spacing={2}>
              <Icon as={GrMapLocation} fontSize={14} color="blue.600" />
              <span className="text-xs">{item.country}</span>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaRegClock} fontSize={14} color="blue.600" />
              <span className="text-xs uppercase">
                {item.tourDuration} hours
              </span>
            </HStack>
          </Flex>
          <Box
            textAlign="center"
            borderLeft="1px solid gray"
            px="1rem"
            pt="0.5rem"
          >
            <Text textTransform="uppercase" fontSize="0.8rem" fontWeight="bold">
              start package
            </Text>
            <Text color="blue.600" fontWeight="bold">
              ${Number(item.price).toFixed(2)}
            </Text>
          </Box>
        </Flex>
      </div>
    </Link>
  );
};

export default TourCard;
