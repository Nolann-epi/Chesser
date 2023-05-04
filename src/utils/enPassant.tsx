import { Game, Square } from "@/interfaces/Chess";

export const checkEnPassant = (piece: Square, position: Square, game: Game) => {
  if (piece.piece.toUpperCase() === "P" && piece.x === position.x) {
    if (Math.abs(piece.y - position.y) === 2) {
      const newArray = game.enPassant.slice();
      newArray[piece.x] = 1;
      return piece.x;
    }
  } else {
    return -1;
  }
};

export const enPassantDeletePawn = (
  newBoard: string[][],
  selectedPiece: Square,
  selectedPosition: Square,
  game: Game
) => {
  if (
    selectedPiece.piece.toUpperCase() === "P" &&
    selectedPiece.x !== selectedPosition.x
  ) {
    if (game.isWhite) {
      if (selectedPiece.piece === selectedPiece.piece.toUpperCase()) {
        newBoard[selectedPosition.y - 2][selectedPosition.x] = "x";
      } else {
        newBoard[selectedPosition.y + 2][selectedPosition.x] = "x";
      }
    } else {
      if (selectedPiece.piece !== selectedPiece.piece.toUpperCase()) {
        newBoard[selectedPosition.y - 2][selectedPosition.x] = "x";
      } else {
        newBoard[selectedPosition.y + 2][selectedPosition.x] = "x";
      }
    }
  }
};

export const setEnPassant = (
  selectedPiece: Square,
  selectedPosition: Square,
  game: Game,
  playerBlack: any,
  playerWhite: any,
  setGame: React.Dispatch<React.SetStateAction<Game>>
) => {
  const enPassant = checkEnPassant(selectedPiece, selectedPosition, game);
  if (enPassant !== -1) {
    const newArray = game.enPassant.map((_, i) => (i === enPassant ? 1 : 0));
    setGame({
      ...game,
      turn: game.turn + 1,
      enPassant: newArray,
      playerBlack,
      playerWhite,
    });
  } else {
    setGame({
      ...game,
      turn: game.turn + 1,
      enPassant: [0, 0, 0, 0, 0, 0, 0, 0],
      playerBlack,
      playerWhite,
    });
  }
};
