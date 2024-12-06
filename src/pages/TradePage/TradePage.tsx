import {Page} from "@/components/Page.tsx";

import style from "./TradePage.module.css"
import {MouseEventHandler, useCallback, useState} from "react";
import {ArrowUpArrowDown, Delete} from "@gravity-ui/icons";
import {Currency, TradeInput} from "@/components/TradeInput/TradeInput.tsx";


function getOppCurrency(currency: Currency): Currency {
  if (currency === "TERRA") {
    return "USDT"
  }
  return "TERRA"
}



export function TradePage() {
  const [enterCurrency, setEnterCurrency] = useState<Currency>("TERRA");
  const [enterValue, setEnterValue] = useState("0");

  const handleNumpadBtnClick = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
    // debugger
    const target = event.target as HTMLDivElement;

    const addPiece = target.dataset["numpadValue"];

    if (addPiece === undefined) {
      return;
    }

    console.log(addPiece);

    if (addPiece === "del") {
      setEnterValue((val) => {
        const poped = val.slice(0, -1);
        return poped.length !== 0 ? poped : "0";
      })
    }
    else if (addPiece === ".") {
        setEnterValue((val) => val.includes(".") ? val : val + ".");
    }
    else {
      setEnterValue((val) => {
        if (val === "0") {
          return addPiece;
        }
        else if (val.length + 1 <= 6 + +val.includes(".")) {
          return val + addPiece
        }
        else {
          return val
        }
      });
    }
  }, []);

  const toggleCurrency = useCallback(() => {
    setEnterCurrency((currency) => {
      return getOppCurrency(currency)
    })
  }, []);

  return (
    <Page back={true}>
      <header className={style.header}>
        Trade
      </header>
      <section className={style.inputSection}>
        <TradeInput value={enterValue} currency={enterCurrency} />
        <TradeInput value={enterValue} currency={getOppCurrency(enterCurrency)} isShowingResult={true} />

        <div className={style.arrowsContainer} onClick={toggleCurrency}>
          <ArrowUpArrowDown className={style.arrows} />
        </div>
      </section>
      <section className={style.exchangeRateSection}>
        <div className={style.line}></div>
        <span>1 Terra - 0.5 USDT</span>
      </section>
      <section className={style.numpadWrapper}>
        <div className={style.numpad}>
          {
            new Array(9).fill(0).map((_, i) => (
              <div
                key={i}
                className={style.numpadBtn}
                onClick={handleNumpadBtnClick}
                data-numpad-value={(i + 1).toString()}>
                {i + 1}
              </div>
            ))
          }
          <div className={style.numpadBtn} onClick={handleNumpadBtnClick} data-numpad-value={"."}>.</div>
          <div className={style.numpadBtn} onClick={handleNumpadBtnClick} data-numpad-value={"0"}>0</div>
          <div className={style.numpadBtn} onClick={handleNumpadBtnClick} data-numpad-value={"del"}>
            <Delete className={style.delIcon} data-numpad-value={"del"}/>
          </div>
        </div>
        <div className={style.confirmBtn}>CONFIRM THE EXCHANGE</div>
      </section>
    </Page>
  );
}
