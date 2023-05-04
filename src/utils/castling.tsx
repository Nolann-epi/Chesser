import { Game, Square } from "@/interfaces/Chess";

export const castling = (
  newBoard: string[][],
  castle: boolean,
  playerWhite: any,
  playerBlack: any,
  selectedPiece: Square,
  selectedPosition: Square,
  game: Game
) => {
  if (
    selectedPiece.piece.toUpperCase() === "K" &&
    Math.abs(selectedPiece.x - selectedPosition.x) === 2
  ) {
    if (selectedPiece.x > selectedPosition.x) {
      newBoard[selectedPiece.y][selectedPiece.x - 1] =
        newBoard[selectedPiece.y][0];
      newBoard[selectedPiece.y][0] = "x";
    } else {
      newBoard[selectedPiece.y][selectedPiece.x + 1] =
        newBoard[selectedPiece.y][7];
      newBoard[selectedPiece.y][7] = "x";
    }
    castle = true;
    if (game.turn % 2 === 0) {
      playerWhite.hasMovedKing = true;
    } else {
      playerBlack.hasMovedKing = true;
    }
  }
  if (selectedPiece.piece.toUpperCase() === "K") {
    if (game.turn % 2 === 0) {
      playerWhite.hasMovedKing = true;
    } else {
      playerBlack.hasMovedKing = true;
    }
  }
  if (selectedPiece.piece.toUpperCase() === "R") {
    if (game.turn % 2 === 0) {
      if (selectedPiece.x === 0) {
        playerWhite.hasMovedGrandRook = true;
      } else if (selectedPiece.x === 7) {
        playerWhite.hasMovedPetitRook = true;
      }
    } else {
      if (selectedPiece.x === 0) {
        playerBlack.hasMovedGrandRook = true;
      } else if (selectedPiece.x === 7) {
        playerBlack.hasMovedPetitRook = true;
      }
    }
  }
};
