import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import Boxes from "./Boxes";
import SocialLinks from "./SocialLinks";

const socialLinks = [
  {
    icon: <FaFacebook className="text-blue-500" />,
    title: "facebook",
  },
  {
    icon: <FaLinkedin className="text-blue-800" />,
    title: "linkedIn",
  },
  {
    icon: <FaSquareXTwitter />,
    title: "xMedia",
  },
  {
    icon: <FaSquareInstagram className="text-pink-600" />,
    title: "instagram",
  },
];

const LinkedAccounts = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="spaces">
      <h2 className="font-semibold">Linked Accounts :</h2>
      <div className="grid grid-cols-social gap-3 my-[2rem]">
        {socialLinks.map((item, i) => (
          <Boxes item={item} key={i} setShowModal={setShowModal} />
        ))}
      </div>
      {showModal && (
        <SocialLinks showModal={showModal} setShowModal={setShowModal} />
      )}
    </section>
  );
};

export default LinkedAccounts;
