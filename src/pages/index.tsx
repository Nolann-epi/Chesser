import Layout from "@/components/Layout";
import ChessBoard from "@/components/ChessBoard";
import { Game } from "@/interfaces/Chess";
import { useState } from "react";

export default function Home() {
  const [game, setGame] = useState<Game>({
    isWhite: true,
    turn: 0,
    enPassant: [0, 0, 0, 0, 0, 0, 0, 0],
    isCheck: false,
    isCheckMate: false,
    playerBlack: {
      hasMovedGrandRook: false,
      hasMovedKing: false,
      hasMovedPetitRook: false,
      score: 0,
    },
    playerWhite: {
      hasMovedGrandRook: false,
      hasMovedKing: false,
      hasMovedPetitRook: false,
      score: 0,
    },
  });
  return (
    <Layout game={game}>
      <ChessBoard game={game} setGame={setGame} />
    </Layout>
  );
}
