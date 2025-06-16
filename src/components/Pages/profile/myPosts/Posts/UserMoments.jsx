import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from "./Moment";
import EmptyMessage from "../EmptyMessage";
import { SubmitButton } from "../../../../../utils/SubmitButton";
import { useCurrentUser } from "../../../../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { MOMENTS_KEYS } from "../../../../../constants/react-query";
import { getMoments } from "../../../../../api-call/user-api";

const UserMoments = ({ moment }) => {
  const [page, setPage] = useState(1);
  const { currentUser } = useCurrentUser();
  const moments = currentUser?.moments ?? moment?.moments;
  const { id: userId } = useParams();

  const { data, isPending } = useQuery({
    queryKey: [MOMENTS_KEYS, page],
    queryFn: async () => getMoments(page),
  });

  console.log(data);

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
