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
    <div className="w-full max-w-xl h-screen flex flex-col justify-between bg-[#faf0f0]">
      <div className="w-full flex justify-center p-4">
        <span className="text-lg font-bold font-jua">
          <span className="text-gray05">Ellio</span> 연애 소셜링
        </span>
      </div>
      {messages.map((msg, index) => (
        <div key={index}>{msg.message}</div>
      ))}
      <ChatInput
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chat;
