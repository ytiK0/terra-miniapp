import style from "./DealHistoryPage.module.css";

import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";
import {useEthPrice} from "@/hooks/useEthPrice.ts";
import {Badge} from "@/components/Badge/Badge.tsx";
import {useLoading} from "@/hooks/useLoading.ts";
import {getLastExecuted} from "@/api/getLastExecuted.ts";
import {Spinner} from "@telegram-apps/telegram-ui";
import {getETHData} from "@/api/getEthPrice.ts";
import {ArrowUp} from "@gravity-ui/icons";
import SuccessArrow from "@/components/SuccessArrow.tsx";

export function DealHistoryPage() {
  const ethPrice = useEthPrice();
  const [isLoading, deals] = useLoading(getLastExecuted);
  const [isDataLoading, ethData] = useLoading(getETHData);


  return (
    <Page back={true}>
      <header>
        <Logo />
        <h2 className={style.headerSubtitle}>History <span>24H</span></h2>
      </header>
      <section>
        <div className={style.activeDealSection}>
          <span>Active Deal</span>
          <div className={style.dealContainer}>
            <Badge className={style.ethPriceBadge}>ETH {ethPrice}$</Badge>
            <div className={style.processSign}>
                Process
            </div>
          </div>
        </div>
      </section>
      <section className={style.completedDealsSection}>
        <h3 className={style.completedDealsSectionHeading}>Completed Transactions</h3>
        <div className={style.completedDealsWrapper}>
          {
            isLoading && isDataLoading && ethData === undefined ? <Spinner size={"l"} /> :
              (deals || []).map((deal, i) => {
                if (ethData === undefined) {
                  throw new Error("Eth data is undefined")
                }


                return (
                  <div className={style.dealWrapper} key={deal.id}>
                    <div className={style.dealDate}>
                      {`01.01`} {`00:00`}
                    </div>
                    <div className={style.dealBox}>
                      <span className={style.dealActualPrice}><span style={{color: "white"}}>ETH</span> {parseFloat(ethData[i].open)}$</span>
                      <div className={style.dealResultBox}>
                        {
                          deal.profitPercent < 0 ?
                          <div className={style.failResultBox}>Failure {deal.profitPercent}% <ArrowUp className={style.failArrow} /></div>
                            :
                            <div className={style.successResultBox}>
                              <span>Success</span>
                              <span className={style.percent}>{deal.profitPercent}%</span>
                              <SuccessArrow className={style.successArrow} />
                            </div>
                        }
                      </div>
                    </div>
                  </div>
                )
                }
              )
          }
        </div>
      </section>
    </Page>
  );
}
