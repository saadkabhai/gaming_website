import { WebsiteURL } from '@/Components/BASEURL';
import EncryptText from '@/Components/encryptText';
import LeaderboadrComponent from '@/Components/LeaderboadrComponent'
import { cookies } from 'next/headers';
import React from 'react'
async function GetLeaderboard() {
  const Leaderboardres = await fetch(`${WebsiteURL}/api/getLeaderboard`),
    Leaderboard = await Leaderboardres.json()
  return Leaderboard.Leaderboard
}
export const metadata = {
  title: "Leader Board"
};
export default async function page() {
  const cookieStore = cookies();
  const Username = EncryptText.get(cookieStore.get('Username')?.value || null);
  const status = EncryptText.get(cookieStore.get('status')?.value || null);
  const getleaderboard = await GetLeaderboard()
  return (
    <div><LeaderboadrComponent Leaderboard={getleaderboard} Username={Username} Status={status} /></div>
  )
}
