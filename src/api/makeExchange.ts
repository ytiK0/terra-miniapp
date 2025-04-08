import {UserBackend} from "@/api/getUserWallet.ts";
import {UserWallet} from "@/state/appState.ts";
import {mapUserToWallet} from "@/helpers/mapUserToWallet.ts";

export async function makeExchange(tgId: string, usdt: number): Promise<UserWallet> {
  const params = new URLSearchParams({
    tgId,
    usdt: usdt.toString()
  })

  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/exchange?${params.toString()}`)
    .then((res) => res.json() as Promise<UserBackend>)
    .then((user) => {
      if ("error" in user) {
        throw user.error;
      }

      return mapUserToWallet(user);
    });
}