import { MousePos, Square } from "@/interfaces/Chess";
import {
  getAllyCollision,
  getEnemyCollision,
  getPiece,
  isOutOfBondsMoves,
} from "../getFunction";

export const getKnightValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][],
  isWhite: boolean,
  isWhiteToPlay: boolean,
  board: string[][]
): boolean[][] => {
  const moves: { x: number; y: number }[] = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: 2 },
  ];

  moves.forEach((move) => {
    const newY = pos.y + move.y;
    const newX = pos.x + move.x;

    if (isOutOfBondsMoves({ y: newY, x: newX })) return;
    if (
      getAllyCollision(
        isWhiteToPlay ? "n" : "N",
        getPiece({ y: newY, x: newX }, board)
      )
    )
      return;
    if (
      getEnemyCollision(
        isWhiteToPlay ? "n" : "N",
        getPiece({ y: newY, x: newX }, board)
      )
    ) {
      availableBoard[newY][newX] = true;
      return;
    }
    if (availableBoard[newY][newX]) return;
    availableBoard[newY][newX] = true;
  });

  return availableBoard;
};

export const canKnightCheck = (
  pos: MousePos,
  verificationBoard: string[][],
  king: Square
): boolean => {
  const moves: { x: number; y: number }[] = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: 2 },
  ];
  let foundKing = false;

  moves.forEach((move) => {
    const newY = pos.y + move.y;
    const newX = pos.x + move.x;

    if (isOutOfBondsMoves({ y: newY, x: newX })) return;
    if (getPiece({ y: newY, x: newX }, verificationBoard) === king.piece)
      foundKing = true;
  });
  return foundKing;
};
