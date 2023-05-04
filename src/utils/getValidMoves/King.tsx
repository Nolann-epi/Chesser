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
import { kingProjection } from "../check";

export const getKingValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][],
  isWhite: boolean,
  isWhiteToPlay: boolean,
  board: string[][],
  game: Game
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
  if (isWhite) {
    if (isWhiteToPlay) {
      if (game.playerWhite.hasMovedKing) {
        return availableBoard;
      }
      if (!game.playerWhite.hasMovedPetitRook) {
        if (
          getPiece({ y: pos.y, x: pos.x + 1 }, board) === "x" &&
          !kingProjection(
            { y: pos.y, x: pos.x + 1 },
            board,
            game,
            { piece: "k", y: pos.y, x: pos.x },
            false
          )
        ) {
          if (
            getPiece({ y: pos.y, x: pos.x + 2 }, board) === "x" &&
            !kingProjection(
              { y: pos.y, x: pos.x + 2 },
              board,
              game,
              { piece: "k", y: pos.y, x: pos.x },
              false
            )
          ) {
            availableBoard[pos.y][pos.x + 2] = true;
          }
        }
      }
      if (!game.playerWhite.hasMovedGrandRook) {
        if (
          getPiece({ y: pos.y, x: pos.x - 1 }, board) === "x" &&
          !kingProjection(
            { y: pos.y, x: pos.x - 1 },
            board,
            game,
            { piece: "k", y: pos.y, x: pos.x },
            false
          )
        ) {
          if (
            getPiece({ y: pos.y, x: pos.x - 2 }, board) === "x" &&
            !kingProjection(
              { y: pos.y, x: pos.x - 2 },
              board,
              game,
              { piece: "k", y: pos.y, x: pos.x },
              false
            )
          ) {
            if (
              getPiece({ y: pos.y, x: pos.x - 3 }, board) === "x" &&
              !kingProjection(
                { y: pos.y, x: pos.x - 3 },
                board,
                game,
                { piece: "k", y: pos.y, x: pos.x },
                false
              )
            ) {
              availableBoard[pos.y][pos.x - 2] = true;
            }
          }
        }
      }
    } else {
      if (!isWhiteToPlay) {
        if (game.playerBlack.hasMovedKing) {
          return availableBoard;
        }
        if (!game.playerBlack.hasMovedPetitRook) {
          if (
            getPiece({ y: pos.y, x: pos.x + 1 }, board) === "x" &&
            !kingProjection(
              { y: pos.y, x: pos.x + 1 },
              board,
              game,
              { piece: "K", y: pos.y, x: pos.x },
              false
            )
          ) {
            if (
              getPiece({ y: pos.y, x: pos.x + 2 }, board) === "x" &&
              !kingProjection(
                { y: pos.y, x: pos.x + 2 },
                board,
                game,
                { piece: "K", y: pos.y, x: pos.x },
                false
              )
            ) {
              availableBoard[pos.y][pos.x + 2] = true;
            }
          }
        }
        if (!game.playerBlack.hasMovedGrandRook) {
          if (
            getPiece({ y: pos.y, x: pos.x - 1 }, board) === "x" &&
            !kingProjection(
              { y: pos.y, x: pos.x - 1 },
              board,
              game,
              { piece: "K", y: pos.y, x: pos.x },
              false
            )
          ) {
            if (
              getPiece({ y: pos.y, x: pos.x - 2 }, board) === "x" &&
              !kingProjection(
                { y: pos.y, x: pos.x - 2 },
                board,
                game,
                { piece: "K", y: pos.y, x: pos.x },
                false
              )
            ) {
              if (
                getPiece({ y: pos.y, x: pos.x - 3 }, board) === "x" &&
                !kingProjection(
                  { y: pos.y, x: pos.x - 3 },
                  board,
                  game,
                  { piece: "K", y: pos.y, x: pos.x },
                  false
                )
              ) {
                availableBoard[pos.y][pos.x - 2] = true;
              }
            }
          }
        }
      }
    }
  } else {
    if (isWhiteToPlay) {
      if (game.playerWhite.hasMovedKing) {
        return availableBoard;
      }
      if (!game.playerWhite.hasMovedPetitRook) {
        if (
          getPiece({ y: pos.y, x: pos.x - 1 }, board) === "x" &&
          !kingProjection(
            { y: pos.y, x: pos.x - 1 },
            board,
            game,
            { piece: "k", y: pos.y, x: pos.x },
            false
          )
        ) {
          if (
            getPiece({ y: pos.y, x: pos.x - 2 }, board) === "x" &&
            !kingProjection(
              { y: pos.y, x: pos.x - 2 },
              board,
              game,
              { piece: "k", y: pos.y, x: pos.x },
              false
            )
          ) {
            availableBoard[pos.y][pos.x - 2] = true;
          }
        }
      }
      if (!game.playerWhite.hasMovedGrandRook) {
        if (
          getPiece({ y: pos.y, x: pos.x + 1 }, board) === "x" &&
          !kingProjection(
            { y: pos.y, x: pos.x + 1 },
            board,
            game,
            { piece: "k", y: pos.y, x: pos.x },
            false
          )
        ) {
          if (
            getPiece({ y: pos.y, x: pos.x + 2 }, board) === "x" &&
            !kingProjection(
              { y: pos.y, x: pos.x + 2 },
              board,
              game,
              { piece: "k", y: pos.y, x: pos.x },
              false
            )
          ) {
            if (
              getPiece({ y: pos.y, x: pos.x + 3 }, board) === "x" &&
              !kingProjection(
                { y: pos.y, x: pos.x + 3 },
                board,
                game,
                { piece: "k", y: pos.y, x: pos.x },
                false
              )
            ) {
              availableBoard[pos.y][pos.x + 2] = true;
            }
          }
        }
      }
    } else {
      if (!isWhiteToPlay) {
        if (game.playerBlack.hasMovedKing) {
          return availableBoard;
        }
        if (!game.playerBlack.hasMovedPetitRook) {
          if (
            getPiece({ y: pos.y, x: pos.x - 1 }, board) === "x" &&
            !kingProjection(
              { y: pos.y, x: pos.x - 1 },
              board,
              game,
              { piece: "K", y: pos.y, x: pos.x },
              false
            )
          ) {
            if (
              getPiece({ y: pos.y, x: pos.x - 2 }, board) === "x" &&
              !kingProjection(
                { y: pos.y, x: pos.x - 2 },
                board,
                game,
                { piece: "K", y: pos.y, x: pos.x },
                false
              )
            ) {
              availableBoard[pos.y][pos.x - 2] = true;
            }
          }
        }
        if (!game.playerBlack.hasMovedGrandRook) {
          if (
            getPiece({ y: pos.y, x: pos.x + 1 }, board) === "x" &&
            !kingProjection(
              { y: pos.y, x: pos.x + 1 },
              board,
              game,
              { piece: "K", y: pos.y, x: pos.x },
              false
            )
          ) {
            if (
              getPiece({ y: pos.y, x: pos.x + 2 }, board) === "x" &&
              !kingProjection(
                { y: pos.y, x: pos.x + 2 },
                board,
                game,
                { piece: "K", y: pos.y, x: pos.x },
                false
              )
            ) {
              if (
                getPiece({ y: pos.y, x: pos.x + 3 }, board) === "x" &&
                !kingProjection(
                  { y: pos.y, x: pos.x + 3 },
                  board,
                  game,
                  { piece: "K", y: pos.y, x: pos.x },
                  false
                )
              ) {
                availableBoard[pos.y][pos.x + 2] = true;
              }
            }
          }
        }
      }
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
        if (game.turn % 2 === 0) {
          if (canBlackPawnCheck({ y, x }, board, king, game)) {
            //console.log("Pawn in ", { y, x }, " can check the king");
            return true;
          }
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
