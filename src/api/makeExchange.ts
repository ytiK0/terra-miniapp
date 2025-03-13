import {Profit} from "@/api/getUserWallet.ts";

export async function makeExchange(tgId: string, usdt: number) {
  const params = new URLSearchParams({
    tgId,
    usdt: usdt.toString()
  })

  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/exchange?${params.toString()}`)
    .then((res) => res.json() as Promise<{ todayProfit: Profit | null, terroCoins: number, usdt: number, depositedUsdt: number, earnedUsdt: number, error?: string}>)
    .then((json) => {
      if (json.error !== undefined) {
        throw json as {error: string};
      }

      return json;
    });
}