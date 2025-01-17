import {UserWallet} from "@/state/appState.ts";

export interface Profit {
  date: string,
  percent: number
}

export interface UserBackend {
  id: number
  telegramId: string
  name: string
  link: string
  coins: number
  usdt: number
  depositedUsdt: number
  earnedUsdt: number
  level: number
  referId: number
  createdAt: Date
  photoURL: string
  todayProfit: Profit | null
}

export async function getUserWallet(id: string, signal?: AbortSignal): Promise<UserWallet> {
  const params = new URLSearchParams({
    tgId: id
  })
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/findOneByTg?${params.toString()}`, {signal})
    .then((res) => res.json() as Promise<UserBackend>)
    .then((resJson) => {
      if (resJson.coins === undefined) {
        throw resJson;
      }
      return { usdt: resJson.usdt, terroCoins: resJson.coins, earnedUsdt: resJson.earnedUsdt, depositedUsdt: resJson.depositedUsdt };
    });


}