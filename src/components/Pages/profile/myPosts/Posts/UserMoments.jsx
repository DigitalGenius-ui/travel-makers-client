import React from "react";
import { Link, useParams } from "react-router-dom";
import Moment from "./Moment";
import EmptyMessage from "../EmptyMessage";
import { SubmitButton } from "../../../../../utils/SubmitButton";
import { useCurrentUser } from "../../../../../Context/UserContext";

const UserMoments = ({ moment }) => {
  const { currentUser } = useCurrentUser();
  const moments = currentUser?.moments ?? moment?.moments;
  const { id: userId } = useParams();

  const firstName =
    currentUser?.profile?.firstName ?? moment?.profile?.firstName;

  return (
    <>
      {moments?.length > 0 ? (
        <>
          <div className="flex items-center justify-between pb-8">
            <h1 className="font-bold">{`Here are ${firstName}'s posts :`}</h1>
            {currentUser && currentUser?.id === userId && (
              <Link to="/profile/posts/createPost">
                <SubmitButton>Create New Post</SubmitButton>
              </Link>
            )}
          </div>
          <div className="grid grid-cols-resCol gap-4">
            {moments.map((post) => (
              <Moment post={post} key={post.id} />
            ))}
          </div>
        </>
      ) : (
        <EmptyMessage text="posts" getUser={currentUser} />
      )}
    </>
  );
};

export default UserMoments;
