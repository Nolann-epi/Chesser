import { MousePos } from "@/interfaces/Chess";
import {
  getAllyCollision,
  getEnemyCollision,
  getPiece,
  isOutOfBondsMoves,
} from "../getFunction";

export const getBishopValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][],
  isWhite: boolean,
  isWhiteToPlay: boolean,
  board: string[][]
): boolean[][] => {
  const x = pos.x;
  const y = pos.y;

  const directions = [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
  ];

  for (const dir of directions) {
    let i = 1;
    while (
      !isOutOfBondsMoves({ y: y + i * dir.y, x: x + i * dir.x }) &&
      !getAllyCollision(
        isWhiteToPlay ? "b" : "B",
        getPiece({ y: y + i * dir.y, x: x + i * dir.x }, board)
      )
    ) {
      if (availableBoard[y + i * dir.y][x + i * dir.x]) break;
      if (
        getEnemyCollision(
          isWhiteToPlay ? "b" : "B",
          getPiece({ y: y + i * dir.y, x: x + i * dir.x }, board)
        )
      ) {
        availableBoard[y + i * dir.y][x + i * dir.x] = true;
        break;
      }
      availableBoard[y + i * dir.y][x + i * dir.x] = true;
      i++;
    }
  }

  return availableBoard;
};
