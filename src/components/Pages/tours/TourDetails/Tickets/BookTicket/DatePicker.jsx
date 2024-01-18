import React from "react";
import startOfToday from "date-fns/startOfToday";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isToday,
} from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Flex } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import classNames from "classnames";
import { useBookingContext } from "../../../../../../Context/BookingContext";
import SliderArrow from "../../../../../../utils/SliderArros";

const DatePicker = () => {
  const { errorMsg } = useBookingContext();

  let today = startOfToday();

  const allDays = eachDayOfInterval({
    start: today,
    end: endOfWeek(endOfMonth(today)),
  });

  return (
    <section className="py-5 px-4 !w-full">
      <div className=" pb-5">
        <h3 className="text-xl font-bold">Select Date</h3>
        {errorMsg && <p className="text-red-600 ">{errorMsg}</p>}
      </div>
      <Swiper
        spaceBetween={5}
        freeMode={true}
        className="!py-[1rem]"
        breakpoints={{
          1550: {
            slidesPerView: 7,
          },
          1280: {
            slidesPerView: 5,
          },
          812: {
            slidesPerView: 4,
          },
          531: {
            slidesPerView: 3,
          },
          400: {
            slidesPerView: 2,
          },
          360: {
            slidesPerView: 1,
          },
        }}
        navigation={{
          prevEl: ".nextDate",
          nextEl: ".prevDate",
        }}
        modules={[Navigation]}>
        {allDays.map((day, i) => (
          <SwiperSlide key={i}>
            <SingleDate day={day} price={300} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Flex alignItems="center" justifyContent="flex-end" gap={2}>
        <SliderArrow
          icon={<MdKeyboardArrowLeft />}
          className="nextDate hidden md:flex"
          variant="outline"
        />
        <SliderArrow
          icon={<MdKeyboardArrowRight />}
          className="prevDate hidden md:flex"
          variant="outline"
        />
      </Flex>
    </section>
  );
};

export default DatePicker;

const SingleDate = ({ day, price }) => {
  const { setDate, date } = useBookingContext();
  const pickDate = format(day, "E, MMM dd");

  return (
    <div
      onClick={() => setDate(pickDate)}
      className={`border border-gray-600 w-full rounded-md px-2 md:px-3 py-4 cursor-pointer relative
      ${classNames({
        "border-blue-700 text-blue-800 bg-blue-100/40": date === pickDate,
      })}`}>
      {isToday(new Date(day)) && (
        <p className="absolute top-[-1rem] bg-blue-200 left-0 text-xs rounded-md px-3 py-1">
          Today
        </p>
      )}
      <h2 className="font-semibold text-sm">{pickDate}</h2>
      <p className="text-xs">${price}</p>
    </div>
  );
};
