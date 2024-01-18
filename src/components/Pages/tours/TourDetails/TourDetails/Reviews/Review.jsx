import { Avatar, Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OutStanding from "../../../../../../utils/OutStanding";
import ImageSlider from "../../ImageSlider/ImageSlider";

const Review = ({ review }) => {
  const [showModal, setShowModal] = useState(false);
  const { rating, user, reviewImages, text, userId } = review;
  const { firstName, lastName, userImg } = user?.profile;

  return (
    <>
      <Flex
        gap={6}
        alignItems="flex-start"
        flexDirection={{ base: "column", sm: "row" }}>
        <Link
          to={`/singleProfile/${userId}`}
          className="flex items-center gap-3">
          <Avatar name={`${firstName} ${lastName}`} src={userImg || ""} />
          <h2 className="text-sm font-bold">{`${firstName} ${lastName}`}</h2>
        </Link>
        <div className="space-y-2">
          <OutStanding size="lg" fontSize="1.3rem" rating={rating} />
          <p>{text}</p>
          {reviewImages.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {reviewImages.slice(0, 6).map((img, i) => (
                <Image
                  onClick={() => setShowModal(true)}
                  key={i}
                  src={img}
                  w="6rem"
                  h="6rem"
                  objectFit="cover"
                  borderRadius="5px"
                  shadow="0px 0px 1px gray"
                  cursor="pointer"
                  alt="review-image"
                />
              ))}
            </div>
          )}
        </div>
        {showModal && (
          <ImageSlider
            showModal={showModal}
            setShowModal={setShowModal}
            tourImages={reviewImages}
          />
        )}
      </Flex>
    </>
  );
};

export default Review;
