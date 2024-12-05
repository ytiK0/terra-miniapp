import {UserWallet} from "@/state/appState.ts";

export interface UserBackend {
  id: number
  telegramId: string
  name: string
  link: string
  coins: number
  level: number
  referId: number
  createdAt: Date
}

export async function getUserWallet(id: string) {
  const params = new URLSearchParams({
    tgId: id
  })
  const response = await fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/findOneByTg?${params.toString()}`);
  const resJson: UserBackend = await response.json();
  if (resJson.coins === undefined) {
    throw new Error("Request failed") ;
  }
  return { usdt: 0, terroCoins: resJson.coins } as UserWallet;
}