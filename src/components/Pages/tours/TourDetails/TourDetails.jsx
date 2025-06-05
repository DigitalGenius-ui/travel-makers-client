import Screen from "../../../../utils/Screen";
import Head from "../../../../utils/Head";
import SliderDemo from "./ImageSlider/SliderDemo";
import { useParams } from "react-router-dom";
import Loading from "../../../../Loading";
import Details from "./TourDetails/Details";
import Ticket from "./Tickets/Ticket";
import Reviews from "./TourDetails/Reviews/Reviews";
import useGetTours from "../../../../Hooks/useGetTours";

// AIzaSyBSeW5Vop-j-38qM3wlUijLtZGGYJjKcgg

const TourDetails = () => {
  const { id } = useParams();

  const { tourData, isPending } = useGetTours();

  const singleTour = tourData && tourData.find((tour) => tour.id === id);

  if (isPending) <Loading />;

  return (
    <section className="bg-darkBlue w-full">
      <Head />
      <div className="roundedBg pb-[4rem]">
        <Screen>
          <div className="secondBg mt-[6rem] round overflow-hidden !px-0 !py-0">
            <SliderDemo tourImages={singleTour?.tourImages} />
            <Details tourDetails={singleTour} />
          </div>
          {/* child and adult tickets for bookings  */}
          <section id="ticket">
            <h2 className="pb-4 text-2xl font-bold">Attraction Tickets</h2>
            <div className="bg-white shadow-sm rounded-xl p-6 mt-3">
              <h3 className="text-md font-bold">{singleTour?.title} Ticket</h3>
              <p className="text-sm text-gray-400 my-3">600+ Booked</p>
              <Ticket
                title="adult"
                singleTour={singleTour}
                tourTitle={singleTour?.title}
              />
              <Ticket
                title="child"
                singleTour={singleTour}
                tourTitle={singleTour?.title}
              />
            </div>
          </section>
          {/* tour description  */}
          <div className="mt-[1rem] bg-white shadow-sm rounded-lg p-5">
            <h2 className="font-bold pb-2 text-lg">{singleTour?.title}</h2>
            <p className="">{singleTour?.description}</p>
          </div>
          {/* tour location in map  */}
          <div id="map" className="bg-white shadow-sm p-5 rounded-xl mt-[1rem]">
            <h2 className="pb-4 font-bold text-[1.2rem]">
              {singleTour?.title} Location
            </h2>
            <iframe
              src={singleTour?.iframe_map}
              loading="lazy"
              width="600"
              height="450"
              style={{ border: 0, width: "100%" }}
            ></iframe>
          </div>
          <Reviews
            data={{
              title: singleTour?.title,
              tourId: singleTour?.id,
              reviews: singleTour?.reviews,
            }}
          />
        </Screen>
      </div>
    </section>
  );
};

export default TourDetails;
