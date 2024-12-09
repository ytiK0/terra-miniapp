import {Page} from "@/components/Page.tsx";

import style from "./ManipulateBalance.module.css"
import { TradeInput } from "@/components/TradeInput/TradeInput.tsx";
import {Numpad} from "@/components/Numpad/Numpad.tsx";
import {useNumpad} from "@/hooks/useNumpad.ts";
import {useWarning} from "@/hooks/useWarning.ts";
import {useCallback} from "react";
import {useAppStore} from "@/state/appState.ts";
import {BalanceWarning} from "@/components/BalanceWarning/BalanceWarning.tsx";
import {initData, openTelegramLink, useSignal} from "@telegram-apps/sdk-react";
import {createTransaction} from "@/api/createTransaction.ts";

function ManipulateBalance({type}: {type: "receive"|"send"}) {
  const {usdt} = useAppStore((s) => s.userWallet)
  const user = useSignal(initData.user)
  const [enterValue, handleNumpadBtnClick] = useNumpad()
  const [isWarningVisible, toggleWarning] = useWarning()

  if (user === undefined) {
    throw new Error("Invalid User")
  }

  const handelSend= useCallback(() => {
    const value = parseFloat(enterValue);
    if (value === 0) {
      toggleWarning()
      return
    }

    if (value > usdt) {
      toggleWarning()
    }
    else {
      // make request
    }
  }, [])

  const handelReceive = useCallback(async () => {
    const value = parseFloat(enterValue);
    console.log(value)
    if (value === 0) {
      toggleWarning()
      return
    }

    const {payUrl} = await createTransaction(user.id, enterValue)

    if (openTelegramLink.isAvailable()) {
      openTelegramLink(payUrl)
    }
    else {
      throw new Error("can`t open telegram link (")
    }

  }, [enterValue])

  return (
    <Page back={true}>
      <header className={style.header}>
        {type == "receive" ? "Receive" : "Send"}
        <br/>
        USDT
      </header>
      <section className={style.inputSection}>
        <TradeInput value={enterValue} currency={"USDT"}/>
      </section>
      <section className={style.numpadWrapper}>
        <Numpad onBtnClick={handleNumpadBtnClick}/>
        <div className={style.confirmBtn} onClick={type === "receive" ? handelReceive : handelSend}>CONFIRM</div>
      </section>
      <BalanceWarning hidden={isWarningVisible} currency={"USDT"} />
    </Page>
  );
}

export function ReceiveUsdtPage() {
  return <ManipulateBalance type={"receive"} />
}

export function SendUsdtPage() {
  return <ManipulateBalance type={"send"} />
}
