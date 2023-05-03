import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

interface EndGameModalProps {
  turn: number;
  replayGame: () => void;
  stopGame: () => void;
}

const EndGameModal = ({ replayGame, stopGame, turn }: EndGameModalProps) => {
  return (
    <>
      <div className="w-[500px] h-[300px] absolute z-10 top-[250px] right-[250px] bg-gray-500/70 p-4 rounded-xl">
        <div className="flex flex-col justify-center items-center text-white text-4xl gap-3">
          <p> {turn == 0 ? "Black" : "White"} Wins </p>
          <p className="mt-10">Play again ?</p>
          <div className="flex flex-row mt-12 justify-around w-full">
            <button onClick={replayGame} className=" p-2 rounded-lg w-20 h-20">
              <AiFillCheckCircle size={60} className="text-green-500" />
            </button>
            <button onClick={stopGame} className=" p-2 rounded-lg w-20 h-20">
              <MdCancel size={60} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndGameModal;
