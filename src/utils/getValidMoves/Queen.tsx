import { MousePos } from "@/interfaces/Chess";
import { getRookValidMoves } from "./Rook";
import { getBishopValidMoves } from "./Bishop";

export const getQueenValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][],
  isWhite: boolean,
  isWhiteToPlay: boolean,
  board: string[][]
): boolean[][] => {
  getRookValidMoves(pos, availableBoard, isWhite, isWhiteToPlay, board);
  getBishopValidMoves(pos, availableBoard, isWhite, isWhiteToPlay, board);
  return availableBoard;
};
