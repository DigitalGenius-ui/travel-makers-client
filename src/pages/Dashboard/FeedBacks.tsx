import { useEffect, useMemo, useState } from "react";
import useGetTours from "../../hooks/useGetTours";
import SearchInput from "../../utils/SearchInput";
import CustomeMenu from "../../utils/CustomeMenu";
import { CartLoading } from "../../utils/Loadings";
import type { tourReview } from "../../types/tours-type";
import useDebounce from "../../hooks/useDebounce";
import { Avatar, filter } from "@chakra-ui/react";
import Stars from "../../utils/stars";

type filterData = {
  reviews: tourReview[];
  cat: string;
};

const FeedBacks = () => {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("all packages");
  const [loading, setLoading] = useState(true);
  const { tourData, isPending } = useGetTours();

  const [filterData, setFilterData] = useState<filterData[]>([]);
  const debounce = useDebounce();

  const tourReviews = useMemo(() => {
    return (
      tourData
        ?.filter((tour) => tour.reviews.length > 0)
        .map((tour) => ({
          reviews: tour.reviews,
          cat: tour.category,
        })) ?? []
    );
  }, [tourData]);

  useEffect(() => {
    const handleFilter = () => {
      let data = tourReviews;
      if (select !== "all packages") {
        data = data.filter((item) => item.cat === select);
      }
      if (search.trim()) {
        data = data.filter((item) =>
          item.cat.toLowerCase().startsWith(search.toLowerCase())
        );
      }

      setFilterData(data);
      setLoading(false);
    };

    const debounceFilter = debounce(handleFilter, 1000);
    debounceFilter();
  }, [select, tourReviews, search, setFilterData, debounce]);

  const menus = [
    "all packages",
    ...new Set(tourData?.map((tour) => tour.category)),
  ];
  return (
    <section className="bg-gray-100 rounded-lg p-3 px-5">
      {/* header  */}
      <div className="flex items-center justify-between">
        <h1 className="flex-1 capitalize font-semibold">traveler feedback</h1>
        <div className="flex items-center gap-1">
          <div className="w-[18rem]">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Package..."
              bg="white"
            />
          </div>
          <CustomeMenu value={select} setValue={setSelect} menus={menus} />
        </div>
      </div>
      {/* review part  */}
      {(loading ?? isPending) ? (
        <div className="box my-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <CartLoading key={i} />
          ))}
        </div>
      ) : (
        <>
          {filterData?.length === 0 ? (
            <p className="h-[70vh] flex items-center justify-center capitalize">
              no reviews
            </p>
          ) : (
            <div className="box">
              {filterData.map((item) => (
                <ReviewCard key={item.cat} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FeedBacks;

const ReviewCard = ({ item }: { item: filterData }) => {
  const [showMore, setShowMore] = useState(100);
  const { reviews } = item;
  return (
    <>
      {reviews.map((item) => {
        const { firstName, lastName } = item?.user?.profile as {
          firstName: string;
          lastName: string;
        };
        const fullName = `${firstName} ${lastName}`;
        return (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2">
              <Avatar size={"sm"} src={item.user.userImg} name={"milad"} />
              <h2 className="capitalize font-semibold">{fullName}</h2>
            </div>
            <Stars review={Number(item.rating)} showText={false} />
            <p className="text-sm text-darkText">
              {item.text.length > showMore
                ? `${item.text.substring(0, showMore)}...`
                : item.text}
            </p>
          </div>
        );
      })}
    </>
  );
};
