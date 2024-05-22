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
    <div className="w-full h-10 relative">
      <input
        className="input-custom w-full h-full p-2"
        placeholder="메시지 보내기"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
      />
      <div className="absolute top-[10px] right-[10px]">
        <span onClick={handleSendMessage} className="text-thickRed font-medium">
          보내기
        </span>
      </div>
    </div>
  );
};
