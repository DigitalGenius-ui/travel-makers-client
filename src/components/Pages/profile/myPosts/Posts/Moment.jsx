import { Image } from "@chakra-ui/react";
import React from "react";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";
import RemoveBtn from "../../../../../utils/RemoveBtn";
import { removeMoment } from "../../../../../FetchData/User/UserDetailsClient";

const Moment = ({ post }) => {
  const id = post?.id;
  return (
    <div className="border border-gray-400 rounded-md bg-white relative w-full lg:max-w-[22rem] overflow-hidden">
      <div className="border-b">
        {post.postImages.length > 0 && (
          <Image
            w="100%"
            h="13rem"
            objectFit="cover"
            src={post.postImages[0]}
            alt="post-Images"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-3">
        <p className="flex items-center gap-1 text-xs text-gray-500">
          <ImLocation />
          {post.location}
        </p>
        <h3 className="font-bold py-2 first-letter:capitalize line-clamp-2">
          {post.title}
        </h3>
        <Link
          to={`/profile/posts/post/${post.id}`}
          className="text-gray-500 text-xs line-clamp-4 hover:text-gray-400">
          {post.desc}. Read More...
        </Link>
      </div>
      <RemoveBtn
        removeFunc={removeMoment}
        inputData={id}
        itemToRemove={post}
        message="Post has been removed"
      />
    </div>
  );
};

export default Moment;
