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
  coins: string
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

function parseFloatToFixed(string: string, fractionDigits: number) {
  return parseFloat(parseFloat(string).toFixed(fractionDigits));
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

      const usdt = parseFloatToFixed(resJson.usdt, 2);
      const terroCoins = parseFloatToFixed(resJson.coins, 2);
      const earnedUsdt = parseFloatToFixed(resJson.earnedUsdt, 2);
      const depositedUsdt = parseFloatToFixed(resJson.depositedUsdt, 2);
      const todayProfit = parseFloat((usdt * (resJson.previousDayProfit?.percent || 0)).toFixed(2));
      return { usdt, terroCoins, earnedUsdt, depositedUsdt, todayProfit };
    });


}