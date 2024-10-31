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
    <div className="w-full h-12 flex justify-between">
      <div className="w-full">
        <textarea
          className="input-custom resize-none h-12 break-words break-all py-4"
          placeholder={!message ? "메시지 보내기" : ""}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            lineHeight: "1",
            display: "flex",
            alignItems: "center",
          }}
        />
      </div>
      <div
        className={`flex justify-center items-center bg-[#f5f5f5] w-[70px] cursor-pointer ${
          !message ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <Send className="w-[70px]" onClick={handleSendMessage} />
      </div>
    </div>
  );
};
