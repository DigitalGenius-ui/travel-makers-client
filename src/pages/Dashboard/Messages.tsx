import ChatBox from "../../components/Dashboard/Messages/ChatBox";
import MessageBoxes from "../../components/Dashboard/Messages/MessageBoxes";

const Messages = () => {
  return (
    <main className="flex gap-3 p-3 bg-gray-50 shadow-lg rounded-md">
      {/* left hand data  */}
      <MessageBoxes />
      {/* right hand data  */}
      <ChatBox />
    </main>
  );
};

export default Messages;
