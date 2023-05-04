import { Game, Square } from "@/interfaces/Chess";
import { enPassantDeletePawn } from "./enPassant";

export const promotePawnCheck = (
  newBoard: string[][],
  promote: boolean,
  selectedPiece: Square,
  selectedPosition: Square,
  game: Game,
  castle: boolean,
  isPromote: boolean,
  setIsPromote: React.Dispatch<React.SetStateAction<boolean>>,
  promotePiece: string
) => {
  if (selectedPiece.piece.toUpperCase() === "P") {
    if (game.turn % 2 === 0 && game.isWhite && !isPromote) {
      if (selectedPiece.y === 1) {
        promote = true;
        setIsPromote(true);
      }
    }
    if (game.turn % 2 === 0 && !game.isWhite) {
      if (selectedPiece.y === 6) {
        promote = true;
        setIsPromote(true);
      }
    }
    if (game.turn % 2 === 1 && game.isWhite) {
      if (selectedPiece.y === 6) {
        promote = true;
        setIsPromote(true);
      }
    }
    if (game.turn % 2 === 1 && !game.isWhite) {
      if (selectedPiece.y === 1) {
        promote = true;
        setIsPromote(true);
      }
    }
    if (promote == true && promotePiece === "") {
      return;
    }
  }
  if (promotePiece !== "") {
    newBoard[selectedPiece.y][selectedPiece.x] = "x";
    if (game.turn % 2 === 1) {
      newBoard[selectedPosition.y][selectedPosition.x] = promotePiece;
    } else {
      newBoard[selectedPosition.y][selectedPosition.x] =
        promotePiece.toLowerCase();
    }
  }
  if (!promote) {
    if (!castle && selectedPosition.piece === "x") {
      enPassantDeletePawn(newBoard, selectedPiece, selectedPosition, game);
      newBoard[selectedPiece.y][selectedPiece.x] = selectedPosition.piece;
      newBoard[selectedPosition.y][selectedPosition.x] = selectedPiece.piece;
    } else {
      newBoard[selectedPiece.y][selectedPiece.x] = "x";
      newBoard[selectedPosition.y][selectedPosition.x] = selectedPiece.piece;
    }
  }
};
