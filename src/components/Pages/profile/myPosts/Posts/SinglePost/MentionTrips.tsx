import { HStack, Image } from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";
import useGetTours from "../../../../../../hooks/useGetTours";
import { Link } from "react-router-dom";
import { ActionButton } from "../../../../../../utils/ActionButton";

const MentionedTrips = ({ location }: { location: string }) => {
  const { tourData } = useGetTours();
  const trip = tourData?.allTours?.find((item) => item?.title === location);

  return (
    <section className="mt-4">
      <h2 className="pb-4 font-bold">Trips mentioned in this post:</h2>
      <div className="flex items-center gap-5 border border-black/40 rounded-xl overflow-hidden">
        <Image
          className="w-[8rem] sm:w-[15rem] md:w-[8rem] h-[10rem] object-cover"
          src={trip?.tourImages[0]}
          alt="tour-images"
        />
        <div className="space-y-2">
          <h2 className="font-bold text-sm line-clamp-2">{trip?.title}</h2>
          <p className="line-clamp-2 text-xs">{trip?.description}</p>
          <HStack className="text-gray-500 text-xs">
            <IoLocationOutline />
            <span>
              {trip?.country} / {trip?.city}
            </span>
          </HStack>
          <Link className="inline-block" to={`/tour/${trip?.id}`}>
            <ActionButton onClick={() => console.log("click")}>
              Review Tour
            </ActionButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MentionedTrips;
