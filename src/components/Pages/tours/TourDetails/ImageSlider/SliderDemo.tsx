import { Activity, useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";

const SliderDemo = ({ tourImages }: { tourImages: string[] | undefined }) => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);

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
      className="w-full h-[350px] relative bg-no-repeat bg-cover bg-center"
    >
      <div className="w-full h-full backdrop-blur-md">
        <img
          className="w-[30rem] md:w-fit h-full mx-auto bg-no-repeat bg-cover bg-top object-fit"
          src={image as string}
          alt="tour-image"
        />
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="absolute bottom-1 right-1 bg-darkBlue capitalize text-white
        text-xs p-[0.3rem] hover:underline"
      >
        see all photos
      </button>
      <Activity mode={showModal ? "visible" : "hidden"}>
        <ImageSlider
          showModal={showModal}
          setShowModal={setShowModal}
          tourImages={tourImages}
        />
      </Activity>
      <div />
    </section>
  );
};

export default SliderDemo;
