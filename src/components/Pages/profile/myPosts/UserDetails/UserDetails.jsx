import React, { useState } from "react";
import { Avatar, IconButton } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import BioEdit from "./BioEdit";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../../../../Context/UserContext";

const UserDetails = ({ detail }) => {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useCurrentUser();
  const profile = currentUser?.profile ?? detail?.profile;

  const moments = currentUser?.moments ?? detail?.moments;
  const { id: userId } = useParams();

  return (
    <div className="py-3 md:spaces flex gap-3 border-b border-gray-300">
      <Avatar
        src={profile?.userImg || ""}
        name={`${profile?.firstName} ${profile?.lastName}` || `User`}
      />
      <div className="flex-1 space-y-1">
        <h2 className="capitalize">{`${profile?.firstName || "User"} ${
          profile?.lastName || ""
        }`}</h2>
        <p className="text-xs">
          {`${moments?.length} Posts | ${profile?.followings?.length} 
          Followings | ${profile?.followers?.length} Followers`}
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
          userId={userId}
          bioText={profile?.bio}
        />
      )}
    </div>
  );
};

export default UserDetails;
