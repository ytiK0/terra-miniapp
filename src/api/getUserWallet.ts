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

export async function getUserWallet(id: string, signal?: AbortSignal) {
  const params = new URLSearchParams({
    tgId: id
  })
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/findOneByTg?${params.toString()}`, {signal})
    .then((res) => res.json())
    .then((resJson) => {
      if (resJson.coins === undefined) {
        throw resJson;
      }
      return { usdt: resJson.usdt, terroCoins: resJson.coins } as UserWallet;
    });


}