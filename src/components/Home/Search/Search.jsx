import {
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import Screen from "../../../utils/Screen";
import useGetTours from "../../../Hooks/useGetTours";
import { Link } from "react-router-dom";
import useDebounce from "../../../Hooks/useDebounce";

const Search = () => {
  const { tourData } = useGetTours();

  const [searchInput, setSearchInput] = useState("");
  const [titles, setTitles] = useState([]);

  const debounce = useDebounce();

  useEffect(() => {
    const search = () => {
      if (!searchInput.trim()) {
        setTitles([]);
        return;
      }

      const filterData = tourData?.filter((item) =>
        item.title.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      setTitles(filterData);
    };

    const debounceSearch = debounce(search, 1000);
    debounceSearch();
  }, [searchInput, setTitles, tourData]);

  return (
    <Screen>
      <FormControl className="!mb-[3rem] !mt-[-1.9rem] 2xl:!mt-[-3rem] !shadow-lg relative">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            fontSize={{ base: "1.3rem", "2xl": "3rem" }}
            mt={{ base: "0.5rem", "2xl": "1.5rem" }}
            pl={{ "2xl": "2rem" }}
            color="white"
            outline="none"
          >
            <Icon as={IoSearch} />
          </InputLeftElement>
          <Input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            variant="unstyled"
            fontSize={{ "2xl": "2xl" }}
            p={{ base: "1rem", "2xl": "1.6rem" }}
            pl={{ base: "2.4rem", "2xl": "5rem" }}
            placeholder="Search trip destination"
            className="!bg-gradient !text-white"
          />
        </InputGroup>
        {searchInput !== "" && titles?.length > 0 && (
          <div
            className="bg-white absolute top-full left-0 right-0 shadow-lg
          flex flex-col z-[9999] rounded-md overflow-hidden"
          >
            {titles?.map((item) => (
              <Link
                to={`/tour/${item.id}`}
                className="p-1 py-2 hover:bg-gray-200 w-full text-left text-sm"
                key={item.id}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </FormControl>
    </Screen>
  );
};

export default Search;
