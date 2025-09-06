import useGetTours from "../../Hooks/useGetTours";
import { useEffect, useState } from "react";
import Pagination from "../../utils/Pagination";
import { CartLoading } from "../../utils/Loadings";
import SearchInput from "../../utils/SearchInput";
import CustomeMenu from "../../utils/CustomeMenu";
import { RxComponent2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import clsx from "clsx";
import { GalleryCard } from "../../components/Dashboard/Gallery/GalleryCard";
import useDebounce from "../../Hooks/useDebounce";

const cardsRows = [
  { title: "grid", icon: <RxComponent2 size={20} /> },
  { title: "vertical", icon: <IoIosMenu size={20} /> },
];

const styles = {
  vertical: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem",
  },
};

const Gallery = () => {
  const [sort, setSort] = useState("A - Z");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [row, setRow] = useState("grid");

  const debounce = useDebounce();

  const [currentPage, setCurrentPage] = useState(1);
  const { tourData, isPending } = useGetTours();
  const itemsPerPage = row === "grid" ? 8 : 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(filterData?.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    const search = () => {
      let data = tourData;

      if (sort === "A - Z") {
        data = data?.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === "Z - A") {
        data = data?.sort((a, b) => b.title.localeCompare(a.title));
      }

      if (searchInput.trim()) {
        data = data.filter((item) =>
          item.title.toLowerCase().startsWith(searchInput.toLowerCase())
        );
        setCurrentPage(1);
      }

      setFilterData(data);
      setLoading(false);
    };

    const debounceSearch = debounce(search, 1000);
    debounceSearch();
  }, [searchInput, setFilterData, tourData, sort, setCurrentPage]);

  const newTours = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  function gallHeader() {
    const menus = ["A - Z", "Z - A"];
    return (
      <div className="my-[1rem] flex items-center justify-between">
        <div className="flex-1">
          <SearchInput
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            bg={"white"}
            placeholder="Search by location..."
          />
        </div>
        <div className="flex-[3] flex items-center justify-end gap-2">
          {/* sort  */}
          <div className="flex items-center gap-1">
            <p className="text-darkText">Sort by:</p>
            <CustomeMenu
              menus={menus}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            />
          </div>
          {/* verticla and horisoltel style  */}
          <div className=" bg-white rounded-md overflow-hidden shadow-lg">
            {cardsRows.map((r) => (
              <button
                onClick={() => setRow(r.title)}
                key={r.title}
                className={clsx(
                  "p-2 rounded-md",
                  r.title === row && "bg-btnBlue text-white"
                )}
              >
                {r.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mb-[2rem] space-y-5">
      {gallHeader()}
      {(loading ?? isPending) ? (
        <div style={styles["grid"]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <CartLoading key={i} />
          ))}
        </div>
      ) : (
        <>
          {filterData?.length > 0 ? (
            <>
              <article style={styles[row]}>
                {newTours?.map((tour) => (
                  <GalleryCard tour={tour} key={tour.id} row={row} />
                ))}
              </article>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <p>No record is found!</p>
          )}
        </>
      )}
    </section>
  );
};

export default Gallery;
