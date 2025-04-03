import {UserBackend} from "@/api/getUserWallet.ts";

export async function getTopUsers(signal?: AbortSignal) {
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/findTop`, {signal})
    .then((res) => res.json() as Promise<UserBackend[]>)
    .then((topList) => topList.map((user) => ({name: user.name, coins: +(+user.coins).toFixed(2), id: user.telegramId, photoURL: user.photoURL})));
}
