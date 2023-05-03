import React from "react";

interface ChessPieceProps {
  letter: string;
  isAvailable: boolean;
  turn: number;
}

const ChessPiece = ({ letter, isAvailable, turn }: ChessPieceProps) => {
  const isPiece = letter !== "x";
  const color = letter === letter.toUpperCase() ? "B" : "W";
  const url = `url("../assets/chess/${letter.toUpperCase()}${color}.png")`;
  const bgUrl = `bg-[${url}]`;
  console.log(bgUrl);
  return (
    <div
      className={`w-full h-full ${bgUrl} bg-center bg-no-repeat bg-contain flex justify-center items-center`}
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
