"use client";

import { ChatInput } from "@/components/chat-input";
import { useState } from "react";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="w-full max-w-xl h-screen flex flex-col justify-between bg-gray-200">
      <div className="w-full flex justify-center p-4">
        <span className="text-lg font-bold font-jua">
          <span className="text-gray05">ELLIO</span> 연애관 소셜링
        </span>
      </div>
      <ChatInput inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  );
};

export default Chat;
