import { Game, MousePos, Square } from "@/interfaces/Chess";
import {
  checkValidMoves,
  getKingPosition,
  getPiece,
  isEnemyPiece,
} from "./getFunction";
import { isCheckBoard } from "./getValidMoves/King";
import { checkMateAvailableBoard } from "@/models/Boards";

export const kingProjection = (
  pos: MousePos,
  board: string[][],
  game: Game,
  piece: Square,
  isCheckmate: boolean
) => {
  const isWhiteToPlay = isCheckmate ? game.turn % 2 == 1 : game.turn % 2 == 0;
  const kingToFind = isWhiteToPlay ? "k" : "K";
  const kingPos = getKingPosition(board, kingToFind);
  const verificationBoard = board.map((row) => [...row]);
  verificationBoard[pos.y][pos.x] = piece.piece;
  verificationBoard[piece.y][piece.x] = "x";
  return isCheckBoard(
    verificationBoard,
    {
      x: kingPos.x,
      y: kingPos.y,
      piece: kingToFind,
    },
    game
  );
};

const isKingInCheck = (
  pos: MousePos,
  board: string[][],
  game: Game,
  piece: Square,
  isCheckmate: boolean
) => {
  if (kingProjection(pos, board, game, piece, isCheckmate)) {
    return true;
  } else {
    return false;
  }
};

export const checkKingCheck = (
  game: Game,
  piece: Square,
  availableBoard: boolean[][],
  board: string[][],
  isCheckmate: boolean
) => {
  for (let y = 0; y < availableBoard.length; y++) {
    for (let x = 0; x < availableBoard[y].length; x++) {
      if (availableBoard[y][x]) {
        if (isKingInCheck({ y, x }, board, game, piece, isCheckmate)) {
          availableBoard[y][x] = false;
        }
      }
    }
  }
  return availableBoard;
};

const isCheckMate = (board: string[][], game: Game) => {
  const avBoard = checkMateAvailableBoard.slice();
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const piece = getPiece({ y, x }, board);
      if (piece === "x") continue;
      if (
        isEnemyPiece({ y, x }, board, game.turn % 2 == 0 ? "black" : "white")
      ) {
        if (
          checkValidMoves(
            { y, x },
            piece,
            avBoard,
            game.turn % 2 == 1,
            game,
            board,
            true
          )
        ) {
          console.log(piece, "can avoid checkmate");
          return false;
        }
      }
    }
  }
  console.log("can't avoid check");
  return true;
};

export const checkForCheck = (
  board: string[][],
  game: Game,
  setGame: React.Dispatch<React.SetStateAction<Game>>,
  setIsOver: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDraw: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const king = game.turn % 2 == 0 ? "K" : "k";
  const pos = getKingPosition(board, king);

  if (isCheckBoard(board, { y: pos.y, x: pos.x, piece: king }, game)) {
    console.log("check");
    if (isCheckMate(board, game)) {
      console.log("CHECKMATE");
      setIsOver(true);
    } else {
      setGame((prev) => ({ ...prev, isCheck: true }));
      console.log("you can avoid checkmate");
    }
  } else {
    if (isCheckMate(board, game)) {
      setIsDraw(true);
      setIsOver(true);
    } else {
      setGame((prev) => ({ ...prev, isCheck: false }));
    }
  }
  console.log(game);
};
