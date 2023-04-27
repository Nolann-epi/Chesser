import React, { useEffect, useState } from "react";
import {
  startingBoardWhite,
  startingBoardBlack,
  startingAvailableBoard,
} from "../models/Boards";
import ChessPiece from "./ChessPiece";
import { Square, MousePos, Game } from "../interfaces/Chess";
import {
  checkValidMoves,
  getAvailabilty,
  getPiece,
  hasAvailableMoves,
  getKingPosition,
  isCheck,
} from "../utils/getFunction";

interface ChessBoardProps {
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  game: Game;
}
const ChessBoard = ({ game, setGame }: ChessBoardProps) => {
  const [board, setBoard] = useState(
    game.isWhite ? startingBoardWhite : startingBoardBlack
  );
  const [availableBoard, setAvailableBoard] = useState(startingAvailableBoard);
  const [selectedPiece, setselectedPiece] = useState<Square>({
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
  const checkEnPassant = (piece: Square, position: Square) => {
    if (piece.piece.toUpperCase() === "P" && piece.x === position.x) {
      if (Math.abs(piece.y - position.y) === 2) {
        const newArray = game.enPassant.slice();
        newArray[piece.x] = 1;
        return piece.x;
      }
    } else {
      return -1;
    }
  };

  const enPassantDeletePawn = (newBoard: string[][]) => {
    if (
      selectedPiece.piece.toUpperCase() === "P" &&
      selectedPiece.x !== selectedPosition.x
    ) {
      if (game.isWhite) {
        if (selectedPiece.piece === selectedPiece.piece.toUpperCase()) {
          newBoard[selectedPosition.y - 2][selectedPosition.x] = "x";
        } else {
          newBoard[selectedPosition.y + 2][selectedPosition.x] = "x";
        }
      } else {
        if (selectedPiece.piece !== selectedPiece.piece.toUpperCase()) {
          newBoard[selectedPosition.y - 2][selectedPosition.x] = "x";
        } else {
          newBoard[selectedPosition.y + 2][selectedPosition.x] = "x";
        }
      }
    }
  };

  const handleSwitchPosition = () => {
    const newBoard = board.slice();
    if (selectedPosition.piece === "x") {
      enPassantDeletePawn(newBoard);
      newBoard[selectedPiece.y][selectedPiece.x] = selectedPosition.piece;
      newBoard[selectedPosition.y][selectedPosition.x] = selectedPiece.piece;
    } else {
      newBoard[selectedPiece.y][selectedPiece.x] = "x";
      newBoard[selectedPosition.y][selectedPosition.x] = selectedPiece.piece;
    }
    setBoard(newBoard);
    setSelectedPosition({ x: 0, y: 0, piece: "" });
    setselectedPiece({ x: 0, y: 0, piece: "" });
    setSwitchPosition(false);
    resetAvailableBoard();
    const enPassant = checkEnPassant(selectedPiece, selectedPosition);
    if (enPassant !== -1) {
      const newArray = game.enPassant.map((_, i) => (i === enPassant ? 1 : 0));
      setGame({ ...game, turn: game.turn + 1, enPassant: newArray });
    } else {
      setGame({
        ...game,
        turn: game.turn + 1,
        enPassant: [0, 0, 0, 0, 0, 0, 0, 0],
      });
    }
    isCheck(board, game);
  };

  useEffect(() => {
    if (!switchPosition) return;
    handleSwitchPosition();
  }, [switchPosition, selectedPosition]);

  const getMousePosition = (e: any, pos: MousePos) => {
    if (selectedPiece.piece === "") {
      checkValidMoves(
        pos,
        getPiece(pos, board),
        availableBoard,
        game.turn % 2 == 0,
        game,
        board,
        false,
        setAvailableBoard
      );

      if (hasAvailableMoves(availableBoard)) {
        setselectedPiece({ x: pos.x, y: pos.y, piece: board[pos.y][pos.x] });
      }
    }
    if (selectedPiece.piece !== "") {
      if (getAvailabilty(pos, availableBoard)) {
        setSelectedPosition({ x: pos.x, y: pos.y, piece: board[pos.y][pos.x] });
        setSwitchPosition(true);
      } else {
        setselectedPiece({ x: 0, y: 0, piece: "" });
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
                turn={game.turn}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
