import React from "react";
import UserDetails from "./UserDetails";

const MyPosts = () => {
  return (
    <section className="space-y-3">
      <UserDetails userDetails={getUser} />
      <Menu getUser={getUser} />
    </section>
  );
};

export default MyPosts;
