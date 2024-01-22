import React, { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import Loading from "../../../../../Loading";

const SliderDemo = ({ tourImages }) => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (tourImages && tourImages.length > 0) {
      setImage(tourImages[0]);
    }
  }, [tourImages]);

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(${image})`,
      }}
      className="w-full h-[350px] relative bg-no-repeat bg-cover bg-center">
      <div className="w-full h-full backdrop-blur-md">
        <img
          className="w-[30rem] md:w-fit h-full mx-auto bg-no-repeat bg-cover bg-top object-fit"
          src={image}
          alt="tour-image"
        />
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="absolute bottom-1 right-1 bg-darkBlue capitalize text-white
        text-xs p-[0.3rem] hover:underline">
        see all photos
      </button>
      {showModal && (
        <ImageSlider
          showModal={showModal}
          setShowModal={setShowModal}
          tourImages={tourImages}
        />
      )}
      <div />
    </section>
  );
};

export default SliderDemo;
