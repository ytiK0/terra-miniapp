export async function getEthPrice() {
  return fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&sign=true")
    .then((res) => res.json() as Promise<{USD: string}>)
    .catch(() => {
      throw new Error("canot get eth price")
    })
}

type Candle = [number, string, string, string];
export type EthData = {time: number, open: string};

export async function getETHData(signal?: AbortSignal) {
  const end = Date.now();
  const start = end - 6 * 60 * 60 * 1000;

  const url = `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&startTime=${start}&endTime=${end}&timeZone=3`;

  return fetch(url, { signal})
    .then((res) => res.json() as Promise<Candle[]>)
    .then((ethData: Candle[]) => {
       return ethData.map((candle: Candle) => ({
          time: candle[0],
          open: parseFloat(candle[3]).toFixed(2),
        }) as EthData
      ).reverse()
    });
}