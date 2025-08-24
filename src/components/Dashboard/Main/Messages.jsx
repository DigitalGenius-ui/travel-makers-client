import { Avatar, IconButton } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Messages = () => {
  return (
    <section className="flex-1 dash-box !p-2">
      <div className="flex items-center justify-between p-1">
        <h1 className="font-semibold text-md text-gray-700">Messages</h1>
        <IconButton size="sm" variant={"ghost"}>
          <HiOutlineDotsHorizontal />
        </IconButton>
      </div>
      <div className="space-y-1 mt-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <Message key={i} />
        ))}
      </div>
    </section>
  );
};

export default Messages;

const Message = () => {
  const message = "Hello there, how are your doing today?";
  return (
    <div className="flex items-center gap-2 hover:bg-blue-50 p-2 rounded-md cursor-pointer">
      <Avatar src="/male.png" size={"sm"} />
      <div className="flex-1">
        <h1 className="font-semibold text-gray-700 text-sm">Milad Amiri</h1>
        <p className="text-xs text-darkText line-clamp-1">{message}</p>
      </div>
      <div className="flex items-end flex-col gap-1 text-xs">
        <p className="text-blue-600">2:30 AM</p>
        <p className="bg-blue-800 flex items-center justify-center size-5 text-white rounded-md">
          3
        </p>
      </div>
    </div>
  );
};
