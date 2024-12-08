import style from "./BalanceWarning.module.css";
import {CircleExclamationFill} from "@gravity-ui/icons";

export function BalanceWarning({hidden, currency}: {hidden: boolean, currency: string}) {
  return (
    <div className={style.warning} hidden={!hidden}>
      <CircleExclamationFill width={20} height={20}/>
      <div>
        not enough {currency}
      </div>
    </div>
  );
}
