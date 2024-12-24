export async function getEthPrice() {
  return fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&sign=true")
    .then((res) => res.json() as Promise<{ETH: string}>)
    .catch(() => {
      throw new Error("canot get eth price")
    })
}