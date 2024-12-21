import style from "./ActiveDeal.module.css";
import {Badge} from "@/components/Badge/Badge.tsx";

export default function ActiveDeal({ethPrice}: {ethPrice: string | number}) {
  return (
    <div className={style.dealContainer}>
      <Badge className={style.ethPriceBadge}>ETH {ethPrice}$</Badge>
      <div className={style.dealProcessWrapper}>
        <span>
          process
        </span>
        <div className={style.circleContainer}>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
        </div>
      </div>
    </div>
  );
}
