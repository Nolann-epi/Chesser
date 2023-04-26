import React from "react";

interface ChessPieceProps {
  letter: string;
  isAvailable: boolean;
  turn: number;
}

const ChessPiece = ({ letter, isAvailable, turn }: ChessPieceProps) => {
  let path;
  const isPiece = letter !== "x";
  switch (letter) {
    case "R":
      path = `bg-[url("../assets/chess/RB.png")]`;
      break;
    case "N":
      path = `bg-[url("../assets/chess/NB.png")]`;
      break;
    case "B":
      path = `bg-[url("../assets/chess/BB.png")]`;
      break;
    case "K":
      path = `bg-[url("../assets/chess/KB.png")]`;
      break;
    case "Q":
      path = `bg-[url("../assets/chess/QB.png")]`;
      break;
    case "P":
      path = `bg-[url("../assets/chess/PB.png")]`;
      break;
    case "r":
      path = `bg-[url("../assets/chess/RW.png")]`;
      break;
    case "n":
      path = `bg-[url("../assets/chess/NW.png")]`;
      break;
    case "b":
      path = `bg-[url("../assets/chess/BW.png")]`;
      break;
    case "k":
      path = `bg-[url("../assets/chess/KW.png")]`;
      break;
    case "q":
      path = `bg-[url("../assets/chess/QW.png")]`;
      break;
    case "p":
      path = `bg-[url("../assets/chess/PW.png")]`;
      break;
    default:
      path = "";
      break;
  }

  return (
    <div
      className={`w-full h-full ${path} bg-center bg-no-repeat bg-contain flex justify-center items-center`}
    >
      {isAvailable && !isPiece && (
        <div
          className={`h-[40px] w-[40px] bg-gray-500/70  rounded-full `}
        ></div>
      )}
      {isAvailable && isPiece && (
        <div
          className={`h-[100px] w-[100px] border-gray-500/70 border-[6px] rounded-full `}
        ></div>
      )}
    </div>
  );
};

export default ChessPiece;
