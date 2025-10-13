import { useState } from "react";
import EmptyMessage from "../EmptyMessage";
import { useCurrentUser } from "../../../../../context/UserContext";
import Pagination from "../../../../../utils/Pagination";
import Review from "../../../tours/TourDetails/TourDetails/Reviews/Review";
import { useQuery } from "@tanstack/react-query";
import { REVIEW_KEYS } from "../../../../../constants/react-query";
import { getUserReviews } from "../../../../../api-call/user-api";
import { ReviewLoading } from "../../../../../utils/Loadings";

const UserReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;
  const { currentUser } = useCurrentUser();

  const { data, isPending } = useQuery({
    queryKey: [REVIEW_KEYS, currentPage, limit],
    queryFn: async () =>
      await getUserReviews(currentPage, limit, currentUser?.id),
  });

  const reviews = data?.reviews || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      {isPending ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <ReviewLoading key={i} />
          ))}
        </>
      ) : reviews?.length > 0 ? (
        reviews?.map((review) => <Review review={review} key={review.id} />)
      ) : (
        <EmptyMessage getUser={currentUser} text="comments" />
      )}
      {totalPages > 1 && (
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
