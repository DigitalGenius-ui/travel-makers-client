import React, { useState } from "react";
import EmptyMessage from "../EmptyMessage";
import { useCurrentUser } from "../../../../../Context/UserContext";
import Pagination from "../../../../../utils/Pagination";
import Review from "../../../tours/TourDetails/TourDetails/Reviews/Review";

const UserReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { currentUser } = useCurrentUser();
  const reviews = currentUser?.reviews;

  // pagination
  const itemsPerPage = 6;
  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;

  const totalPages = Math.ceil(reviews?.length / itemsPerPage);

  const newReview = reviews?.slice(firstPageIndex, lastPageIndex);

  return (
    <>
      {reviews?.length > 0 ? (
        newReview?.map((review) => <Review review={review} key={review.id} />)
      ) : (
        <EmptyMessage getUser={currentUser} text="comments" />
      )}
      {reviews.length > itemsPerPage && (
        <Pagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default UserReviews;
