export async function makeExchange(tgId: string, usdt: number) {
  const params = new URLSearchParams({
    tgId,
    usdt: usdt.toString()
  })

  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/exchange?${params.toString()}`)
    .then((res) => res.json() as Promise<{ terroCoins: number, usdt: number}>);
}