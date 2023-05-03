export interface MousePos {
  x: number;
  y: number;
}

export interface Square {
  x: number;
  y: number;
  piece: string;
}

export interface Player {
  score: number;
  hasMovedKing: boolean;
  hasMovedGrandRook: boolean;
  hasMovedPetitRook: boolean;
}

export interface Game {
  isWhite: boolean;
  turn: number;
  enPassant: number[];
  isCheck: boolean;
  isCheckMate: boolean;
  playerWhite: Player;
  playerBlack: Player;
}

export interface PropsFunction {
  pos: MousePos;
  availableBoard: boolean[][];
  isWhite: boolean;
  isWhiteToPlay: boolean;
  board: string[][];
}
