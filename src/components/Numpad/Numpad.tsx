import {MouseEventHandler} from "react";
import {Delete} from "@gravity-ui/icons";

import style from "./Numpad.module.css"

export function Numpad({onBtnClick}: {onBtnClick: MouseEventHandler<HTMLDivElement>}) {
  return (
    <div className={style.numpad}>
      {
        new Array(9).fill(0).map((_, i) => (
          <div
            key={i}
            className={style.numpadBtn}
            onClick={onBtnClick}
            data-numpad-value={(i + 1).toString()}>
            {i + 1}
          </div>
        ))
      }
      <div className={style.numpadBtn} onClick={onBtnClick} data-numpad-value={"."}>.</div>
      <div className={style.numpadBtn} onClick={onBtnClick} data-numpad-value={"0"}>0</div>
      <div className={style.numpadBtn} onClick={onBtnClick} data-numpad-value={"del"}>
        <Delete className={style.delIcon} data-numpad-value={"del"}/>
      </div>
    </div>
  );
}
