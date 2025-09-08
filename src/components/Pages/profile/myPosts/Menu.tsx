import { useState } from "react";
import { HStack } from "@chakra-ui/react";
import classNames from "classnames";
import UserMoments from "./Posts/UserMoments";
import UserReviews from "./Reviews/UserReviews";

type menuType = {
  title: string;
  comp: React.ReactElement;
};

const menu: menuType[] = [
  {
    title: "trip moments",
    comp: <UserMoments />,
  },
  {
    title: "reviews",
    comp: <UserReviews />,
  },
];

const Menu = () => {
  const [activeLink, setActiveLink] = useState(menu[0]);
  return (
    <div className="spaces space-y-5">
      <HStack spacing={3}>
        {menu.map((item, i) => (
          <button
            onClick={() => setActiveLink(item)}
            key={i}
            className={`capitalize text-black/80 font-semibold pb-1 text-sm sm:text-md
              ${classNames({
                "!text-blue-600 border-b-2 border-blue-600":
                  activeLink.title === item.title,
              })}`}
          >
            {item.title}
          </button>
        ))}
      </HStack>
      {activeLink.comp}
    </div>
  );
};

export default Menu;
