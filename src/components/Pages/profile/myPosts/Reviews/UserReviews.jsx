import React from "react";
import EmptyMessage from "../EmptyMessage";
import Review from "./Review";
import { useCurrentUser } from "../../../../../Context/UserContext";

const UserReviews = () => {
  const { currentUser } = useCurrentUser();
  const reviews = currentUser?.reviews;

  return (
    <>
      {reviews?.length > 0 ? (
        reviews?.map((review) => <Review review={review} key={review.id} />)
      ) : (
        <EmptyMessage getUser={currentUser} text="comments" />
      )}
    </>
  );
};

export default UserReviews;
