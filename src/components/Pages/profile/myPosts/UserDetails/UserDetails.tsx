import { useState } from "react";
import { Avatar, IconButton } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import BioEdit from "./BioEdit";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../../../../context/UserContext";
import type { singleUserApiType } from "../../../../../api-call/user-api";

const UserDetails = ({ detail }: { detail: singleUserApiType }) => {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useCurrentUser();
  const profile = detail?.profile;

  const { id: userId } = useParams();

  const profileImg = detail?.userImg;
  const { firstName, lastName } = profile || {};

  return (
    <div className="px-3 md:px-0 py-3 md:spaces flex gap-3 border-b border-gray-300">
      <Avatar
        src={profileImg || ""}
        name={`${firstName || ""} ${lastName || ""}`.trim() || "User"}
      />
      <div className="flex-1 space-y-1">
        <h2 className="capitalize">{`${profile?.firstName || "User"} ${
          profile?.lastName || ""
        }`}</h2>
        <p className="text-xs">
          {`${profile?.followings?.length} Followings | ${profile?.followers?.length} Followers`}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm flex-1 line-clamp-2 first-letter:uppercase">
            {profile?.bio || "This user has no bio"}
          </p>
          {currentUser?.id === userId && (
            <IconButton
              onClick={() => setShowModal(true)}
              aria-label="edit"
              icon={<CiEdit />}
              size="sm"
              fontSize={{ base: "xl", small: "2xl" }}
              variant="ghost"
            />
          )}
        </div>
      </div>
      {showModal && (
        <BioEdit
          showModal={showModal}
          setShowModal={setShowModal}
          bioText={profile?.bio}
        />
      )}
    </div>
  );
};

export default UserDetails;
