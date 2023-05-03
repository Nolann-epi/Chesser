import { Game } from "@/interfaces/Chess";

interface LayoutProps {
  children: React.ReactNode;
  game: Game;
}

export default function Layout({ children, game }: LayoutProps) {
  return (
    <div className="w-screen h-screen flex bg-gray-600 justify-around flex-row gap-5 items-center">
      <div className="text-white text-xl flex flex-col items-center  w-1/3 h-[300px] justify-between">
        <div className="text-7xl">Chesser</div>
        <div className="text-2xl">Tour {game.turn}</div>
        {game.turn % 2 == 0 ? (
          <div className="text-2xl">White to play</div>
        ) : (
          <div className="text-2xl"> Black to play</div>
        )}
        {game.isCheck ? <div className="text-2xl">Check ! </div> : <div></div>}
      </div>
      <div className="w-[800px] h-full">{children}</div>
    </div>
  );
}
