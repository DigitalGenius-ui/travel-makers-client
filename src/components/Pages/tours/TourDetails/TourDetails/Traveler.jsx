import { Avatar, Button, Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import OutStanding from "../../../../../utils/OutStanding";

const Traveler = ({ reviews }) => {
  const profile = reviews[0]?.user?.profile;

  return (
    <div className="py-2 border-t border-gray-400">
      <div className="bg-blue-100 p-3 rounded-md">
        <Flex justifyContent="space-between">
          <h2 className="text-sm font-bold">What travelers say:</h2>
          <a href="#review">
            <Button fontSize="10px" size="xs" color="blue" variant="link">
              Show More Reviews
            </Button>
          </a>
        </Flex>
        <Link to={`/singleProfile/${profile?.userId}`}>
          <HStack spacing={1} my="5px" fontSize="xs" fontWeight="bold">
            <Avatar
              src={profile?.userImg || ""}
              size="xs"
              name={`${profile?.firstName} ${profile?.lastName}`}
            />
            <h2 className="font-bold text-xs">{`${profile?.firstName} ${profile?.lastName}`}</h2>
            <OutStanding
              size="0.9rem"
              fontSize="sm"
              rating={reviews[0]?.rating}
            />
          </HStack>
        </Link>
        <p className="text-sm text-gray-600">{reviews[0]?.text}</p>
      </div>
    </div>
  );
};

export default Traveler;
