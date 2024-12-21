import style from "./TradeInput.module.css"
import {UsdtIcon} from "@/components/UsdtIcon.tsx";

export type Currency = "TERRA" | "USDT";


interface TradeInputProps {
  value: string | number,
  currency: Currency
}

export function TradeInput({value, currency}: TradeInputProps) {

  return (
    <div className={style.inputWrapper}>
      <div className={style.inputBox}>
        <div className={style.input}>
          {value}
        </div>
      </div>
      <div className={style.inputBadge}>
        {currency === "USDT" ? <UsdtIcon/> : null}
        {currency}
      </div>
    </div>
  );
}
