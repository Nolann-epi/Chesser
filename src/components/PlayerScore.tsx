import React from "react";

interface PlayerScoreProps {
  isWhite: boolean;
  name: string;
  board: string[][];
}

const PlayerScore = ({ isWhite, name, board }: PlayerScoreProps) => {
  const color = isWhite ? "W" : "B";
  const originalBoard = !isWhite
    ? [
        "Q",
        "R",
        "R",
        "B",
        "B",
        "N",
        "N",
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
      ]
    : [
        "q",
        "r",
        "r",
        "b",
        "b",
        "n",
        "n",
        "p",
        "p",
        "p",
        "p",
        "p",
        "p",
        "p",
        "p",
      ];
  const king = isWhite ? "K" : "k";
  const lettersInBoard = board
    .flat()
    .filter((value) => value !== "x" && value != king);
  const enemyLetters = lettersInBoard.filter((value) =>
    isWhite ? value !== value.toUpperCase() : value === value.toUpperCase()
  );
  const enemyPieces = originalBoard
    .map((value, index) => {
      if (enemyLetters.includes(value)) {
        enemyLetters.splice(enemyLetters.indexOf(value), 1);
        return "x";
      } else {
        return value;
      }
    })
    .map((value) => value.toUpperCase())
    .filter((value) => value !== "X");

  return (
    <>
      <div className="flex flex-row h-[68px] items-center gap-3">
        <span className="text-white text-xl w-28">{name}</span>

        {enemyPieces.map((value, index) => {
          const url = `url(/chess/${value}${color}.png`;
          return (
            <div
              key={index}
              style={{ backgroundImage: url }}
              className={`w-8 h-8 bg-no-repeat bg-center bg-cover`}
            />
          );
        })}
      </div>
    </>
  );
};

export default PlayerScore;
