import React from "react";
import ChessPiece from "./ChessPiece";
import { Game } from "@/interfaces/Chess";

interface BoardProps {
  board: string[][];
  availableBoard: boolean[][];
  isOver: boolean;
  getMousePosition: (e: any, position: any) => void;
  game: Game;
}

const Board = ({
  board,
  availableBoard,
  isOver,
  getMousePosition,
  game,
}: BoardProps) => {
  return (
    <>
      {board.map((row: any, rowIndex: any) => (
        <div
          key={rowIndex + 1}
          className={`w-full h-[100px] flex flex-row ${
            isOver ? "opacity-50" : "opacity-100"
          }`}
        >
          {row.map((col: any, colIndex: any) => (
            <div
              key={(colIndex + 1) * (rowIndex + 1)}
              onClick={(e) => getMousePosition(e, { x: colIndex, y: rowIndex })}
              className={`w-[100px] h-full flex justify-center items-center ${
                (rowIndex + colIndex) % 2 === 0
                  ? "bg-[#fff8ed]"
                  : "bg-[#be760a]"
              }`}
            >
              <ChessPiece
                letter={col}
                isAvailable={availableBoard[rowIndex][colIndex]}
                turn={game.turn}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Board;
