import React from "react";
import UserDetails from "./UserDetails/UserDetails";
import Menu from "./Menu";

const MyPosts = () => {
  return (
    <section className="space-y-3">
      <UserDetails />
      <Menu />
    </section>
  );
};

export default MyPosts;
