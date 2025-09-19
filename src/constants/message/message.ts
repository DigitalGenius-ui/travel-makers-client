import type { userMessageType } from "../../types/user-type";

export const messageSample: userMessageType[] = [
  {
    id: "1",
    fullName: "milad amiri",
    userImg: "",
    gender: "male",
    message: "Hello, how are you?",
    createAt: "Sat Aug 23 2025 16:48:18 GMT+0800 (Singapore Standard Time)",
    updateAt: "Sat Aug 23 2025 16:48:18 GMT+0800 (Singapore Standard Time)",
  },
  {
    id: "2",
    fullName: "amir khan",
    userImg: "",
    gender: "male",
    message: "Hello, how are you? how was your day?",
    createAt: "Sat Aug 23 2025 16:48:18 GMT+0800 (Singapore Standard Time)",
    updateAt: "Sat Aug 23 2025 16:48:18 GMT+0800 (Singapore Standard Time)",
  },
];

const chatSample = [
  {
    reciever: "683ff79139661cd8c17ca3e9",
    sender: "6870d1788894de5357da2698",
    text: "To get the number of unopened chats, you would track each chat message with a property like isRead.",
    image: "",
    seen: false,
  },
  {
    reciever: "6870d1788894de5357da2698",
    sender: "683ff79139661cd8c17ca3e9",
    text: "To get the number of unopened chats, you would track.",
    image: "",
    seen: false,
  },
  {
    reciever: "6870d1788894de5357da2698",
    sender: "68ae8531a2985617cde392ff",
    text: "To get the number of unopened chats, you would track.",
    image: "",
    seen: false,
  },
];
