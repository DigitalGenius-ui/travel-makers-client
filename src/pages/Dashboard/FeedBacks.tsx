import { useState } from "react";
import CustomeMenu from "../../utils/CustomeMenu";
import { CartLoading } from "../../utils/Loadings";
import { Avatar } from "@chakra-ui/react";
import Stars from "../../utils/stars";
import { dateEgoFormatter } from "../../utils/Date";
import Pagination from "../../utils/Pagination";
import { getUserReviews, type reviewWithUser } from "../../api-call/user-api";
import { REVIEW_KEYS } from "../../constants/react-query";
import { useQuery } from "@tanstack/react-query";

const FeedBacks = () => {
  const [select, setSelect] = useState("all");

  const limit = 8;
  const [page, setPage] = useState(1);

  const { data, isPending } = useQuery({
    queryKey: [REVIEW_KEYS, select, page],
    queryFn: () => getUserReviews(page, limit, undefined, select),
  });

  const reviews = data?.reviews || [];
  const totalPages = data?.totalPages || 1;

  const menus = ["all", "★", "★★", "★★★", "★★★★", "★★★★★"];

  return (
    <section className="bg-gray-100 rounded-lg p-3 px-5">
      {/* header  */}
      <div className="flex items-center justify-between">
        <h1 className="flex-1 capitalize font-semibold">traveler feedback</h1>
        <div className="flex items-center gap-1">
          <CustomeMenu value={select} setValue={setSelect} menus={menus} />
        </div>
      </div>
      {/* review part  */}
      {isPending ? (
        <div className="reviewBox my-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <CartLoading key={i} />
          ))}
        </div>
      ) : (
        <>
          {reviews.length === 0 ? (
            <p className="h-[70vh] flex items-center justify-center capitalize">
              no reviews
            </p>
          ) : (
            <>
              <div className="reviewBox my-5">
                {reviews?.map((item) => {
                  return <ReviewCard key={item.id} item={item} />;
                })}
              </div>
              {totalPages > 1 && (
                <div>
                  <Pagination
                    currentPage={page}
                    setCurrentPage={setPage}
                    totalPages={totalPages}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default FeedBacks;

type profileFullName = {
  firstName: string;
  lastName: string;
};

const ReviewCard = ({ item }: { item: reviewWithUser }) => {
  const [showMore, setShowMore] = useState(100);
  const { firstName, lastName } = item?.user?.profile as profileFullName;

  const fullName = `${firstName} ${lastName}`;
  const textLenght = item.text.length;
  return (
    <>
      <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <Avatar size={"sm"} src={item.user.userImg} name={"milad"} />
          <h2 className="capitalize font-semibold">{fullName}</h2>
        </div>
        <Stars review={Number(item.rating)} showText={false} />
        <div className="flex-1 flex flex-col justify-between gap-2">
          <p className="flex-1 text-sm text-darkText">
            {item.text.substring(0, showMore)}
            {textLenght > 100 && (
              <button
                onClick={() =>
                  setShowMore((prev) => (prev === 100 ? textLenght : 100))
                }
                className="hover:text-red-700 text-xs"
              >
                {showMore > 100 ? "...show less" : "...show more"}
              </button>
            )}
          </p>
          <p className="text-right text-xs text-darkText">
            {dateEgoFormatter(item?.updatedAt)}
          </p>
        </div>
      </div>
    </>
  );
};
