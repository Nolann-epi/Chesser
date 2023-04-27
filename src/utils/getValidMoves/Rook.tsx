import { MousePos } from "@/interfaces/Chess";
import { getAllyCollision, getEnemyCollision, getPiece } from "../getFunction";

export const getRookValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][],
  isWhite: boolean,
  isWhiteToPlay: boolean,
  board: string[][]
): boolean[][] => {
  for (let x = pos.x + 1; x < 8; x++) {
    const piece = getPiece({ y: pos.y, x }, board);
    if (getAllyCollision(isWhiteToPlay ? "r" : "R", piece)) break;
    if (getEnemyCollision(isWhiteToPlay ? "r" : "R", piece)) {
      availableBoard[pos.y][x] = true;
      break;
    }
    availableBoard[pos.y][x] = true;
  }
  for (let x = pos.x - 1; x >= 0; x--) {
    const piece = getPiece({ y: pos.y, x }, board);
    if (getAllyCollision(isWhiteToPlay ? "r" : "R", piece)) break;
    if (getEnemyCollision(isWhiteToPlay ? "r" : "R", piece)) {
      availableBoard[pos.y][x] = true;
      break;
    }
    availableBoard[pos.y][x] = true;
  }
  for (let y = pos.y + 1; y < 8; y++) {
    const piece = getPiece({ y, x: pos.x }, board);
    if (getAllyCollision(isWhiteToPlay ? "r" : "R", piece)) break;
    if (getEnemyCollision(isWhiteToPlay ? "r" : "R", piece)) {
      availableBoard[y][pos.x] = true;
      break;
    }
    availableBoard[y][pos.x] = true;
  }
  for (let y = pos.y - 1; y >= 0; y--) {
    const piece = getPiece({ y, x: pos.x }, board);
    if (getAllyCollision(isWhiteToPlay ? "r" : "R", piece)) break;
    if (getEnemyCollision(isWhiteToPlay ? "r" : "R", piece)) {
      availableBoard[y][pos.x] = true;
      break;
    }
    availableBoard[y][pos.x] = true;
  }
  return availableBoard;
};
