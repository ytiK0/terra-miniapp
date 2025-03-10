import style from "./BalanceWarning.module.css";
import {CircleExclamationFill, XmarkShapeFill} from "@gravity-ui/icons";
import {PropsWithChildren, useCallback} from "react";
import {openTelegramLink} from "@telegram-apps/sdk-react";

interface WarningProps {
  hidden: boolean,
  onClose: () => void
  message?: string
}

function Warning({ hidden, children, onClose }: PropsWithChildren<WarningProps>) {
  console.log(hidden)
  return (
    <div className={style.warning} hidden={!hidden}>
      <span>Sorry</span>
      <div style={{backgroundColor: "#F89007", height: 7, borderRadius: 20}}></div>
      <div className={style.warningMessageWrapper}>
        { children }
      </div>
      <div className={style.closeBtn} onClick={onClose}>
        <div style={{borderRadius: "50%", backgroundColor: "#F89007", width:  40, height:  40, display: "flex", justifyContent: "center", alignItems: "center"}} >
          <div style={{borderRadius: "50%", backgroundColor: "#D6D6D6", width: 35, height: 35, display: "flex", justifyContent: "center", alignItems: "center"}} >
            <div style={{borderRadius: "50%", backgroundColor: "#232527", width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center"}} >
              <XmarkShapeFill width={25} height={25} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function BalanceWarning({hidden, message, onClose}: WarningProps) {
  const DEFAULT_MESSAGE = "Not enough USDT";

  return (
    <Warning hidden={hidden} onClose={onClose}>
      <CircleExclamationFill width={20} height={20}/>
      <div>
        { message || DEFAULT_MESSAGE }
      </div>
    </Warning>
  );
}

export function AlreadyHasPaymentWarning ({hidden, payUrl, onClose}: WarningProps & {payUrl: string | null}) {
  const handleClick = useCallback(() => {
    if (payUrl === null) {
      onClose()
      throw new Error("Something went wrong")
    }

    console.log(payUrl)

    if (openTelegramLink.isAvailable()) {
      openTelegramLink(payUrl);
    }
    }, [payUrl])

  return (
    <Warning hidden={hidden} onClose={onClose}>
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
