import { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import SearchInput from "../../../utils/SearchInput";

const filterItems = ["Unread", "Read"];

const MessageBoxes = () => {
  const [search, setSearch] = useState("");
  return (
    <section className="flex-1 border-r border-gray-400 pr-4">
      <div className="flex items-center gap-1 p-3">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <Menu>
          <MenuButton className="bg-btnBlue p-2 rounded-md text-white cursor-pointer hover:opacity-80">
            <IoFilterOutline size={20} />
          </MenuButton>
          <MenuList>
            {filterItems.map((item) => (
              <MenuItem key={item}>{item}</MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      {/* messages  */}
      <div className="space-y-2 my-6">
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </section>
  );
};

export default MessageBoxes;

const Message = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-100 p-2 rounded-md group">
      <Avatar src={"/male.jpg"} name="Milad Amiri" />
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Milad Amiri</h2>
          <p className="text-sm text-btnBlue group-hover:text-darkText">
            10:30 AM
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="line-clamp-2 text-sm text-darkText">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim,
            dignissimos.
          </p>
          <p className="bg-btnBlue rounded-md fit py-0.5 px-2 text-white text-sm">
            1
          </p>
        </div>
      </div>
    </div>
  );
};
