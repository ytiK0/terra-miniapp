import {useEffect, useState} from "react";
import {getEthPrice} from "@/api/getEthPrice.ts";

export function useEthPrice() {
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  async function loadEthPrice () {
    const usd = (await getEthPrice()).USD
    setEthPrice(parseInt(usd))
  }

  useEffect(() => {
    loadEthPrice().then()
    const interval = setInterval(loadEthPrice, 60 * 1000)

    return () => clearInterval(interval)
  }, []);

  return ethPrice;
}