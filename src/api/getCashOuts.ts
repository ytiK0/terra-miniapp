import {UserBackend} from "@/api/getUserWallet.ts";

interface CashOut {
  "id": number
  "transferId":number
  "amount": string
  "completedAt": string
  "asset": string
  user: UserBackend
}

export async function getCashOuts(signal?:AbortSignal) {
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/cash-out/findAll`, {signal})
    .then((res) => {
      return res.json() as Promise<CashOut[]>;
    })
}