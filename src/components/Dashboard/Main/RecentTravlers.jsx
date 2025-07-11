import useGetAllUsers from "../../../Hooks/useGetAllUsers";
import { Avatar } from "@chakra-ui/react";
import { dateEgoFormatter } from "../../../utils/Date";
import { UserDashLoading } from "../../../utils/Loadings";

const RecentTravlers = () => {
  const limit = 7;
  const { data, isPending } = useGetAllUsers({ limit });

  return (
    <section className="flex-1 dash-box">
      <h1 className="font-semibold text-gray-700">Recent Users</h1>
      <div>
        {isPending ? (
          <UserDashLoading />
        ) : (
          <div className="space-y-3 mt-3">
            {data?.users?.map((user) => (
              <UserCard user={user} key={user.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentTravlers;

const UserCard = ({ user }) => {
  const { profile } = user;

  const userName =
    profile !== null && `${profile?.firstName} ${profile?.lastName}`;
  return (
    <div className="flex gap-2 relative">
      {verifyLebale(user?.verified)}
      <div>
        <Avatar src={user?.userImg} size={"sm"} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-gray-800 font-semibold text-sm line-clamp-1">
          {userName || user?.email.substring(0, 10)}
        </h2>
        <p className="text-gray-600 text-xs">
          Created on {dateEgoFormatter(user?.createAt)}
        </p>
      </div>
    </div>
  );
};

const verifyLebale = (isVerified) => {
  return (
    <div className="absolute right-0">
      {isVerified ? (
        <p className="text-green-500 text-xs border border-green-300 bg-green-100 px-1">
          Verified
        </p>
      ) : (
        <span className="text-red-500 text-xs border border-red-300 bg-red-100 px-1 relative -top-1">
          Unverified
        </span>
      )}
    </div>
  );
};
