import { Game } from "@/interfaces/Chess";

interface LayoutProps {
  children: React.ReactNode;
  game: Game;
}

export default function Layout({ children, game }: any) {
  console.log(game);
  return (
    <div className="w-screen h-screen flex bg-gray-800 justify-around items-center flex-row gap-5">
      <div className="text-white text-xl flex flex-col text-center">
        <div>Tour {game.turn}</div>
        {game.turn % 2 == 0 ? (
          <div>White to play</div>
        ) : (
          <div>Black to play</div>
        )}
      </div>
      <div className="w-[800px] h-[800px] bg-red-400">{children}</div>
    </div>
  );
}
