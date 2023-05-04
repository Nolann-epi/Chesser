import React from "react";
import { AiFillGithub } from "react-icons/ai";

const GithubButton = () => {
  return (
    <div
      className=" flex-row w-48 py-2 px-4 space-x-4 items-center flex text-white cursor-pointer hover:bg-black rounded-lg my-1"
      onClick={() =>
        window.open("https://github.com/Nolann-epi/Chesser", "_blank")
      }
    >
      <AiFillGithub size={40} className="cursor-pointer text-white" />
      <div className="text-xl text-white ">Nolann-epi</div>
    </div>
  );
};

export default GithubButton;
