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

export interface gameProps {
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  game: Game;
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  setAvailableBoard: React.Dispatch<React.SetStateAction<boolean[][]>>;
  setselectedPiece: React.Dispatch<React.SetStateAction<Square>>;
  setSelectedPosition: React.Dispatch<React.SetStateAction<Square>>;
  setSwitchPosition: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOver: React.Dispatch<React.SetStateAction<boolean>>;
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDraw: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPromote: React.Dispatch<React.SetStateAction<boolean>>;
  setPromotePiece: React.Dispatch<React.SetStateAction<string>>;
  color?: string;
}
