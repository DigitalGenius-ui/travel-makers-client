import useGetTours from "../../hooks/useGetTours";
import { useState, type CSSProperties } from "react";
import Pagination from "../../utils/Pagination";
import { CartLoading } from "../../utils/Loadings";
import SearchInput from "../../utils/SearchInput";
import CustomeMenu from "../../utils/CustomeMenu";
import { RxComponent2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import clsx from "clsx";
import { GalleryCard } from "../../components/Dashboard/Gallery/GalleryCard";

const cardsRows: { title: "grid" | "vertical"; icon: React.ReactNode }[] = [
  { title: "grid", icon: <RxComponent2 size={20} /> },
  { title: "vertical", icon: <IoIosMenu size={20} /> },
];

const styles: { vertical: CSSProperties; grid: CSSProperties } = {
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
  const [row, setRow] = useState<"grid" | "vertical">("grid");

  const [page, setPage] = useState(1);
  const limit = row === "grid" ? 8 : 4;

  const { tourData, isPending } = useGetTours(page, limit);

  const newTours = tourData?.allTours;

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
            <CustomeMenu menus={menus} value={sort} setValue={setSort} />
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
      {isPending ? (
        <div style={styles["grid"]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <CartLoading key={i} />
          ))}
        </div>
      ) : (
        <>
          {(newTours?.length ?? 0) > 0 ? (
            <>
              <article
                style={{ ...styles[row], transition: "all 0.5s ease-in-out" }}
              >
                {newTours?.map((tour) => (
                  <GalleryCard tour={tour} key={tour.id} row={row} />
                ))}
              </article>
              <Pagination
                totalPages={tourData?.totalPages}
                currentPage={page}
                setCurrentPage={setPage}
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
