import {UserBackend} from "@/api/getUserWallet.ts";

interface CashOut {
  "id": number
  "transferId":number
  "amount": string
  "completedAt": string
  "asset": string
  user: UserBackend
}

export async function getCashOuts(page:number, limit: number, signal?:AbortSignal) {
  const params = new URLSearchParams({
    page: page.toString(), limit: limit.toString()
  })

  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/cash-out/findAll?${params.toString()}`, {signal})
    .then((res) => {
      return res.json() as Promise<CashOut[]>;
    })
}