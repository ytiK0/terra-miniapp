import {UserWallet} from "@/state/appState.ts";

export interface UserBackend {
  id: number
  telegramId: string
  name: string
  link: string
  coins: number
  usdt: number
  level: number
  referId: number
  createdAt: Date
  photoURL: string
}

export async function getUserWallet(id: string) {
  const params = new URLSearchParams({
    tgId: id
  })
  const res = await fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/findOneByTg?${params.toString()}`);

  const resJson = await res.json();

  if (resJson.coins === undefined) {
    throw resJson;
  }
  return { usdt: resJson.usdt, terroCoins: resJson.coins } as UserWallet;
}