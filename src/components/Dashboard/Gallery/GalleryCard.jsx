import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import ImageSlider from "../../Pages/tours/TourDetails/ImageSlider/ImageSlider";
import { useState } from "react";
import clsx from "clsx";

export const GalleryCard = ({ tour, row }) => {
  const [showModal, setShowModal] = useState("");
  const { title, address, tourImages, description } = tour;
  const newAddress = address.split(",")[0];

  const vertical = row === "vertical";
  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className={clsx(
          `w-full h-full rounded-lg overflow-hidden bg-white 
        shadow-xl cursor-pointer hover:opacity-75`,
          vertical && "flex items-stretch"
        )}
      >
        <div
          style={{
            width: vertical ? "20%" : "100%",
            height: "10rem",
            backgroundImage: `url(${tourImages[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="flex flex-col justify-between p-3 flex-1">
          <div className="flex items-center justify-between">
            <div className="w-full flex-1 space-y-1">
              <h1 className="font-semibold">{title}</h1>
              <p className="flex items-center gap-2 text-sm text-darkText">
                <span>
                  <GrMapLocation />
                </span>
                {newAddress}
              </p>
            </div>
            <button>
              <BiDotsVerticalRounded />
            </button>
          </div>
          {vertical && <p className="justify-self-end">{description}</p>}
        </div>
      </div>
      {showModal && (
        <ImageSlider
          showModal={showModal}
          setShowModal={setShowModal}
          tourImages={tourImages}
        />
      )}
    </>
  );
};
