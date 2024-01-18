import React from "react";

const PageBanner = ({ title }) => {
  return (
    <div
      className="bg-pageBanner h-[400px] bg-no-repeat bg-cover bg-center
        grid place-items-center">
      <h2 className="text-4xl sm:text-5xl text-white font-page tracking-[0.1rem] capitalize">
        {title}
      </h2>
    </div>
  );
};

export default PageBanner;
