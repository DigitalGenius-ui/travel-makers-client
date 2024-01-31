import React from "react";
import WhiteBg from "../.../../../../utils/WhiteBg";
import UserDetails from "../profile/myPosts/UserDetails/UserDetails";
import UserMoments from "../profile/myPosts/Posts/UserMoments";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../../FetchData/User/UserDetailsClient";
import { useParams } from "react-router-dom";
import Loading from "../../../Loading";

const SingleProfile = () => {
  const { id } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDetails(id),
  });

  return (
    <WhiteBg>
      <div className="space-y-2">
        {isPending ? (
          <Loading />
        ) : data ? (
          <>
            <UserDetails detail={data?.data?.user} />
            <UserMoments moment={data?.data?.user} />
          </>
        ) : null}
      </div>
    </WhiteBg>
  );
};

export default SingleProfile;
