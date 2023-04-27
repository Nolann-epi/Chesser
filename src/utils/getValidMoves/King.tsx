import { MousePos } from "@/interfaces/Chess";
import {
  getAllyCollision,
  getEnemyCollision,
  getPiece,
  isOutOfBondsMoves,
} from "../getFunction";

export const getKingValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][],
  isWhite: boolean,
  isWhiteToPlay: boolean,
  board: string[][]
): boolean[][] => {
  for (let y = pos.y - 1; y <= pos.y + 1; y++) {
    for (let x = pos.x - 1; x <= pos.x + 1; x++) {
      if (isOutOfBondsMoves({ y, x }) || (pos.x === x && pos.y === y)) continue;
      if (
        getAllyCollision(isWhiteToPlay ? "k" : "K", getPiece({ y, x }, board))
      )
        continue;
      if (
        getEnemyCollision(isWhiteToPlay ? "k" : "K", getPiece({ y, x }, board))
      ) {
        availableBoard[y][x] = true;
        continue;
      }
      availableBoard[y][x] = true;
    }
  }
  return availableBoard;
};
