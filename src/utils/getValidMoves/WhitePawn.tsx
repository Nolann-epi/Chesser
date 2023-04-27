import { Game, MousePos } from "@/interfaces/Chess";
import {
  getEnPassantRow,
  isEnemyPiece,
  isOutOfBondsMoves,
  isPiece,
} from "../getFunction";

export const getWhitePawnValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][],
  isWhite: boolean,
  isWhiteToPlay: boolean,
  board: string[][],
  game: Game
): boolean[][] => {
  if (isWhite) {
    if (pos.y === 6) {
      if (!isPiece({ y: pos.y - 1, x: pos.x }, board)) {
        availableBoard[pos.y - 1][pos.x] = true;
      }
      if (!isPiece({ y: pos.y - 2, x: pos.x }, board))
        availableBoard[pos.y - 2][pos.x] = true;
    } else {
      if (
        !isOutOfBondsMoves({ y: pos.y - 1, x: pos.x }) &&
        !isPiece({ y: pos.y - 1, x: pos.x }, board)
      ) {
        availableBoard[pos.y - 1][pos.x] = true;
      }
    }
    if (pos.y === 2) {
      const row = getEnPassantRow(game.enPassant);
      if (Math.abs(row - pos.x) === 1) {
        if (row - pos.x >= 0) {
          availableBoard[pos.y - 1][pos.x + 1] = true;
        }
        if (row - pos.x < 0) {
          availableBoard[pos.y - 1][pos.x - 1] = true;
        }
      }
    }
    if (
      !isOutOfBondsMoves({ y: pos.y - 1, x: pos.x + 1 }) &&
      isEnemyPiece({ y: pos.y - 1, x: pos.x + 1 }, board, "black")
    ) {
      availableBoard[pos.y - 1][pos.x + 1] = true;
    }
    if (
      !isOutOfBondsMoves({ y: pos.y - 1, x: pos.x - 1 }) &&
      isEnemyPiece({ y: pos.y - 1, x: pos.x - 1 }, board, "black")
    ) {
      availableBoard[pos.y - 1][pos.x - 1] = true;
    }
  } else {
    if (pos.y === 1) {
      if (!isPiece({ y: pos.y + 1, x: pos.x }, board)) {
        availableBoard[pos.y + 1][pos.x] = true;
      }
      if (!isPiece({ y: pos.y + 2, x: pos.x }, board))
        availableBoard[pos.y + 2][pos.x] = true;
    } else {
      if (
        !isOutOfBondsMoves({ y: pos.y + 1, x: pos.x }) &&
        !isPiece({ y: pos.y + 1, x: pos.x }, board)
      ) {
        availableBoard[pos.y + 1][pos.x] = true;
      }
    }
    if (pos.y === 5) {
      const row = getEnPassantRow(game.enPassant);
      if (Math.abs(row - pos.x) === 1) {
        if (row - pos.x >= 0) {
          availableBoard[pos.y + 1][pos.x + 1] = true;
        }
        if (row - pos.x < 0) {
          availableBoard[pos.y + 1][pos.x - 1] = true;
        }
      }
    }
    if (
      !isOutOfBondsMoves({ y: pos.y + 1, x: pos.x + 1 }) &&
      isEnemyPiece({ y: pos.y + 1, x: pos.x + 1 }, board, "black")
    ) {
      availableBoard[pos.y + 1][pos.x + 1] = true;
    }
    if (
      !isOutOfBondsMoves({ y: pos.y + 1, x: pos.x - 1 }) &&
      isEnemyPiece({ y: pos.y + 1, x: pos.x - 1 }, board, "black")
    ) {
      availableBoard[pos.y + 1][pos.x - 1] = true;
    }
  }

  return availableBoard;
};
