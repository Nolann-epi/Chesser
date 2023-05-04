import React, { useEffect, useState } from "react";
import {
  startingBoardWhite,
  startingBoardBlack,
  startingAvailableBoard,
  defaultGame,
} from "../models/Boards";
import { Square, MousePos, Game } from "../interfaces/Chess";
import {
  checkValidMoves,
  getAvailabilty,
  getPiece,
  hasAvailableMoves,
} from "../utils/getFunction";
import StartingMenu from "./StartingMenu";
import EndGameModal from "./EndGameModal";
import PlayerScore from "./PlayerScore";
import PromoteModal from "./PromoteModal";
import Board from "./Board";
import { enPassantDeletePawn, setEnPassant } from "@/utils/enPassant";
import { castling } from "@/utils/castling";
import { checkForCheck } from "@/utils/check";

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
  const [isPromote, setIsPromote] = useState<boolean>(false);
  const [promotePiece, setPromotePiece] = useState<string>("");

  const resetAvailableBoard = () => {
    for (let y = 0; y < availableBoard.length; y++) {
      for (let x = 0; x < availableBoard[y].length; x++) {
        availableBoard[y][x] = false;
      }
    }
  };

  const handleSwitchPosition = () => {
    const newBoard = board.slice();
    const playerWhite = game.playerWhite;
    const playerBlack = game.playerBlack;
    let castle = false;
    let promote = false;
    castling(
      newBoard,
      castle,
      playerWhite,
      playerBlack,
      selectedPiece,
      selectedPosition,
      game
    );
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

    setBoard(newBoard);
    setSelectedPosition({ x: 0, y: 0, piece: "" });
    setselectedPiece({ x: 0, y: 0, piece: "" });
    setSwitchPosition(false);
    setPromotePiece("");
    setIsPromote(false);
    resetAvailableBoard();
    setEnPassant(
      selectedPiece,
      selectedPosition,
      game,
      playerBlack,
      playerWhite,
      setGame
    );
    checkForCheck(board, game, setGame, setIsOver, setIsDraw);
  };

  useEffect(() => {
    if (promotePiece !== "" && !isPromote) {
      handleSwitchPosition();
    }
    if (!switchPosition) return;
    handleSwitchPosition();
  }, [switchPosition, selectedPosition, game, promotePiece]);

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
        setIsPromote(false);
        setPromotePiece("");
        console.log("no available moves");
      }
    }
  };

  const resetState = () => {
    setAvailableBoard(startingAvailableBoard.slice());
    setselectedPiece({ x: 0, y: 0, piece: "" });
    setSelectedPosition({ x: 0, y: 0, piece: "" });
    setSwitchPosition(false);
  };

  const replayGame = () => {
    setGame({
      ...defaultGame,
      isWhite: game.isWhite ? false : true,
    });
    setBoard(
      JSON.parse(
        JSON.stringify(game.isWhite ? startingBoardBlack : startingBoardWhite)
      )
    );
    resetState();
    setIsOver(false);
  };

  const stopGame = () => {
    setGame(defaultGame);
    resetState();
    setHasStarted(false);
  };

  const startGame = (color: string) => {
    const isWhite = color === "white";
    setGame({
      ...defaultGame,
      isWhite: isWhite,
    });
    setBoard(
      JSON.parse(
        JSON.stringify(isWhite ? startingBoardWhite : startingBoardBlack)
      )
    );
    resetState();
    setIsOver(false);
    setHasStarted(true);
  };

  return (
    <div className="">
      {hasStarted && (
        <div>
          <PlayerScore isWhite={game.isWhite} name={"Opponent"} board={board} />
          <Board
            board={board}
            availableBoard={availableBoard}
            getMousePosition={getMousePosition}
            game={game}
            isOver={isOver}
          />
          <PlayerScore isWhite={!game.isWhite} name={"Me"} board={board} />
        </div>
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
      {isPromote && (
        <PromoteModal
          isWhiteToPlay={game.turn % 2 == 0}
          setPromoteChoice={setPromotePiece}
          setIsPromote={setIsPromote}
        />
      )}
    </div>
  );
};

export default ChessBoard;
