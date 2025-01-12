"use client";

import { ChatInput } from "@/components/chat-input";
import { useEffect, useRef, useState } from "react";
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

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-xl h-[100dvh] flex flex-col bg-[#f5f5f5] justify-between">
      <div className="w-full flex justify-center flex-col p-4 gap-2 bg-slate-800 items-center">
        <span className="text-lg font-bold text-white">
          Funnection Ground Juke box
        </span>
        <span className="text-gray02 text-base">퍼넥션 그라운드 주크 박스</span>
      </div>
      <div
        className="flex flex-col overflow-auto gap-2 pl-3 pt-2 h-full"
        style={{ scrollPaddingBottom: "0", overscrollBehavior: "contain" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-slate-500 py-3 px-4 rounded-xl my-1 text-white no-underline break-words custom-no-underline box-shadow-05 whitespace-pre-wrap w-fit max-w-[300px] text-base"
          >
            <span className="custom-no-underline">{msg.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
