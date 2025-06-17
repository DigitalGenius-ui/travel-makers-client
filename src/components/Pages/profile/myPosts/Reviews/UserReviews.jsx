import React, { useState } from "react";
import EmptyMessage from "../EmptyMessage";
import { useCurrentUser } from "../../../../../Context/UserContext";
import Pagination from "../../../../../utils/Pagination";
import Review from "../../../tours/TourDetails/TourDetails/Reviews/Review";
import { useQuery } from "@tanstack/react-query";
import { REVIEW_KEYS } from "../../../../../constants/react-query";
import { getUserReviews } from "../../../../../api-call/user-api";
import { ReviewLoading } from "../../../../../utils/Loadings";
import { useParams } from "react-router-dom";

const UserReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { currentUser } = useCurrentUser();

  const { data, isPending } = useQuery({
    queryKey: [REVIEW_KEYS, currentPage],
    queryFn: async () => getUserReviews(currentPage),
  });

  const reviews = data?.reviews || [];

  return (
    <>
      {isPending ? (
        <ReviewLoading />
      ) : reviews?.length > 0 ? (
        reviews?.map((review) => <Review review={review} key={review.id} />)
      ) : (
        <EmptyMessage getUser={currentUser} text="comments" />
      )}
      {data?.totalPages > 1 && (
        <Pagination
          totalPages={data?.totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default UserReviews;
