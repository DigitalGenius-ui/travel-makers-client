import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  bg?: "white";
};

const SearchInput = ({
  value,
  onChange,
  placeholder,
  bg,
}: SearchInputProps) => {
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
