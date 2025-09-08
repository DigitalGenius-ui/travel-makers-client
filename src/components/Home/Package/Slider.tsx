import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Flex } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// import FilterBtn from "./FilterBtn";
import useGetTours from "../../../hooks/useGetTours";
import SliderArrow from "../../../utils/SliderArros";
import TourCard from "../RecommendedTours/TourCard";
import FilterBtn from "./FilterBtn";

const Slider = () => {
  const { tourData } = useGetTours();
  const [data, setData] = useState(tourData);

  useEffect(() => {
    if (tourData) {
      setData(tourData);
    }
  }, [tourData]);

  return (
    <>
      <div
        id="packages"
        className="flex justify-between flex-col sm:flex-row sm:items-center gap-3"
      >
        <h2 className="text-[1.2rem] 2xl:text-[2rem] font-bold">
          Latest Packages
        </h2>
        <FilterBtn getTourData={tourData} setData={setData} />
      </div>
      <div className="py-[2rem]">
        <Flex gap={3} justifyContent="center" alignItems="center">
          {/* prev button  */}
          <SliderArrow
            icon={<MdKeyboardArrowLeft />}
            className="prevSlide1 !hidden md:!flex"
          />
          <Swiper
            className="!pb-[2.5rem] !px-[0.6rem]"
            freeMode={true}
            navigation={{
              prevEl: ".prevSlide1",
              nextEl: ".nextSlide1",
            }}
            breakpoints={{
              1550: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1040: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              680: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              350: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
            }}
            modules={[Navigation]}
          >
            {data?.map((item, i) => (
              <SwiperSlide key={i} className="bg-white shadow-xl">
                <TourCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* next button  */}
          <SliderArrow
            icon={<MdKeyboardArrowRight />}
            className="nextSlide1 !hidden md:!flex"
          />
        </Flex>
      </div>
    </>
  );
};

export default Slider;
