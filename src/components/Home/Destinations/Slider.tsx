import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Flex, IconButton, Icon } from "@chakra-ui/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useGetTours from "../../../Hooks/useGetTours";

const Slider = () => {
  const { tourData } = useGetTours();

  const categories = [...new Set(tourData?.map((cat) => cat.category))];

  // getting each tours length
  const tourLength: Record<string, number | undefined> = {};

  categories.forEach((cat) => {
    const tourNumber = tourData?.filter((item) => item.category === cat);
    tourLength[cat] = tourNumber?.length;
  });

  // displaying tours category and lentgh
  const newData = categories?.map((cat) => {
    const tourCat = tourData?.find((item) => item.category === cat);
    return {
      ...tourCat,
      tourLength,
    };
  });

  const navigate = useNavigate();

  const tourInfo = newData?.map((item, i) => {
    const cat = item.category;
    const filterCat =
      cat &&
      cat
        .split(" ")
        .filter((item) => item)
        .join("");

    return (
      <SwiperSlide
        onClick={() => navigate(`/tour/filtered/${filterCat}`)}
        key={i}
      >
        <div className="h-[15rem] 2xl:h-[20rem] overflow-hidden">
          <div
            className="w-full h-full object-cover bg-no-repeat bg-cover bg-center hover:scale-125 
          transition-all duration-500 cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url(${item.tourImages?.[0] ?? ""})`,
            }}
          />
          <div className="flex items-center justify-between absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-bold capitalize">{item.category}</h3>
            <p className="text-sm">
              {item.category ? item.tourLength[item.category] : 0} Tours
            </p>
          </div>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <>
      <Swiper
        freeMode={true}
        navigation={{
          prevEl: ".prevSlide",
          nextEl: ".nextSlide",
        }}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          540: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          500: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
        }}
        modules={[Navigation]}
      >
        {tourInfo}
      </Swiper>

      <Flex
        gap={3}
        justifyContent="flex-end"
        mr="1rem"
        mt="1rem"
        display={{ base: "flex", lg: "none" }}
      >
        {/* prev button  */}
        <IconButton
          className="prevSlide"
          size="sm"
          variant="outline"
          colorScheme="blue"
          aria-label="prev btn"
        >
          <Icon fontSize="1.5rem" as={MdKeyboardArrowLeft} />
        </IconButton>
        {/* next button  */}
        <IconButton
          className="nextSlide"
          size="sm"
          variant="outline"
          colorScheme="blue"
          aria-label="prev btn"
        >
          <Icon fontSize="1.5rem" as={MdKeyboardArrowRight} />
        </IconButton>
      </Flex>
    </>
  );
};

export default Slider;
