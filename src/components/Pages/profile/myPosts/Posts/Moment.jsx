import { Button, IconButton, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { ImLocation } from "react-icons/im";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import useCreateData from "../../../../../Hooks/useCreateData";
import { removeMoment } from "../../../../../FetchData/User/UserDetailsClient";
import { useCurrentUser } from "../../../../../Context/UserContext";

const Moment = ({ post }) => {
  const [showRemove, setShowRemove] = useState(false);
  const { currentUser } = useCurrentUser();

  const { submitForm, isPending } = useCreateData({
    key: "user",
    func: removeMoment,
  });

  const id = post?.id;

  const handleRemove = async () => {
    if (currentUser?.id === post.userId) {
      await submitForm({
        inputData: id,
        dataMessage: "Post has been removed",
      });
    }
  };

  return (
    <div className="border border-gray-400 rounded-md bg-white relative w-full lg:max-w-[22rem] overflow-hidden">
      <div className="border-b">
        {post.postImages.length > 0 && (
          <Image src={post.postImages[0]} alt="post-Images" loading="lazy" />
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
      {currentUser?.id === post.userId && (
        <IconButton
          onClick={() => setShowRemove((prev) => !prev)}
          className="!absolute !top-1 !right-2"
          aria-label="remove-post"
          icon={<HiDotsHorizontal />}
          size="sm"
          fontSize="1.5rem"
          variant="ghost"
          color="white"
          _hover={{ backgroundColor: "black" }}
        />
      )}
      {showRemove && (
        <Button
          onClick={handleRemove}
          isLoading={isPending}
          rounded="none"
          borderBottom="4px"
          borderLeft="2px"
          borderColor="black"
          className="!absolute !top-7 !right-2 !px-[3rem]">
          Delete
        </Button>
      )}
    </div>
  );
};

export default Moment;
