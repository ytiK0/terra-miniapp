export function getEthPrice() {
  return fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&sign=true")
    .then((res) => res.json())
    .then((json: {USD: string}) => json)
    .catch(() => {
      throw new Error("canot get eth price")
    })
}