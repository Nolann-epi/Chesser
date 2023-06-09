export const startingBoardWhite = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "n", "b", "q", "k", "b", "n", "r"],
];

export const startingBoardBlack = [
  ["r", "n", "b", "k", "q", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "K", "Q", "B", "N", "R"],
];

export const startingAvailableBoard = [
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
];

export const checkMateAvailableBoard = [
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
];

export const defaultGame = {
  isWhite: false,
  turn: 0,
  enPassant: [0, 0, 0, 0, 0, 0, 0, 0],
  isCheck: false,
  isCheckMate: false,
  playerBlack: {
    hasMovedGrandRook: false,
    hasMovedPetitRook: false,
    hasMovedKing: false,
    score: 0,
  },
  playerWhite: {
    hasMovedGrandRook: false,
    hasMovedPetitRook: false,
    hasMovedKing: false,
    score: 0,
  },
};
