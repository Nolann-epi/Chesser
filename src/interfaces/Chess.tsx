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
}