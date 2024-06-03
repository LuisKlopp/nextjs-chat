"use client";

import { ChatInput } from "@/components/chat-input";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface MessagePayload {
  message: string;
  sender: string;
}

const Chat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [message, setMessage] = useState<string>("");
  const [room, setRoom] = useState<string>("default");

  useEffect(() => {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_BASE_URL is not defined");
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${baseUrl}/messages/${room}`);
        const data: MessagePayload[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();

    const newSocket = io(baseUrl);
    setSocket(newSocket);

    newSocket.emit("joinRoom", room);

    newSocket.on("message", (payload: MessagePayload) => {
      setMessages((prevMessages) => [...prevMessages, payload]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [room]);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit("message", { room, message });
      setMessage("");
    }
  };

  return (
    <div className="w-full max-w-xl h-[100dvh] flex flex-col fixed bg-[#f5f5f5] justify-between">
      <div className="w-full flex justify-center flex-col p-4 bg-[#3f3f3f] h-16 items-center">
        <span className="text-sm font-bold font-jua text-white">
          Ellio anonymous chatting
        </span>
        <span className="text-gray02 text-xs">
          소셜링에 오신 걸 환영합니다.
        </span>
      </div>
      <div className="flex flex-col h-[calc(100dvh-112px)] overflow-scroll">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-[#673542] py-2 px-4 rounded-2xl my-1 text-white no-underline max-w-[70%] break-words overflow-hidden custom-no-underline"
          >
            <span className="custom-no-underline">{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="bg-white">
        <ChatInput
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
