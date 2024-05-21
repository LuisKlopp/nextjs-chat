import { Dispatch, SetStateAction } from "react";

interface ChatInputProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

export const ChatInput = ({ inputValue, setInputValue }: ChatInputProps) => {
  return (
    <div className="w-full h-10 relative">
      <input
        className="input-custom w-full h-full p-2"
        placeholder="메시지 보내기"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
      />
      <div className="absolute top-[10px] right-[10px]">
        <span className="text-thickRed font-medium">보내기</span>
      </div>
    </div>
  );
};
