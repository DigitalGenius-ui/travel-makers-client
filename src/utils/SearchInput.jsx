import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({ value, onChange, placeholder, bg }) => {
  return (
    <InputGroup size="md">
      <InputLeftElement>
        <CiSearch />
      </InputLeftElement>
      <Input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        fontSize="0.8rem"
        bg={bg}
      />
    </InputGroup>
  );
};

export default SearchInput;
