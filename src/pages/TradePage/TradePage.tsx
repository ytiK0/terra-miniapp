import {Page} from "@/components/Page.tsx";

import style from "./TradePage.module.css"
import {useState} from "react";

type Currency = "TERRA" | "USDT";

export function TradePage() {
  const [enterCurrency, setEnterCurrency] = useState<Currency>("TERRA")

  return (
    <Page back={true}>
      <header className={style.header}>
        Trade
      </header>
      <section className={style.inputWrapper}>
        <div className={style.input}></div>
        <div className={style.result}></div>
      </section>
      <section className={style.exchangeRateSectiom}>
        
      </section>
      <section className={style.numpad}>

      </section>
    </Page>
  );
}
