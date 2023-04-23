import { Square, MousePos } from "../interfaces/Chess";

const getOutOfBondsMoves = (pos: MousePos) => {
  if (pos.x < 0 || pos.x > 7 || pos.y < 0 || pos.y > 7) return true;
  return false;
};
const getValidMovesForWhitePawn = (
  pos: MousePos,
  availableBoard: boolean[][]
) => {
  if (pos.y === 6) {
    availableBoard[pos.y - 1][pos.x] = true;
    availableBoard[pos.y - 2][pos.x] = true;
  } else {
    if (getOutOfBondsMoves({ y: pos.y - 1, x: pos.x })) return;
    availableBoard[pos.y - 1][pos.x] = true;
  }
};

const getValidMovesForBlackPawn = (
  pos: MousePos,
  availableBoard: boolean[][]
) => {
  if (pos.y === 1) {
    availableBoard[pos.y + 1][pos.x] = true;
    availableBoard[pos.y + 2][pos.x] = true;
  } else {
    if (getOutOfBondsMoves({ y: pos.y + 1, x: pos.x })) return;
    availableBoard[pos.y + 1][pos.x] = true;
  }
};

export const getPawnValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][],
  isWhite: boolean,
  isWhiteToPlay: boolean
) => {
  if (isWhiteToPlay) {
    if (isWhite) {
      getValidMovesForWhitePawn(pos, availableBoard);
    } else {
      getValidMovesForBlackPawn(pos, availableBoard);
    }
  } else {
    if (isWhite) {
      getValidMovesForBlackPawn(pos, availableBoard);
    } else {
      getValidMovesForWhitePawn(pos, availableBoard);
    }
  }
  return availableBoard;
};

export const getKingValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][]
) => {
  for (let y = pos.y - 1; y <= pos.y + 1; y++) {
    for (let x = pos.x - 1; x <= pos.x + 1; x++) {
      if (getOutOfBondsMoves({ y, x }) || (pos.x === x && pos.y === y))
        continue;
      availableBoard[y][x] = true;
    }
  }
  return availableBoard;
};
export const getQueenValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][]
) => {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (pos.x === x && pos.y === y) continue;
      availableBoard[y][x] = true;
    }
  }
  return availableBoard;
};

export const getRookValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][]
) => {
  for (let y = 0; y < 8; y++) {
    if (pos.y === y) continue;
    availableBoard[y][pos.x] = true;
  }
  for (let x = 0; x < 8; x++) {
    if (pos.x === x) continue;
    availableBoard[pos.y][x] = true;
  }

  return availableBoard;
};

export const getBishopValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][]
) => {
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
    while (!getOutOfBondsMoves({ y: y + i * dir.y, x: x + i * dir.x })) {
      if (availableBoard[y + i * dir.y][x + i * dir.x]) break;
      availableBoard[y + i * dir.y][x + i * dir.x] = true;
      i++;
    }
  }

  return availableBoard;
};

export const getKnightValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][]
) => {
  if (!getOutOfBondsMoves({ y: pos.y + 2, x: pos.x + 1 }))
    availableBoard[pos.y + 2][pos.x + 1] = true;
  if (!getOutOfBondsMoves({ y: pos.y + 2, x: pos.x - 1 }))
    availableBoard[pos.y + 2][pos.x - 1] = true;
  if (!getOutOfBondsMoves({ y: pos.y - 2, x: pos.x + 1 }))
    availableBoard[pos.y - 2][pos.x + 1] = true;
  if (!getOutOfBondsMoves({ y: pos.y - 2, x: pos.x - 1 }))
    availableBoard[pos.y - 2][pos.x - 1] = true;

  return availableBoard;
};
