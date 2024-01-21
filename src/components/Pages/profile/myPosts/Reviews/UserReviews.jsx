import React from "react";
import EmptyMessage from "../EmptyMessage";
import useCurrentUser from "../../../../../Hooks/useCurrentUser";
import Review from "./Review";

const UserReviews = () => {
  const { userDetails } = useCurrentUser();
  const reviews = userDetails?.reviews;

  return (
    <>
      {reviews?.length > 0 ? (
        reviews?.map((review) => <Review review={review} key={review.id} />)
      ) : (
        <EmptyMessage getUser={userDetails} text="comments" />
      )}
    </>
  );
};

export default UserReviews;
