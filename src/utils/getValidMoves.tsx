import { Square, MousePos } from "../interfaces/Chess";
import {
  getPiece,
  isOutOfBondsMoves,
  getEnemyCollision,
  getAllyCollision,
  isEnemyPiece,
  isPiece,
} from "./position";

const getValidMovesForWhitePawn = (
  pos: MousePos,
  availableBoard: boolean[][],
  board: string[][]
) => {
  if (pos.y === 6) {
    if (
      !isPiece({ y: pos.y - 1, x: pos.x }, board) &&
      !isPiece({ y: pos.y - 2, x: pos.x }, board)
    ) {
      availableBoard[pos.y - 1][pos.x] = true;
      availableBoard[pos.y - 2][pos.x] = true;
    }
  } else {
    if (
      !isOutOfBondsMoves({ y: pos.y - 1, x: pos.x }) &&
      !getPiece({ y: pos.y - 1, x: pos.x }, board)
    ) {
      availableBoard[pos.y - 1][pos.x] = true;
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
};

const getValidMovesForBlackPawn = (
  pos: MousePos,
  availableBoard: boolean[][],
  board: string[][]
) => {
  if (pos.y === 1) {
    if (
      !isPiece({ y: pos.y + 1, x: pos.x }, board) &&
      !isPiece({ y: pos.y + 2, x: pos.x }, board)
    ) {
      availableBoard[pos.y + 1][pos.x] = true;
      availableBoard[pos.y + 2][pos.x] = true;
    }
  } else {
    if (
      !isOutOfBondsMoves({ y: pos.y + 1, x: pos.x }) &&
      !isPiece({ y: pos.y + 1, x: pos.x }, board)
    ) {
      availableBoard[pos.y + 1][pos.x] = true;
    }
  }
  if (
    !isOutOfBondsMoves({ y: pos.y + 1, x: pos.x + 1 }) &&
    isEnemyPiece({ y: pos.y + 1, x: pos.x + 1 }, board, "white")
  ) {
    availableBoard[pos.y + 1][pos.x + 1] = true;
  }
  if (
    !isOutOfBondsMoves({ y: pos.y + 1, x: pos.x - 1 }) &&
    isEnemyPiece({ y: pos.y + 1, x: pos.x - 1 }, board, "white")
  ) {
    availableBoard[pos.y + 1][pos.x - 1] = true;
  }
};

export const getPawnValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][],
  isWhite: boolean,
  isWhiteToPlay: boolean,
  board: string[][]
): boolean[][] => {
  if (isWhiteToPlay) {
    if (isWhite) {
      getValidMovesForWhitePawn(pos, availableBoard, board);
    } else {
      getValidMovesForBlackPawn(pos, availableBoard, board);
    }
  } else {
    if (isWhite) {
      getValidMovesForBlackPawn(pos, availableBoard, board);
    } else {
      getValidMovesForWhitePawn(pos, availableBoard, board);
    }
  }
  return availableBoard;
};

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
