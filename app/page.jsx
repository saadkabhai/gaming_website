import { WebsiteURL } from "@/Components/BASEURL";
import HomeComponent from "@/Components/HomeComponent";
import Head from "./AdsenseMetaTags";

async function Top3Players() {
  const Top3playersres = await fetch(`${WebsiteURL}/api/getTop3users`),
    Top3players = await Top3playersres.json()
  return Top3players.Top3
}
export const metadata = {
  title: "Play2Win - Free Skill-Based Gaming Platform",
  description: "Play2Win is a free gaming platform where players compete in skill-based games to earn rewards. Top 3 players win cash prizes every month!"
};
export default async function Home() {
  const getTop3Players = await Top3Players()
  return (
    <>
      <Head />
      <HomeComponent Top3players={getTop3Players} />
    </>
  );
}
