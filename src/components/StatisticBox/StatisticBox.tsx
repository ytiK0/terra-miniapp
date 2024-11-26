import "./StatisticBox.css"
import {PropsWithChildren} from "react";

export function StatisticBox({ children }:PropsWithChildren) {
  return (
    <div className={"statistic-box"}>
      {children}
    </div>
  );
}
