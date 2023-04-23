import React, { useEffect, useState } from "react";
import {
  startingBoardWhite,
  startingBoardBlack,
  startingAvailableBoard,
} from "../models/Boards";
import ChessPiece from "./ChessPiece";
import { Square, MousePos, Game } from "../interfaces/Chess";
import { checkValidMoves, getAvailabilty, getPiece } from "../utils/position";

interface ChessBoardProps {
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  game: Game;
}
const ChessBoard = ({ game, setGame }: ChessBoardProps) => {
  const [board, setBoard] = useState(
    game.isWhite ? startingBoardWhite : startingBoardBlack
  );
  const [availableBoard, setAvailableBoard] = useState(startingAvailableBoard);
  const [selectedSquare, setselectedSquare] = useState<Square>({
    x: 0,
    y: 0,
    piece: "",
  });
  const [selectedPosition, setSelectedPosition] = useState<Square>({
    x: 0,
    y: 0,
    piece: "",
  });
  const [switchPosition, setSwitchPosition] = useState<Boolean>(false);

  const resetAvailableBoard = () => {
    for (let y = 0; y < availableBoard.length; y++) {
      for (let x = 0; x < availableBoard[y].length; x++) {
        availableBoard[y][x] = false;
      }
    }
  };

  const handleSwitchPosition = () => {
    const newBoard = board.slice();
    newBoard[selectedSquare.y][selectedSquare.x] = selectedPosition.piece; // remove pawn at (6,3)
    newBoard[selectedPosition.y][selectedPosition.x] = selectedSquare.piece; // add pawn at (4,3)
    setBoard(newBoard);
    setSelectedPosition({ x: 0, y: 0, piece: "" });
    setselectedSquare({ x: 0, y: 0, piece: "" });
    setSwitchPosition(false);
    resetAvailableBoard();
    setGame({ ...game, turn: game.turn + 1 });
  };

  useEffect(() => {
    if (!switchPosition) return;
    handleSwitchPosition();
  }, [switchPosition]);

  const getMousePosition = (e: any, pos: MousePos) => {
    if (selectedSquare.piece === "") {
      setselectedSquare({ x: pos.x, y: pos.y, piece: board[pos.y][pos.x] });

      checkValidMoves(
        pos,
        getPiece(pos, board),
        availableBoard,
        setAvailableBoard,
        game.turn % 2 == 0,
        game.isWhite,
        board
      );
    }
    if (selectedSquare.piece !== "") {
      if (getAvailabilty(pos, availableBoard)) {
        setSelectedPosition({ x: pos.x, y: pos.y, piece: board[pos.y][pos.x] });
        setSwitchPosition(true);
      } else {
        setselectedSquare({ x: 0, y: 0, piece: "" });
        resetAvailableBoard();
      }
    }
  };

  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex + 1} className="w-full h-[100px] flex flex-row">
          {row.map((col, colIndex) => (
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
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
