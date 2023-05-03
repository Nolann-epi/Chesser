import React, { useState } from "react";

interface PlayerScoreProps {
  isWhite: boolean;
  name: string;
}

const PlayerScore = ({ isWhite, name }: PlayerScoreProps) => {
  const array = [
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
    "P",
  ];

  const color = isWhite ? "W" : "B";

  return (
    <>
      <div className="flex flex-row h-[68px] items-center gap-3">
        <span className="text-white text-xl w-28">{name}</span>

        {array.map((value, index) => {
          const url = `url("../assets/chess/${value}${color}.png")`;
          const bgUrl = `bg-[${url}]`;
          return (
            <div
              key={index}
              className={` bg-blue-500 ${bgUrl} w-8 h-8 bg-no-repeat bg-center bg-cover`}
            />
          );
        })}
      </div>
    </>
  );
};

export default PlayerScore;
