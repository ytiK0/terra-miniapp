export async function getEthPrice() {
  return fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&sign=true")
    .then((res) => res.json() as Promise<{ETH: string}>)
    .catch(() => {
      throw new Error("canot get eth price")
    })
}

type Candle = [Date, string]

export async function getETHData(signal?: AbortSignal) {
  const now = Date.now();
  const threeHoursAgo = now - 24 * 60 * 60 * 1000;

  const url = `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&startTime=${threeHoursAgo}&endTime=${now}`;

  const response = await fetch(url, { signal });
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Ошибка: ' + JSON.stringify(data));
  }

  return data.map((candle: Candle) => ({
    time: candle[0],
    open: candle[1],
  })) as {time: Date, open: string}[];
}