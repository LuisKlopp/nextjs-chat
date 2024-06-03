import { Send } from "lucide-react";

import { Dispatch, SetStateAction } from "react";

interface ChatInputProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
}

export const ChatInput = ({
  message,
  setMessage,
  handleSendMessage,
}: ChatInputProps) => {
  return (
    <div className="w-full h-12 relative flex">
      <div className="w-[85%]">
        <textarea
          className="input-custom resize-none h-12 break-words break-all"
          placeholder={!message ? "메시지 보내기" : ""}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="w-[70px] flex justify-center items-center bg-[#f5f5f5]">
        <Send onClick={handleSendMessage}>보내기</Send>
      </div>
    </div>
  );
};
