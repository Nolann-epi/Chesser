import { Square, MousePos } from "../interfaces/Chess";

import * as getValidMoves from "./getValidMoves";

export const checkValidMoves = (
  pos: MousePos,
  piece: string,
  availableBoard: boolean[][],
  setBoard: React.Dispatch<React.SetStateAction<boolean[][]>>,
  isWhiteToPlay: boolean,
  isWhite: boolean,
  board: string[][]
) => {
  if (isWhiteToPlay && piece === piece.toLocaleUpperCase()) return;
  if (!isWhiteToPlay && piece !== piece.toLocaleUpperCase()) return;
  const getMoves = new Map([
    ["K", getValidMoves.getKingValidMoves],
    ["Q", getValidMoves.getQueenValidMoves],
    ["R", getValidMoves.getRookValidMoves],
    ["B", getValidMoves.getBishopValidMoves],
    ["N", getValidMoves.getKnightValidMoves],
    ["P", getValidMoves.getPawnValidMoves],
  ]);
  const getValidMovesFn = getMoves.get(piece.toUpperCase());
  if (getValidMovesFn) {
    setBoard(
      getValidMovesFn(pos, availableBoard, isWhite, isWhiteToPlay, board)
    );
  }
};

export const getPiece = (pos: MousePos, board: string[][]) => {
  return board[pos.y][pos.x];
};
export const getAvailabilty = (pos: MousePos, availableBoard: boolean[][]) => {
  return availableBoard[pos.y][pos.x];
};

export const resetAvailableBoard = (availableBoard: boolean[][]) => {
  for (let y = 0; y < availableBoard.length; y++) {
    for (let x = 0; x < availableBoard[y].length; x++) {
      availableBoard[y][x] = false;
    }
  }
  return availableBoard;
};
