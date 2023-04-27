export interface MousePos {
  x: number;
  y: number;
}

export interface Square {
  x: number;
  y: number;
  piece: string;
}

export interface Game {
  isWhite: boolean;
  turn: number;
  enPassant: number[];
  isCheck: boolean;
  isCheckMate: boolean;
}

export interface PropsFunction {
  pos: MousePos;
  availableBoard: boolean[][];
  isWhite: boolean;
  isWhiteToPlay: boolean;
  board: string[][];
}
