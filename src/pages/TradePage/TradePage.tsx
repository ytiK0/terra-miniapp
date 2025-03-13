import {Page} from "@/components/Page.tsx";

import style from "./TradePage.module.css"
import {useCallback} from "react";
import {ArrowUpArrowDown} from "@gravity-ui/icons";
import {TradeInput} from "@/components/TradeInput/TradeInput.tsx";
import {useAppStore} from "@/state/appState.ts";
import {useNumpad} from "@/hooks/useNumpad.ts";
import {Numpad} from "@/components/Numpad/Numpad.tsx";
import {useWarning} from "@/hooks/useWarning.ts";
import {BalanceWarning} from "@/components/BalanceWarning/BalanceWarning.tsx";
import {makeExchange} from "@/api/makeExchange.ts";
import {initData, useSignal} from "@telegram-apps/sdk-react";
import {useProcess} from "@/hooks/useProcess.ts";
import {ProcessStatusModal} from "@/components/ProcessStatusModal/ProcessStatusModal.tsx";


export function TradePage() {
  const user = useSignal(initData.user);
  const { usdt, terroCoins } = useAppStore((s) => s.userWallet);
  const setUserWallet = useAppStore((s) => s.setUserWallet);
  const [enterValue, handleNumpadBtnClick] = useNumpad();
  const [isWarningVisible, toggleVisible] = useWarning(1500);

  const [status, startProcess] = useProcess()

  if (user === undefined) {
    throw new Error("Invalid user")
  }

  const handleConfirmClick = useCallback(async () => {
    const value = parseFloat(enterValue);
    if (value === 0) {
      toggleVisible();
      return;
    }

    if (value > usdt) {
      toggleVisible();
    } else {
      const updatedWallet = await startProcess(makeExchange(user.id.toString(), value));

      setUserWallet({...updatedWallet, todayProfit: parseFloat((updatedWallet.usdt * (updatedWallet.todayProfit?.percent || 0)).toFixed(2)) });
    }
  }, [enterValue, usdt, terroCoins]);

  return (
    <Page back={true}>
      <header className={style.header}>
        Trade
      </header>
      <section className={style.inputSection}>
        <TradeInput value={enterValue} currency={"USDT"}/>
        <TradeInput value={parseFloat(enterValue) * 0.5} currency={"TERRA"}/>

        <div className={style.arrowsContainer}>
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
      <BalanceWarning hidden={isWarningVisible} onClose={() => {}} />
      <ProcessStatusModal status={status} />
    </Page>
  );
}
