import {Page} from "@/components/Page.tsx";

import style from "./ManipulateBalance.module.css"
import { TradeInput } from "@/components/TradeInput/TradeInput.tsx";
import {Numpad} from "@/components/Numpad/Numpad.tsx";
import {useNumpad} from "@/hooks/useNumpad.ts";
import {useWarning} from "@/hooks/useWarning.ts";
import {useCallback, useState} from "react";
import {useAppStore} from "@/state/appState.ts";
import {AlreadyHasPaymentWarning, BalanceWarning} from "@/components/BalanceWarning/BalanceWarning.tsx";
import {initData, openTelegramLink, useSignal} from "@telegram-apps/sdk-react";
import {createTransaction} from "@/api/createTransaction.ts";
import {getTransactionStatus} from "@/api/getTransactionStatus.ts";
import {createWithdraw} from "@/api/createWithdraw.ts";
import {useProcess} from "@/hooks/useProcess.ts";
import {ProcessStatusModal} from "@/components/ProcessStatusModal/ProcessStatusModal.tsx";

const prepareAmountToSend = (amount: number) => (Math.floor(amount * 1000) / 1000).toFixed(3);

function ManipulateBalance({type}: {type: "receive"|"send"}) {
  const {usdt} = useAppStore((s) => s.userWallet);
  const user = useSignal(initData.user);
  const [enterValue, handleNumpadBtnClick] = useNumpad();
  const [isBalanceWarningVisible, toggleWarning] = useWarning(1500);
  const [isPaymentWarningVisible, togglePayment] = useWarning(null);
  const [lostPayUrl, setLostPatUrl] = useState<string | null>(null);

  const [status, startProcess] = useProcess();

  if (user === undefined) {
    throw new Error("Invalid User")
  }

  const handelSend= useCallback( async () => {
    const value = parseFloat(enterValue);
    if (value === 0) {
      toggleWarning();
      return;
    }

    console.log(value, usdt);
    if (value > usdt) {
      toggleWarning();
    }
    else {
      const amount = prepareAmountToSend(value);
      await startProcess(createWithdraw(user.id, amount));
    }
  }, [enterValue]);

  const handelReceive = useCallback(async () => {
    const value = parseFloat(enterValue);
    if (value === 0) {
      toggleWarning();
      return;
    }

    const transactionStatus = await getTransactionStatus(user.id.toString());

    if (transactionStatus.status === "active") {
      setLostPatUrl(transactionStatus.payUrl);
      togglePayment();
      return;
    }

    const {payUrl} = await startProcess(createTransaction(user.id, enterValue));

    if (openTelegramLink.isAvailable()) {
      openTelegramLink(payUrl);
    }
    else {
      throw new Error("can`t open telegram link");
    }

  }, [enterValue]);

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
      <BalanceWarning hidden={isBalanceWarningVisible} currency={"USDT"} />
      <AlreadyHasPaymentWarning hidden={isPaymentWarningVisible} payUrl={lostPayUrl} />
      <ProcessStatusModal status={status} />
    </Page>
  );
}

export function ReceiveUsdtPage() {
  return <ManipulateBalance type={"receive"} />
}

export function SendUsdtPage() {
  return <ManipulateBalance type={"send"} />
}
