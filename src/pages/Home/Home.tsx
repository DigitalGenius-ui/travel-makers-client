import Banner from "../../components/Home/Banner";
import Search from "../../components/Home/Search";
import Destinations from "../../components/Home/Destinations/Destinations";
import Tours from "../../components/Home/RecommendedTours/Tours";
import Packages from "../../components/Home/Package/Package";
import Assistance from "../../components/Home/Assisstance";
import HowWorks from "../../components/Home/HowWorks";

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
