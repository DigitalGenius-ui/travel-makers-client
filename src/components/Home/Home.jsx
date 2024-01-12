import React from "react";
import Banner from "./Banner/Banner";
import Search from "./Search/Search";
import Destinations from "./Destinations/Destinations";
import Tours from "./Tours/Tours";
import Assistance from "./Assistance/Assisstance";
import Packages from "./Package/Package";
import HowWorks from "./HowWorks/HowWorks";

const Home = () => {
  return (
    <>
      <Banner />
      <Search />
      <Destinations />
      <Tours />
      <Assistance />
      <Packages />
      <HowWorks />
    </>
  );
};

export default Home;
