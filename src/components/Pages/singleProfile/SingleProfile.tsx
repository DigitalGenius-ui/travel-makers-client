import WhiteBg from "../../../utils/WhiteBg";
import UserDetails from "../profile/myPosts/UserDetails/UserDetails";
import UserMoments from "../profile/myPosts/Posts/UserMoments";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../../../Loading";
import { getSingleUser } from "../../../api-call/user-api";
import { USER_KEY } from "../../../constants/react-query";

const SingleProfile = () => {
  const { id } = useParams();

  const { data, isPending } = useQuery({
    queryKey: [USER_KEY, id],
    queryFn: async () => await getSingleUser(id),
  });

  return (
    <WhiteBg>
      <div className="space-y-2">
        {isPending ? (
          <Loading />
        ) : data ? (
          <>
            <UserDetails detail={data} />
            <UserMoments moment={data} />
          </>
        ) : null}
      </div>
    </WhiteBg>
  );
};

export default SingleProfile;
