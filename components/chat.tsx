"use client";

import { ChatInput } from "@/components/chat-input";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface MessagePayload {
  message: string;
}

const Chat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_BASE_URL is not defined");
      return;
    }

    const socket = io(baseUrl);
    setSocket(socket);

    socket.on("message", (payload: MessagePayload) => {
      setMessages((prevMessages) => [...prevMessages, payload.message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit("message", { message });
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
      <ChatInput
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chat;
