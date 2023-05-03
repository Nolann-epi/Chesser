import React from "react";
import { TbChessKing } from "react-icons/tb";

interface StartingMenuProps {
  hasStarted: boolean;
  startGame: (side: string) => void;
}

const StartingMenu = ({ hasStarted, startGame }: StartingMenuProps) => {
  return (
    <>
      {!hasStarted && (
        <div className="w-[500px] h-[400px] absolute z-10 top-[250px] right-[250px] bg-gray-800 p-4 rounded-xl">
          <div className="flex flex-col justify-around items-center text-white text-4xl h-full ">
            <p> Choose a side</p>
            <p className="">Play as</p>
            <div className="flex flex-row justify-around w-full h-20">
              <button
                onClick={() => startGame("white")}
                className="p-2 rounded-lg w-20 h-full bg-white border-4 border-transparent hover:border-green-600 hover:border-4"
              >
                <TbChessKing
                  className="text-black text-xl rounded-lg "
                  size={55}
                />
              </button>
              <button
                className="p-2 rounded-lg w-20 h-full border-4 border-transparent bg-gray-500   hover:border-green-600 hover:border-4"
                onClick={() =>
                  startGame(Math.random() > 0.5 ? "white" : "black")
                }
              >
                <span className="outline-8 out outline-black text-white">
                  ?
                </span>
              </button>
              <button
                className="p-2 rounded-lg w-20 h-full bg-black border-4 border-transparent hover:border-green-600 hover:border-4"
                onClick={() => startGame("black")}
              >
                <TbChessKing
                  className="text-white text-xl rounded-lg  "
                  size={55}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartingMenu;
