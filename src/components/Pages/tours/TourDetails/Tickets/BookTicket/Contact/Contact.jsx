import { Flex, Input, InputGroup } from "@chakra-ui/react";
import Selects from "./Selects";
import { useBookingContext } from "../../../../../../../Context/BookingContext";

const Contact = () => {
  const { bookForm, setBookForm, contactCode, setContactCode, errorMsg } =
    useBookingContext();

  const handleChange = (e) => {
    setBookForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="secondBg rounded-md !top-[-2.1rem] z-[40]">
      <h2 className="text-lg md:text-xl font-bold pb-4">Contact Info</h2>
      <Flex gap={4} flexDirection={{ base: "column-reverse", md: "row" }}>
        <InputGroup size="lg" pos="relative">
          <Selects contactCode={contactCode} setContactCode={setContactCode} />
          <Input
            isInvalid={errorMsg === "contact"}
            onChange={handleChange}
            value={bookForm.phone}
            type="tel"
            placeholder="Phone Number..."
            fontSize="0.9rem"
            bgColor="white"
            name="phone"
            required
          />
        </InputGroup>
        <Input
          isInvalid={errorMsg === "contact"}
          onChange={handleChange}
          value={bookForm.email}
          placeholder="Email..."
          type="email"
          fontSize="0.9rem"
          size="lg"
          bgColor="white"
          name="email"
          required
        />
      </Flex>
    </section>
  );
};

export default Contact;
