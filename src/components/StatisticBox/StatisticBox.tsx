import "./StatisticBox.css"
import {PropsWithChildren} from "react";

export function StatisticBox({ children, className }:PropsWithChildren<{className?: string}>) {
  return (
    <div className={[className, "statistic-box"].filter((e) => e).join(" ")}>
      {children}
    </div>
  );
}
