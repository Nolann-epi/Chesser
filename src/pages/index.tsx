/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import ChessBoard from "@/components/ChessBoard";
import { Game } from "@/interfaces/Chess";
import { useState } from "react";

export default function Home() {
  const [game, setGame] = useState<Game>({
    isWhite: false,
    turn: 0,
  });
  return (
    <Layout game={game}>
      <ChessBoard game={game} setGame={setGame} />
    </Layout>
  );
}
