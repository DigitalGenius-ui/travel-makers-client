import {
  InputGroup,
  InputLeftElement,
  Input,
  InputLeftAddon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { countries } from "./country.json";

const Selects = ({ contactCode, setContactCode }) => {
  const [sortData, setSortData] = useState(countries.sort());
  const [search, setSearch] = useState("");
  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
    const searchedData = countries.filter((country) =>
      country?.name?.toLowerCase().includes(search.toLowerCase())
    );
    setSortData(searchedData);
  }, [countries, search]);

  const handleClick = (country) => {
    setContactCode(country.code);
    setShowSelect(false);
  };

  return (
    <>
      <InputLeftAddon
        onClick={() => setShowSelect((prev) => !prev)}
        className="flex items-center gap-1 cursor-pointer !text-[0.9rem]">
        <span>{contactCode}</span>
        <IoIosArrowDown />
      </InputLeftAddon>
      {showSelect && (
        <div className="absolute top-full left-0 bg-white w-[20rem] shadow-md rounded-md overflow-hidden p-1">
          <InputGroup size="md">
            <InputLeftElement>
              <CiSearch />
            </InputLeftElement>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Country or region"
              fontSize="0.8rem"
            />
          </InputGroup>
          <div className="max-h-[18rem] overflow-y-scroll overflow-x-hidden my-1">
            {sortData?.map((country, i) => (
              <div
                onClick={() => handleClick(country)}
                key={i}
                className="flex items-center gap-1 py-2 px-2 hover:bg-gray-100 cursor-pointer">
                <p>{country.name}</p>
                <span className="text-sm text-gray-600">{country.code}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Selects;
