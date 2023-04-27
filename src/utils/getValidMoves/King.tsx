import { Game, MousePos, Square } from "@/interfaces/Chess";
import {
  getAllyCollision,
  getEnemyCollision,
  getKingPosition,
  getPiece,
  isEnemyPiece,
  isOutOfBondsMoves,
} from "../getFunction";
import { canRookCheck } from "./Rook";
import { canKnightCheck } from "./Knight";
import { canBishopCheck } from "./Bishop";
import { canBlackPawnCheck } from "./BlackPawn";
import { canWhitePawnCheck } from "./WhitePawn";

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

export const isCheckBoard = (board: string[][], king: Square, game: Game) => {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x] === "") continue;
      if (getPiece({ y, x }, board) === (king.piece === "K" ? "r" : "R")) {
        if (canRookCheck({ y, x }, board, king)) {
          //console.log("Rook in ", { y, x }, " can check the king");
          return true;
        }
      }
      if (getPiece({ y, x }, board) === (king.piece === "K" ? "n" : "N")) {
        if (canKnightCheck({ y, x }, board, king)) {
          //console.log("Knight in ", { y, x }, " can check the king");
          return true;
        }
      }
      if (getPiece({ y, x }, board) === (king.piece === "K" ? "b" : "B")) {
        if (canBishopCheck({ y, x }, board, king)) {
          //console.log("Bishop in ", { y, x }, " can check the king");
          return true;
        }
      }
      if (getPiece({ y, x }, board) === (king.piece === "K" ? "q" : "Q")) {
        if (
          canRookCheck({ y, x }, board, king) ||
          canBishopCheck({ y, x }, board, king)
        ) {
          //console.log("Queen in ", { y, x }, " can check the king");
          return true;
        }
      }

      if (getPiece({ y, x }, board) === "P" && king.piece === "k") {
        if (canBlackPawnCheck({ y, x }, board, king, game)) {
          //console.log("Pawn in ", { y, x }, " can check the king");
          return true;
        }
      }

      if (getPiece({ y, x }, board) === "p" && king.piece === "K") {
        if (canWhitePawnCheck({ y, x }, board, king, game)) {
          //console.log("Pawn in ", { y, x }, " can check the king");
          return true;
        }
      }
    }
  }
  return false;
};
