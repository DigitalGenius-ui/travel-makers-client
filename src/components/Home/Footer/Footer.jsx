import { Button, Icon, Image, Link } from "@chakra-ui/react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { agent, support, trip } from "../../../../HomeData.json";
import Screen from "../../../utils/Screen";
import SocialButton from "../../../utils/SocialButtons";

const Footer = () => {
  return (
    <div className="bg-darkBlue py-[3rem]">
      <Screen>
        <div className="flex justify-between flex-col sm:flex-row flex-wrap gap-7">
          <div className="space-y-5">
            <Image h="4rem" src="/logo.png" alt="logo" />
            <div className="flex flex-col gap-2 items-start">
              <LinkButton text="Why Discover Australia" path="#" />
              <LinkButton text="Terms & condition" path="#" />
              <LinkButton text="Privacy Policy" path="#" />
            </div>
            <div className="space-x-2">
              <SocialButton size path="/" icon={<Icon as={FaFacebookF} />} />
              <SocialButton
                size
                path="#"
                icon={<Icon as={FaInstagram} className="text-lg" />}
              />
              <SocialButton
                size
                path="#"
                icon={<Icon as={FaXTwitter} className="text-lg" />}
              />
              <SocialButton
                size
                path="#"
                icon={<Icon as={AiOutlineYoutube} className="text-2xl" />}
              />
            </div>
          </div>
          <Links title="Support" links={support} />
          <Links title="travel trip" links={trip} />
          <Links title="become an agent" links={agent} />
          {/* address  */}
          <div className="space-y-3 text-white">
            <h2 className="capitalize text-blue-200 text-md font-bold">
              contact-us
            </h2>
            <p className="text-sm leading-6">
              51 Rat-U-Thit 200 Pee Rd. Patong Beach, Ban <br /> Pating Phunket,
              Thailand 83150
            </p>
            <div className="text-sm space-y-2">
              <p>
                <span>E</span>
                info@travelmekers.com
              </p>
              <p>
                <span>P</span>
                +66 825 192 688
              </p>
            </div>
          </div>
        </div>
      </Screen>
    </div>
  );
};

export default Footer;

const Links = ({ links, title }) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="capitalize text-blue-200 text-md font-bold">{title}</h2>
      <div className="flex flex-col gap-2">
        {links.map((item, i) => (
          <LinkButton text={item.text} path={item.path} key={i} />
        ))}
      </div>
    </div>
  );
};

const LinkButton = ({ text, path }) => {
  return (
    <Link href={path}>
      <Button variant="link" fontWeight="tiny" color="gray.50" size="sm">
        {text}
      </Button>
    </Link>
  );
};
