//Import components
import Sidebar from "../components/Sidebar";
import MainPage from "../components/MainPage";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

export default function Home() {
  return (
    <div className="main-app">
      <main>
        <Sidebar />
        <MainPage />
      </main>
      <div className="player-container">
        <Player />
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
