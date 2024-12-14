export async function makeExchange(tgId: string, usdt: number) {
  const params = new URLSearchParams({
    tgId,
    usdt: usdt.toString()
  })

  const res = await fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/exchange?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Can not to exchange")
  }

  const resJson = await res.json();

  return {terroCoins: resJson, usdt: resJson.usdt};
}