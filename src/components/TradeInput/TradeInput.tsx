import style from "./TradeInput.module.css"
import {UsdtIcon} from "@/components/UsdtIcon.tsx";

export type Currency = "TERRA" | "USDT";


interface TradeInputProps {
  value: string,
  currency: Currency,
  isShowingResult?: boolean
}

export function TradeInput({value, currency, isShowingResult}: TradeInputProps) {
  const coefficient = !isShowingResult ? 1 : currency === "TERRA" ? 0.5 : 2

  return (
    <div className={style.inputWrapper}>
      <div className={style.inputBox}>
        <div className={style.input}>
          {parseFloat(value) * coefficient}
        </div>
        {/*<div className={style.valuePreview}>*/}
        {/*   {(parseFloat(enterValue) * (enterCurrency !== "TERRA" ? 1 : 2)).toFixed(2)}$*/}
        {/*</div>*/}
      </div>
      <div className={style.inputBadge}>
        {currency === "USDT" ? <UsdtIcon/> : null}
        {currency}
      </div>
    </div>
  );
}
