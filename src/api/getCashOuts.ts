import {UserBackend} from "@/api/getUserWallet.ts";

interface CashOut {
  "id": number
  "transferId":number
  "amount": string
  "completedAt": string
  "asset": string
  user: UserBackend
}

export async function getCashOuts() {
  const res = await fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/cash-out/findAll`);

  const resJson = await res.json();

  if (!res.ok) {
    throw resJson;
  }

  return resJson as CashOut[];
}