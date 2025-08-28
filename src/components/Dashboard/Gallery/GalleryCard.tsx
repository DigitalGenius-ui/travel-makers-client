import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import ImageSlider from "../../Pages/tours/TourDetails/ImageSlider/ImageSlider";
import { ReactElement, useState } from "react";
import clsx from "clsx";
import { IoMdTime } from "react-icons/io";
import { GiWorld } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";

type galleryProps = {
  tour: any;
  row: string;
};
export const GalleryCard = ({ tour, row }: galleryProps) => {
  const [showModal, setShowModal] = useState(false);
  const {
    title,
    address,
    tourImages,
    description,
    tourDuration,
    country,
    price,
  } = tour;

  const tourDetails = {
    duration: `${tourDuration} hours`,
    country: country,
    price: `${price}$`,
  };

  const detailsIcon: Record<string, ReactElement> = {
    duration: <IoMdTime />,
    country: <GiWorld />,
    price: <MdAttachMoney />,
  };

  const vertical = row === "vertical";
  const newAddress = !vertical ? address.split(",")[0] : address;
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
          {vertical && (
            <div className="space-y-2 mt-1">
              <p className="justify-self-end">{description}</p>
              <div className="flex items-center gap-4">
                {Object.entries(tourDetails).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center gap-[2px] text-darkText text-xs capitalize"
                  >
                    <span className={clsx(key === "price" && "text-green-800")}>
                      {detailsIcon[key]}
                    </span>
                    <span>{`${key} : ${value}`}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
