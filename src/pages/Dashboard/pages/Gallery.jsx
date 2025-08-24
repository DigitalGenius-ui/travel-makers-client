import useGetTours from "../../../Hooks/useGetTours";
import { useState } from "react";
import Pagination from "../../../utils/Pagination";
import { CartLoading } from "../../../utils/Loadings";
import SearchInput from "../../../utils/SearchInput";
import CustomeMenu from "../../../utils/CustomeMenu";
import { RxComponent2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import clsx from "clsx";
import { GalleryCard } from "../../../components/Dashboard/Gallery/GalleryCard";

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
  const [search, setSearch] = useState("");
  const [row, setRow] = useState("grid");

  const [currentPage, setCurrentPage] = useState(1);
  const { tourData, isPending } = useGetTours();
  const itemsPerPage = row === "grid" ? 8 : 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(tourData?.length / itemsPerPage);

  const newTours = tourData?.slice(indexOfFirstItem, indexOfLastItem);

  function gallHeader() {
    const menus = ["A - Z", "Z - A"];
    return (
      <div className="my-[1rem] flex items-center justify-between">
        <div className="flex-1">
          <SearchInput
            value={search}
            setSearch={(e) => setSearch(e.target.value)}
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
      {isPending ? (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <CartLoading key={i} />
          ))}
        </>
      ) : (
        <>
          {gallHeader()}
          <article style={styles[row]}>
            {newTours.map((tour) => (
              <GalleryCard tour={tour} key={tour.id} row={row} />
            ))}
          </article>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </section>
  );
};

export default Gallery;
