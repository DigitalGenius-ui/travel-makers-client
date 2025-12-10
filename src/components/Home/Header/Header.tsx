import { Fragment, useState } from "react";
import { HStack, Image, IconButton, useMediaQuery } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import classNames from "classnames";
import { nav } from "../../../../HomeData.json";
import DropDown from "./DropDown";
import { Link, useNavigate } from "react-router-dom";
import Screen from "../../../utils/Screen";
import useHeaderScroll from "../../../hooks/useHeaderScroll";
import { useCurrentUser } from "../../../context/UserContext";

const Header = () => {
  const { isScroll, changeBg } = useHeaderScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, isPending } = useCurrentUser();
  const navClassName = `relative before:absolute before:bottom-0 before:left-0 before:right-0
  before:h-[1px] before:bg-white before:scale-0 before:hover:scale-100 before:transition-all
  before:duration-500 hover:opacity-50 2xl:text-xl`;

  const [isSmallScreen] = useMediaQuery("(max-width: 765px)");

  const navigate = useNavigate();

  return (
    <header
      className={`fixed top-0 left-0 right-0 text-white transition-all duration-500 !z-[999]
      ${classNames({
        "translate-y-[-120px]": !isSmallScreen && isScroll,
        "bg-darkBlue": changeBg,
      })}`}
    >
      <Screen>
        <div className="flex items-center justify-between gap-3 h-[80px] 2xl:h-[120px]">
          <Link to="/">
            <Image
              h={{ base: "4rem", "2xl": "6rem" }}
              objectFit="cover"
              src="/logo.png"
              alt="logo"
            />
          </Link>
          <div
            className={`flex flex-col md:flex-row items-center lg:items-initial justify-center 
            text-left gap-6 md:gap-4 text-3xl md:text-sm lg:text-md fixed md:relative inset-0 bg-darkBlue
            md:bg-transparent hide
            ${classNames({ animated: menuOpen })}`}
          >
            {/* icons to close the bar  */}
            <IconButton
              onClick={() => setMenuOpen(false)}
              display={{ base: "block", md: "none" }}
              position="absolute"
              top="1.5rem"
              right="1.5rem"
              fontSize="1.2rem"
              aria-label="close nav"
              variant="outlined"
              icon={<CloseIcon />}
            />
            {/* navigation  */}
            {nav.map((item) => (
              <Fragment key={item.title}>
                {item.path.startsWith("/") ? (
                  <Link to={item.path} className={navClassName}>
                    {item.title}
                  </Link>
                ) : (
                  <a className={navClassName} href={item.path}>
                    {item.title}
                  </a>
                )}
              </Fragment>
            ))}
          </div>
          {/* phone number and avatar + menu bar icon  */}
          <HStack spacing={3}>
            {isPending ? (
              <div className="w-[2rem] h-[2rem] rounded-full bg-gray-300 animate-pulse" />
            ) : currentUser ? (
              <DropDown />
            ) : (
              <button
                onClick={() => navigate("/auth/login")}
                className="capitalize text-sm 2xl:text-lg hover:opacity-70"
              >
                sign in
              </button>
            )}
            <span>
              <IconButton
                onClick={() => setMenuOpen(true)}
                display={{ base: "block", md: "none" }}
                aria-label="bar"
                position="inherit"
                variant="outlined"
                fontSize="2rem"
                zIndex="0"
                icon={<HamburgerIcon />}
              />
            </span>
          </HStack>
        </div>
      </Screen>
    </header>
  );
};

export default Header;
