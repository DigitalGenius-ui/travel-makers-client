import { Avatar, Button } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlinePaperClip } from "react-icons/hi2";
import { VscSend } from "react-icons/vsc";
import { ActionButton } from "../../../utils/ActionButton";
import clsx from "clsx";

const ChatBox = () => {
  let isMessage = true;
  return (
    <section className="flex-[2.5]">
      {/* header part */}
      <div className="flex items-center justify-between border-b border-gray-300 p-3 pb-6">
        <div className="flex items-center gap-3">
          <Avatar src={"/male.jpg"} name="milad amiri" />
          <div>
            <h2 className="capitalize font-semibold">Milad Amiri</h2>
            <p className="text-darkText text-sm">last seen recently</p>
          </div>
        </div>
        <button>
          <HiOutlineDotsHorizontal />
        </button>
      </div>
      <div className="flex flex-col justify-between p-5">
        {/* message texts  */}
        <div className="flex-1 min-h-[70vh] max-h-[75vh] overflow-y-auto pb-5">
          {isMessage ? (
            <>
              {/* message time  */}
              <p className="pb-4 flex items-center justify-center capitalize text-darkText text-sm">
                yesterday
              </p>
              <div className="flex flex-col gap-4 pr-4">
                <ChatText />
                <ChatText currentUser={false} />
                <ChatText />
                <ChatText currentUser={false} />
                <ChatText />
                <ChatText currentUser={false} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img
                className="size-[50vh]"
                src="/no-message.png"
                alt="no-message"
              />
              <p className="text-darkText capitalize">no messages yet!</p>
            </div>
          )}
        </div>
        {/* lower input  */}
        <div className="flex items-center gap-2">
          <div className="flex gap-2 flex-1 bg-gray-100 rounded-md">
            <Button bg={"gray.100"}>
              <BsEmojiSmile />
            </Button>
            <input
              className="flex-1 bg-transparent outline-none p-2 resize-none"
              placeholder="Type a message..."
            />
            <Button bg={"gray.100"}>
              <HiOutlinePaperClip />
            </Button>
          </div>
          <ActionButton px={3} py={5} onClick={() => console.log("first")}>
            <VscSend size={20} />
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default ChatBox;

const ChatText = ({ currentUser = true }: { currentUser?: boolean }) => {
  return (
    <div className={clsx("!max-w-[40vw]", !currentUser && "self-end")}>
      {currentUser ? (
        <div className="flex gap-2">
          <Avatar src="/male.jpg" name="milad amiri" />
          <div>
            <p className="bg-gray-200 p-3 rounded-e-xl rounded-bl-xl text-sm leading-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              aspernatur quidem, molestias aperiam obcaecati dolor odit
              temporibus ipsa, in minima amet ab rem! Soluta commodi omnis sed
              magni? Illum, tempora!
            </p>
            <p className="text-darkText text-sm pt-1">10:15Am</p>
          </div>
        </div>
      ) : (
        <>
          <p className="bg-blue-200 p-3 rounded-s-xl rounded-br-xl text-sm leading-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            aspernatur quidem, molestias aperiam obcaecati dolor odit temporibus
            ipsa, in minima amet ab rem! Soluta commodi omnis sed magni? Illum,
            tempora!
          </p>
          <p className="text-darkText text-sm text-right pt-1">10:15Am</p>
        </>
      )}
    </div>
  );
};
