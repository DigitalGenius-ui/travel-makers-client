import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from "./Moment";
import EmptyMessage from "../EmptyMessage";
import { SubmitButton } from "../../../../../utils/SubmitButton";
import { useCurrentUser } from "../../../../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { MOMENTS_KEYS } from "../../../../../constants/react-query";
import { getMoments } from "../../../../../api-call/user-api";
import Pagination from "../../../../../utils/Pagination";
import { CartLoading } from "../../../../../utils/Loadings";

const UserMoments = ({ moment }) => {
  const [page, setPage] = useState(1);
  const { currentUser } = useCurrentUser();
  const { id: userId } = useParams();

  const { data, isPending } = useQuery({
    queryKey: [MOMENTS_KEYS, page],
    queryFn: async () => getMoments(page, userId),
  });

  const moments = data?.moments ?? moment?.moments;

  const firstName =
    currentUser?.profile?.firstName ?? moment?.profile?.firstName;

  return (
    <>
      <>
        <div className="flex items-center justify-between pb-8">
          <h1 className="font-bold">{`${firstName} currently has (${moments?.length}) posts :`}</h1>
          {currentUser && currentUser?.id === userId && (
            <Link to="/profile/posts/createPost">
              <SubmitButton>Create New Post</SubmitButton>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-resCol gap-4">
          {isPending ? (
            <CartLoading />
          ) : moments?.length > 0 ? (
            moments?.map((post) => <Moment post={post} key={post.id} />)
          ) : (
            <EmptyMessage text="posts" getUser={currentUser} />
          )}
        </div>

        {data?.totalPages > 1 && (
          <div className="!pt-3">
            <Pagination
              totalPages={data?.totalPages}
              setCurrentPage={setPage}
              currentPage={page}
            />
          </div>
        )}
      </>
    </>
  );
};

export default UserMoments;
