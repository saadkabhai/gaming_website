import { WebsiteURL } from "@/Components/BASEURL";
import HomeComponent from "@/Components/HomeComponent";

async function Top3Players() {
  const Top3playersres = await fetch(`${WebsiteURL}/api/getTop3users`),
    Top3players = await Top3playersres.json()
  return Top3players.Top3
}
export const metadata = {
  title: "Home"
};
export default async function Home() {
  const getTop3Players = await Top3Players()
  return (
    <div>
      <HomeComponent Top3players={getTop3Players} />
    </div>
  );
}
