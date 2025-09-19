import { InputLeftAddon } from "@chakra-ui/react";
import { useEffect, useState, type SetStateAction } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { countries } from "./country.json";
import SearchInput from "../../../../../../../utils/SearchInput";

type selectType = {
  contactCode: string;
  setContactCode: React.Dispatch<SetStateAction<string>>;
};

const Selects = ({ contactCode, setContactCode }: selectType) => {
  const [sortData, setSortData] = useState(countries.sort());
  const [search, setSearch] = useState("");
  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
    const searchedData = countries.filter((country) =>
      country?.name?.toLowerCase().includes(search.toLowerCase())
    );
    setSortData(searchedData);
  }, [search]);

  const handleClick = (code: string) => {
    setContactCode(code);
    setShowSelect(false);
  };

  return (
    <>
      <InputLeftAddon
        onClick={() => setShowSelect((prev) => !prev)}
        className="flex items-center gap-1 cursor-pointer !text-[0.9rem]"
      >
        <span>{contactCode}</span>
        <IoIosArrowDown />
      </InputLeftAddon>
      {showSelect && (
        <div className="absolute top-full left-0 bg-white w-[20rem] shadow-md rounded-md overflow-hidden p-1">
          <SearchInput
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Country or region"
          />
          <div className="max-h-[18rem] overflow-y-scroll overflow-x-hidden my-1">
            {sortData?.map((country, i) => (
              <div
                onClick={() => handleClick(country.code)}
                key={i}
                className="flex items-center gap-1 py-2 px-2 hover:bg-gray-100 cursor-pointer"
              >
                <p>{country.name}</p>
                <span className="text-sm text-darkText">{country.code}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Selects;
