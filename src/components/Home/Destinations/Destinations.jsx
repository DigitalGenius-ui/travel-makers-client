import Screen from "../../../utils/Screen";
import Title from "../../../utils/Title";
import Slider from "./Slider";

const Destinations = () => {
  return (
    <section id="tours" className="mb-[2rem] 2xl:my-[6rem]">
      <Screen>
        <Title
          title="What is your life style?"
          tag="Find yourself"
          btnText="See all Destination"
        />
      </Screen>
      <Slider />
    </section>
  );
};

export default Destinations;
