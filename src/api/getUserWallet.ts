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
  usdt: string
  depositedUsdt: string
  earnedUsdt: string
  level: number
  referId: number
  createdAt: Date
  photoURL: string
  todayProfit: Profit | null
  previousDayProfit: Profit | null
}

export interface User {
  name: string,
  photoURL: string
}

export async function getUserWallet(id: string, signal?: AbortSignal): Promise<UserWallet> {
  const params = new URLSearchParams({
    tgId: id
  })
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/findOneByTg?${params.toString()}`, {signal})
    .then((res) => res.json() as Promise<UserBackend>)
    .then((resJson) => {
      if (resJson.id === undefined) {
        throw resJson;
      }

      const usdt = parseFloat(resJson.usdt);
      const terroCoins = resJson.coins;
      const earnedUsdt = parseFloat(resJson.earnedUsdt);
      const depositedUsdt = parseFloat(resJson.depositedUsdt);
      const todayProfit = parseFloat((usdt * (resJson.previousDayProfit?.percent || 0)).toFixed(2));
      return { usdt, terroCoins, earnedUsdt, depositedUsdt, todayProfit };
    });


}