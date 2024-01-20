import React, { useState } from "react";
import { Avatar, IconButton } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import BioEdit from "./BioEdit";
import useCurrentUser from "../../../../Hooks/useCurrentUser";

const UserDetails = ({ userDetails }) => {
  const [showModal, setShowModal] = useState < boolean > false;
  const profile = userDetails && userDetails?.profile;

  const { moments } = userDetails;
  const { userId } = useParams();

  const currentUser = useCurrentUser();

  return (
    <div className="py-3 md:spaces flex gap-3 border-b border-gray-300">
      <Avatar
        src={profile?.userImg || ""}
        name={
          `${profile?.firstName} ${profile?.lastName}` || `FirstName LastName`
        }
      />
      <div className="flex-1 space-y-1">
        <h2 className="capitalize">{`${profile?.firstName || "First Name"} ${
          profile?.lastName || "Last Name"
        }`}</h2>
        <p className="text-xs">
          {moments.length} Posts | {profile?.followings.length || 0} Followings
          |{profile?.followers.length || 0} Followers
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm flex-1 line-clamp-2 first-letter:uppercase">
            {profile?.bio || "This user has no bio"}
          </p>
          {currentUser.id === userId && (
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
        />
      )}
    </div>
  );
};

export default UserDetails;
