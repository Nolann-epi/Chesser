import { Square, MousePos } from "../interfaces/Chess";

const getOutOfBondsMoves = (pos: MousePos) => {
  if (pos.x < 0 || pos.x > 7 || pos.y < 0 || pos.y > 7) return true;
  return false;
};

export const getPawnValidMoves = (
  pos: MousePos,
  availableBoard: boolean[][],
  isWhite: boolean,
  isWhiteToPlay: boolean
) => {
  if (isWhiteToPlay) {
    if (isWhite) {
      if (pos.y === 6) {
        availableBoard[pos.y - 1][pos.x] = true;
        availableBoard[pos.y - 2][pos.x] = true;
      } else {
        availableBoard[pos.y - 1][pos.x] = true;
      }
    } else {
      if (pos.y === 1) {
        availableBoard[pos.y + 1][pos.x] = true;
        availableBoard[pos.y + 2][pos.x] = true;
      } else {
        availableBoard[pos.y + 1][pos.x] = true;
      }
    }
  } else {
    if (isWhite) {
      if (pos.y === 1) {
        availableBoard[pos.y + 1][pos.x] = true;
        availableBoard[pos.y + 2][pos.x] = true;
      } else {
        availableBoard[pos.y + 1][pos.x] = true;
      }
    } else {
      if (pos.y === 6) {
        availableBoard[pos.y - 1][pos.x] = true;
        availableBoard[pos.y - 2][pos.x] = true;
      } else {
        availableBoard[pos.y - 1][pos.x] = true;
      }
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
  for (let i = 0; i < 8; i++) {
    if (
      (pos.y + i === pos.y && pos.x === pos.x + i) ||
      getOutOfBondsMoves({ y: pos.y + i, x: pos.x + i })
    )
      continue;
    availableBoard[pos.y + i][pos.x + i] = true;
  }
  for (let i = 8; i >= 0; i--) {
    if (
      (pos.y - i === pos.y && pos.x === pos.x + i) ||
      getOutOfBondsMoves({ y: pos.y - i, x: pos.x + i })
    )
      continue;
    availableBoard[pos.y - i][pos.x + i] = true;
  }
  for (let i = 8; i >= 0; i--) {
    if (
      (pos.y + i === pos.y && pos.x === pos.x - i) ||
      getOutOfBondsMoves({ y: pos.y + i, x: pos.x - i })
    )
      continue;
    availableBoard[pos.y + i][pos.x - i] = true;
  }
  for (let i = 8; i >= 0; i--) {
    if (
      (pos.y - i === pos.y && pos.x === pos.x - i) ||
      getOutOfBondsMoves({ y: pos.y - i, x: pos.x - i })
    )
      continue;
    availableBoard[pos.y - i][pos.x - i] = true;
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
