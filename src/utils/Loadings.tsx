import clsx from "clsx";

export const ReviewLoading = () => {
  return (
    <div className="flex gap-4">
      <p className="size-[4rem] rounded-full bg-gray-300 animate-pulse" />
      <div className="space-y-1 w-full">
        <p className="w-[7rem] h-[1rem] rounded-full bg-gray-300 animate-pulse" />
        <p className="w-[7rem] h-[1rem] rounded-full bg-gray-300 animate-pulse" />
        <p className="w-full h-[4rem] rounded-md bg-gray-300 animate-pulse" />
      </div>
    </div>
  );
};

export const CartLoading = () => {
  return (
    <div className="space-y-3 overflow-hidden">
      <div className="w-full h-[13rem] lg:max-w-[22rem] bg-gray-200 animate-pulse rounded-md" />
      <div className="w-[8rem] h-[1rem] lg:max-w-[22rem] bg-gray-200 animate-pulse rounded-sm" />
      <div className="w-full h-full lg:max-w-[22rem] bg-gray-200 animate-pulse rounded-sm" />
    </div>
  );
};

export const BookingLoading = () => {
  return (
    <div className="flex flex-col h-[10rem] tablet:h-auto gap-2 tablet:flex-row">
      <div className="w-full tablet:w-[6rem] h-[8rem] tablet:h-[5rem] bg-gray-300 animate-pulse rounded-sm" />
      <div className="space-y-2 overflow-hidden w-full">
        <div className="w-full tablet:w-[6rem] h-[1rem] bg-gray-300 animate-pulse rounded-sm" />
        <div className="w-full h-[3rem] tablet:h-full  bg-gray-300 animate-pulse rounded-sm" />
      </div>
    </div>
  );
};

export const VerticaleCardLoading = () => {
  return (
    <div className="flex gap-2 mt-3">
      <div>
        <div className="size-10 rounded-full bg-gray-300 animate-pulse" />
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <div className="w-full h-5 bg-gray-300 animate-pulse" />
        <div className="w-full h-8 bg-gray-300 animate-pulse" />
      </div>
    </div>
  );
};

export const InsightLoading = ({ isBooking }: { isBooking?: boolean }) => {
  return (
    <p
      className={clsx(
        "w-full h-40 bg-gray-200 animate-pulse",
        !isBooking && "h-20 rounded-lg"
      )}
    />
  );
};
