import style from "./DealHistoryPage.module.css";

import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";
import {useEthPrice} from "@/hooks/useEthPrice.ts";
import {Badge} from "@/components/Badge/Badge.tsx";

export function DealHistoryPage() {
  const ethPrice = useEthPrice();

  return (
    <Page back={true}>
      <header>
        <Logo />
        <h2 className={style.headerSubtitle}>History <span>24H</span></h2>
      </header>
      <section className={style.activeDealSection}>
        <span>Active Deal</span>
        <div className={style.dealContainer}>
          <Badge className={style.ethPriceBadge}>ETH {ethPrice}$</Badge>
          <span>
            Process
          </span>
        </div>
      </section>
    </Page>
  );
}
