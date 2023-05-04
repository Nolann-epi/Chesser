import React, { useEffect, useState } from "react";
import {
  startingBoardWhite,
  startingBoardBlack,
  startingAvailableBoard,
} from "../models/Boards";
import ChessPiece from "./ChessPiece";
import { Square, MousePos, Game } from "../interfaces/Chess";
import {
  checkValidMoves,
  getAvailabilty,
  getPiece,
  hasAvailableMoves,
  isCheck,
} from "../utils/getFunction";
import StartingMenu from "./StartingMenu";
import EndGameModal from "./EndGameModal";
import PlayerScore from "./PlayerScore";

interface ChessBoardProps {
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  game: Game;
}
const ChessBoard = ({ game, setGame }: ChessBoardProps) => {
  const [board, setBoard] = useState(
    game.isWhite
      ? JSON.parse(JSON.stringify(startingBoardWhite))
      : JSON.parse(JSON.stringify(startingBoardBlack))
  );
  const [availableBoard, setAvailableBoard] = useState(
    startingAvailableBoard.slice()
  );
  const [selectedPiece, setselectedPiece] = useState<Square>({
    x: 0,
    y: 0,
    piece: "",
  });
  const [selectedPosition, setSelectedPosition] = useState<Square>({
    x: 0,
    y: 0,
    piece: "",
  });
  const [switchPosition, setSwitchPosition] = useState<boolean>(false);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(false);

  const resetAvailableBoard = () => {
    for (let y = 0; y < availableBoard.length; y++) {
      for (let x = 0; x < availableBoard[y].length; x++) {
        availableBoard[y][x] = false;
      }
    }
  };
  const checkEnPassant = (piece: Square, position: Square) => {
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

  const enPassantDeletePawn = (newBoard: string[][]) => {
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

  const handleSwitchPosition = () => {
    const newBoard = board.slice();
    const playerWhite = game.playerWhite;
    const playerBlack = game.playerBlack;
    let castle = false;
    //castling
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
      console.log(game.playerWhite);
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

    if (!castle && selectedPosition.piece === "x") {
      enPassantDeletePawn(newBoard);
      newBoard[selectedPiece.y][selectedPiece.x] = selectedPosition.piece;
      newBoard[selectedPosition.y][selectedPosition.x] = selectedPiece.piece;
    } else {
      newBoard[selectedPiece.y][selectedPiece.x] = "x";
      newBoard[selectedPosition.y][selectedPosition.x] = selectedPiece.piece;
    }
    setBoard(newBoard);
    setSelectedPosition({ x: 0, y: 0, piece: "" });
    setselectedPiece({ x: 0, y: 0, piece: "" });
    setSwitchPosition(false);
    resetAvailableBoard();
    const enPassant = checkEnPassant(selectedPiece, selectedPosition);
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
    isCheck(board, game, setGame, setIsOver, setIsDraw);
  };

  useEffect(() => {
    if (!switchPosition) return;
    handleSwitchPosition();
  }, [switchPosition, selectedPosition, game]);

  const getMousePosition = (e: any, pos: MousePos) => {
    if (selectedPiece.piece === "") {
      checkValidMoves(
        pos,
        getPiece(pos, board),
        availableBoard,
        game.turn % 2 == 0,
        game,
        board,
        false,
        setAvailableBoard
      );

      if (hasAvailableMoves(availableBoard)) {
        setselectedPiece({ x: pos.x, y: pos.y, piece: board[pos.y][pos.x] });
      }
    }
    if (selectedPiece.piece !== "") {
      if (getAvailabilty(pos, availableBoard)) {
        setSelectedPosition({ x: pos.x, y: pos.y, piece: board[pos.y][pos.x] });
        setSwitchPosition(true);
      } else {
        setselectedPiece({ x: 0, y: 0, piece: "" });
        resetAvailableBoard();
      }
    }
  };

  const replayGame = () => {
    if (game.isWhite) {
      setGame({
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
      });
      setBoard(JSON.parse(JSON.stringify(startingBoardBlack)));
    } else {
      setGame({
        isWhite: true,
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
      });
      setBoard(JSON.parse(JSON.stringify(startingBoardWhite)));
    }
    setAvailableBoard(startingAvailableBoard.slice());
    setselectedPiece({ x: 0, y: 0, piece: "" });
    setSelectedPosition({ x: 0, y: 0, piece: "" });
    setSwitchPosition(false);
    setIsOver(false);
  };

  const stopGame = () => {
    setGame({
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
    });
    setAvailableBoard(startingAvailableBoard.slice());
    setselectedPiece({ x: 0, y: 0, piece: "" });
    setSelectedPosition({ x: 0, y: 0, piece: "" });
    setSwitchPosition(false);
    setHasStarted(false);
  };

  const startGame = (color: string) => {
    const isWhite = color === "white" ? true : false;
    setGame({
      isWhite: isWhite,
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
    });
    if (isWhite) {
      setBoard(JSON.parse(JSON.stringify(startingBoardWhite)));
    } else {
      setBoard(JSON.parse(JSON.stringify(startingBoardBlack)));
    }
    setAvailableBoard(startingAvailableBoard.slice());
    setselectedPiece({ x: 0, y: 0, piece: "" });
    setSelectedPosition({ x: 0, y: 0, piece: "" });
    setSwitchPosition(false);
    setIsOver(false);
    setHasStarted(true);
  };

  return (
    <div className="">
      {hasStarted && (
        <PlayerScore isWhite={game.isWhite} name={"Opponent"} board={board} />
      )}
      {hasStarted &&
        board.map((row: any, rowIndex: any) => (
          <div
            key={rowIndex + 1}
            className={`w-full h-[100px] flex flex-row ${
              isOver ? "opacity-50" : "opacity-100"
            }`}
          >
            {row.map((col: any, colIndex: any) => (
              <div
                key={(colIndex + 1) * (rowIndex + 1)}
                onClick={(e) =>
                  getMousePosition(e, { x: colIndex, y: rowIndex })
                }
                className={`w-[100px] h-full flex justify-center items-center ${
                  (rowIndex + colIndex) % 2 === 0
                    ? "bg-[#fff8ed]"
                    : "bg-[#be760a]"
                }`}
              >
                <ChessPiece
                  letter={col}
                  isAvailable={availableBoard[rowIndex][colIndex]}
                  turn={game.turn}
                />
              </div>
            ))}
          </div>
        ))}
      {hasStarted && (
        <PlayerScore isWhite={!game.isWhite} name={"Me"} board={board} />
      )}
      {isOver && (
        <EndGameModal
          turn={game.turn % 2}
          replayGame={replayGame}
          stopGame={stopGame}
          isDraw={isDraw}
        />
      )}
      <StartingMenu hasStarted={hasStarted} startGame={startGame} />
    </div>
  );
};

export default ChessBoard;
