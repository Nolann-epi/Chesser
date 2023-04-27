import { Square, MousePos, Game } from "../interfaces/Chess";

import { getKingValidMoves } from "./getValidMoves/King";
import { getQueenValidMoves } from "./getValidMoves/Queen";
import { getRookValidMoves } from "./getValidMoves/Rook";
import { getBishopValidMoves } from "./getValidMoves/Bishop";
import { getKnightValidMoves } from "./getValidMoves/Knight";
import { getBlackPawnValidMoves } from "./getValidMoves/BlackPawn";
import { getWhitePawnValidMoves } from "./getValidMoves/WhitePawn";

export const checkValidMoves = (
  pos: MousePos,
  piece: string,
  availableBoard: boolean[][],
  setBoard: React.Dispatch<React.SetStateAction<boolean[][]>>,
  isWhiteToPlay: boolean,
  game: Game,
  board: string[][]
) => {
  if (isWhiteToPlay && piece === piece.toLocaleUpperCase()) return;
  if (!isWhiteToPlay && piece !== piece.toLocaleUpperCase()) return;
  const getMoves = new Map([
    ["K", getKingValidMoves],
    ["Q", getQueenValidMoves],
    ["R", getRookValidMoves],
    ["B", getBishopValidMoves],
    ["N", getKnightValidMoves],
    ["P", getBlackPawnValidMoves],
    ["p", getWhitePawnValidMoves],
  ]);
  const getValidMovesFn = getMoves.get(
    piece.toUpperCase() === "P" ? piece : piece.toUpperCase()
  );
  if (getValidMovesFn) {
    setBoard(
      getValidMovesFn(
        pos,
        availableBoard,
        game.isWhite,
        isWhiteToPlay,
        board,
        game
      )
    );
  }
};

export const getEnPassantRow = (enPassant: number[]) => {
  for (let i = 0; i < enPassant.length; i++) {
    if (enPassant[i] === 1) return i;
  }
  return -1;
};
export const getPiece = (pos: MousePos, board: string[][]) => {
  return board[pos.y][pos.x];
};
export const getAvailabilty = (pos: MousePos, availableBoard: boolean[][]) => {
  return availableBoard[pos.y][pos.x];
};

export const isOutOfBondsMoves = (pos: MousePos) => {
  if (pos.x < 0 || pos.x > 7 || pos.y < 0 || pos.y > 7) return true;
  return false;
};

export const isEnemyPiece = (
  pos: MousePos,
  board: string[][],
  enemy: string
) => {
  if (board[pos.y][pos.x] === "x") return false;
  if (enemy == "white") {
    if (board[pos.y][pos.x] === board[pos.y][pos.x].toUpperCase()) return false;
  }
  if (enemy == "black") {
    if (board[pos.y][pos.x] === board[pos.y][pos.x].toLowerCase()) return false;
  }
  return true;
};

export const isPiece = (pos: MousePos, board: string[][]) => {
  if (board[pos.y][pos.x] === "x") return false;
  return true;
};

export const getAllyCollision = (piece: string, piece2: string) => {
  const blackPiece = ["K", "Q", "R", "B", "N", "P"];
  const whitePiece = ["k", "q", "r", "b", "n", "p"];
  if (blackPiece.includes(piece) && blackPiece.includes(piece2)) return true;
  if (whitePiece.includes(piece) && whitePiece.includes(piece2)) return true;
  return false;
};

export const getEnemyCollision = (piece: string, piece2: string) => {
  const blackPiece = ["K", "Q", "R", "B", "N", "P"];
  const whitePiece = ["k", "q", "r", "b", "n", "p"];
  if (blackPiece.includes(piece) && whitePiece.includes(piece2)) return true;
  if (whitePiece.includes(piece) && blackPiece.includes(piece2)) return true;
  return false;
};

export const hasAvailableMoves = (availableBoard: boolean[][]) => {
  for (let y = 0; y < availableBoard.length; y++) {
    for (let x = 0; x < availableBoard[y].length; x++) {
      if (availableBoard[y][x]) return true;
    }
  }
  return false;
};

export const resetAvailableBoard = (availableBoard: boolean[][]) => {
  for (let y = 0; y < availableBoard.length; y++) {
    for (let x = 0; x < availableBoard[y].length; x++) {
      availableBoard[y][x] = false;
    }
  }
  return availableBoard;
};
