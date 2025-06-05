import { Avatar } from "@chakra-ui/react";
import React, { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Comments from "../Comment/Comments";
import { useCurrentUser } from "../../../../../../Context/UserContext";

const PostData = ({ getSinglePost }) => {
  const { currentUser } = useCurrentUser();
  const profile = getSinglePost?.user?.profile;
  const [showMore, setShowMore] = useState(500);
  const comments = getSinglePost?.comments;

  return (
    <section className="h-[500px] overflow-y-auto">
      <Link
        to={`/profile/profileDetails/${getSinglePost?.id}`}
        className="flex items-center gap-2 w-fit"
      >
        <Avatar
          name={`${profile?.firstName} ${profile?.lastName}`}
          src={currentUser?.userImg}
          size="sm"
        />
        <h3 className="font-bold">{`${profile?.firstName} ${profile?.lastName}`}</h3>
      </Link>
      <h2 className="font-bold py-3 text-xl">{getSinglePost?.title}</h2>
      <p>
        {getSinglePost?.desc?.substring(0, showMore)}
        {getSinglePost?.desc?.length > 500 && (
          <button
            onClick={() =>
              setShowMore((prev) =>
                prev === 500 ? getSinglePost?.desc?.length : 500
              )
            }
            className="text-orange-600 hover:opacity-60 text-xs"
          >
            {showMore === 500 ? "...show more" : "...show less"}
          </button>
        )}
      </p>
      {getSinglePost?.createAt && (
        <p className="text-xs py-[1rem]">
          {`Posted on : ${format(getSinglePost?.createAt, "LLL dd, yyyy")}`}
        </p>
      )}
      <div className="space-y-5 py-5 border-t border-gray-500">
        {comments?.map((comment) => (
          <Comments comment={comment} key={comment.id} />
        ))}
      </div>
    </section>
  );
};

export default PostData;
