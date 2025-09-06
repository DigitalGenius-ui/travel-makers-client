import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useCurrentUser } from "../../../../../../Context/UserContext";

type likesProps = {
  likes: number;
  momentId: string;
};

const LikePost = ({ likes, momentId }: likesProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser } = useCurrentUser();

  return (
    <button disabled={!currentUser} className="text-3xl relative px-3">
      {isLiked ? (
        <AiFillLike className="!text-orange-600" />
      ) : (
        <AiOutlineLike />
      )}
      <span className="absolute -top-1 -right-0 text-xs font-bold">1.0k</span>
    </button>
  );
};

export default LikePost;
