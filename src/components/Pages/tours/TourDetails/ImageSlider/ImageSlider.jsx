import { CloseButton, IconButton, Image } from "@chakra-ui/react";
import {
  MdClose,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { MdZoomInMap } from "react-icons/md";

import classNames from "classnames";
import SliderArrow from "../../../../../utils/SliderArros";
import CustomeModal from "../../../../../utils/CustomeModal";

const ImageSlider = ({ showModal, setShowModal, tourImages }) => {
  const [gallery, setGallery] = useState(0);
  const lowerGalleryRef = useRef(null);
  const [zoom, setZoom] = useState("");

  useEffect(() => {
    // Scroll the lower gallery to make the active image visible
    if (lowerGalleryRef.current) {
      const activeImage = lowerGalleryRef.current.children[gallery];
      if (activeImage) {
        activeImage.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [gallery]);

  return (
    <CustomeModal showModal={showModal}>
      <div className="gallery w-[95%] md:w-[90%] lg:w-[85%] h-screen bg-white mx-auto relative">
        <CloseButton
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3"
        />
        <div className="pt-[6rem] px-[2rem] w-full md:w-[40rem] mx-auto">
          <div className="relative group cursor-pointer">
            {tourImages.map((img, i) => (
              <Image
                onClick={() => setZoom(img)}
                w="100%"
                h={{ base: "300px", "2xl": "400px" }}
                objectFit="cover"
                key={i}
                src={img}
                display={gallery === i ? "block" : "none"}
                alt="gallery-image"
              />
            ))}
            <IconButton
              className="!hidden group-hover:!flex pointer-events-none"
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              aria-label="zoom icon"
              variant="outline"
              colorScheme="whiteAlpha"
              title="Zoom In"
              icon={<MdZoomInMap />}
            />
            <SliderArrow
              onClick={() => setGallery((prev) => (prev > 0 ? prev - 1 : 0))}
              icon={<MdKeyboardArrowLeft />}
              className={`!absolute !top-[45%] 
              !left-[-1rem] md:!left-[-3.5rem]
              ${classNames({
                "opacity-50 cursor-not-allowed": gallery === 0,
              })}`}
            />
            <SliderArrow
              onClick={() =>
                setGallery((prev) =>
                  prev < tourImages.length - 1
                    ? prev + 1
                    : tourImages.length - 1
                )
              }
              icon={<MdKeyboardArrowRight />}
              className={`!absolute !top-[45%] 
              !right-[-1rem] md:!right-[-3.5rem]
              ${classNames({
                "opacity-50 cursor-not-allowed":
                  gallery === tourImages.length - 1,
              })}
              `}
            />
          </div>
          {/* lower images  */}
          <div
            className="flex items-center gap-3 overflow-x-scroll mt-5"
            ref={lowerGalleryRef}
          >
            {tourImages.map((img, i) => (
              <Image
                onClick={() => setGallery(i)}
                w="7rem"
                h="7rem"
                objectFit="cover"
                className={`cursor-pointer ${classNames({
                  "opacity-40": gallery !== i,
                })}`}
                key={i}
                src={img}
                alt="gallery-image"
              />
            ))}
          </div>
        </div>
        {/* preview the images  */}
        {zoom !== "" && (
          <div className="flex items-center justify-center fixed inset-0 bg-black">
            <IconButton
              onClick={() => setZoom("")}
              pos="absolute"
              right={4}
              top={4}
              aria-label="close icon"
              icon={<MdClose />}
            />
            <Image maxW="100%" maxH="100%" src={zoom} alt="zoom-image" />
          </div>
        )}
      </div>
    </CustomeModal>
  );
};

export default ImageSlider;
