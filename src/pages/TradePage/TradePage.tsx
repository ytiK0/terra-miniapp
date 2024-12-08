import {Page} from "@/components/Page.tsx";

import style from "./TradePage.module.css"
import {useCallback, useState} from "react";
import {ArrowUpArrowDown} from "@gravity-ui/icons";
import {Currency, TradeInput} from "@/components/TradeInput/TradeInput.tsx";
import {useAppStore} from "@/state/appState.ts";
import {useNumpad} from "@/hooks/useNumpad.ts";
import {Numpad} from "@/components/Numpad/Numpad.tsx";
import {useWarning} from "@/hooks/useWarning.ts";
import {BalanceWarning} from "@/components/BalanceWarning/BalanceWarning.tsx";


function getOppCurrency(currency: Currency): Currency {
  if (currency === "TERRA") {
    return "USDT"
  }
  return "TERRA"
}

export function TradePage() {
  const { usdt, terroCoins } = useAppStore((s) => s.userWallet)
  const [enterCurrency, setEnterCurrency] = useState<Currency>("TERRA");
  const [enterValue, handleNumpadBtnClick] = useNumpad();
  const [isWarningVisible, toggleVisible] = useWarning()

  const toggleCurrency = useCallback(() => {
    setEnterCurrency((currency) => {
      return getOppCurrency(currency)
    })
  }, []);

  const handleConfirmClick = useCallback(() => {
    const value = parseFloat(enterValue);
    if (value === 0) {
      toggleVisible()
      return
    }

    if (enterCurrency === "USDT") {
      if (value > usdt) {
        toggleVisible()
      }
      else {
        // make request
      }
    }
    else {
      if (value > terroCoins) {
        toggleVisible()
      }
      else {
        // make request
      }
    }
  }, [])

  return (
    <Page back={true}>
      <header className={style.header}>
        Trade
      </header>
      <section className={style.inputSection}>
        <TradeInput value={enterValue} currency={enterCurrency}/>
        <TradeInput value={enterValue} currency={getOppCurrency(enterCurrency)} isShowingResult/>

        <div className={style.arrowsContainer} onClick={toggleCurrency}>
          <ArrowUpArrowDown className={style.arrows}/>
        </div>
      </section>
      <section className={style.exchangeRateSection}>
        <div className={style.line}></div>
        <span>1 Terra - 0.5 USDT</span>
      </section>
      <section className={style.numpadWrapper}>
        <Numpad onBtnClick={handleNumpadBtnClick}/>
        <div className={style.confirmBtn} onClick={handleConfirmClick}>CONFIRM THE EXCHANGE</div>
      </section>
      <BalanceWarning hidden={isWarningVisible} currency={enterCurrency} />
    </Page>
  );
}
