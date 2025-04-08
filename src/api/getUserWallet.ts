import {UserWallet} from "@/state/appState.ts";
import {mapUserToWallet} from "@/helpers/mapUserToWallet.ts";

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

      return mapUserToWallet(resJson);
    });


}