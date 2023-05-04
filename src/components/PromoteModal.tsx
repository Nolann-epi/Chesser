import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

interface PromoteModalProps {
  setPromoteChoice: (value: string) => void;
  isWhiteToPlay: boolean;
  setIsPromote: (value: boolean) => void;
}

const EndGameModal = ({
  isWhiteToPlay,
  setPromoteChoice,
  setIsPromote,
}: PromoteModalProps) => {
  const originalBoard = ["Q", "R", "B", "N"];

  const togglePromoteModal = (value: string) => {
    setPromoteChoice(value);
    setIsPromote(false);
  };

  return (
    <>
      <div className="w-[500px] h-fit absolute z-10 top-[350px] right-[250px] bg-gray-500/70 p-4 rounded-xl">
        <div className="flex flex-row justify-evenly items-center text-white text-4xl gap-3">
          {originalBoard.map((value, index) => {
            const url = `url(/chess/${value}${isWhiteToPlay ? "W" : "B"}.png`;
            return (
              <div
                key={index}
                style={{ backgroundImage: url }}
                onClick={() => togglePromoteModal(value)}
                className={`w-20 h-20 bg-no-repeat bg-center bg-cover border-transparent p-1 hover:border-green-600 border-4 rounded-lg`}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EndGameModal;
