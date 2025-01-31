import style from "./BalanceWarning.module.css";
import {CircleExclamationFill} from "@gravity-ui/icons";
import {PropsWithChildren, useCallback} from "react";
import {openTelegramLink} from "@telegram-apps/sdk-react";

interface WarningProps {
  hidden: boolean,
  message?: string
}

function Warning({ hidden, children }: PropsWithChildren<WarningProps>) {
  return (
    <div className={style.warning} hidden={!hidden}>
      { children }
    </div>
  );
}

export function BalanceWarning({hidden, message}: WarningProps) {
  const DEFAULT_MESSAGE = "Not enough USDT";

  return (
    <Warning hidden={hidden}>
      <CircleExclamationFill width={20} height={20}/>
      <div>
        { message || DEFAULT_MESSAGE }
      </div>
    </Warning>
  );
}

export function AlreadyHasPaymentWarning ({hidden, payUrl}: WarningProps & {payUrl: string | null}) {
  const handleClick = useCallback(() => {
    if (payUrl === null) {
      throw new Error("Something went wrong")
    }

    console.log(payUrl)

    if (openTelegramLink.isAvailable()) {
      openTelegramLink(payUrl);
    }
    }, [payUrl])

  return (
    <Warning hidden={hidden}>
      <CircleExclamationFill width={20} height={20}/>
      <div>
        You already have payment
        <br/>
        please pay it before make new and refresh the page
      </div>
      <button type={"button"} style={{border: "none", borderRadius: 8, padding: "10px 30px", cursor: "pointer", marginTop:5}} onClick={handleClick}>Pay</button>
    </Warning>
  );
}
