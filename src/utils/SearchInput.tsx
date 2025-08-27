import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

type searchInputProps = {
  value: string;
  onChange: () => void;
  placeholder: string;
  bg: "white";
};

const SearchInput = ({
  value,
  onChange,
  placeholder,
  bg,
}: searchInputProps) => {
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
