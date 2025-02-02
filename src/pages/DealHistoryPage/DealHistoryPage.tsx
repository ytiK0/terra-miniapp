import style from "./DealHistoryPage.module.css";

import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";
import {useEthPrice} from "@/hooks/useEthPrice.ts";
import {Badge} from "@/components/Badge/Badge.tsx";
import {useLoading} from "@/hooks/useLoading.ts";
import {Deal, getLastExecuted} from "@/api/getLastExecuted.ts";
import {Spinner} from "@telegram-apps/telegram-ui";
import {EthData, getETHData} from "@/api/getEthPrice.ts";
import {FixedSizeList as List, ListChildComponentProps} from "react-window";
import SuccessArrow from "@/components/SuccessArrow.tsx";
import FailureArrow from "@/components/FailureArrow.tsx";
import AutoSizer from "react-virtualized-auto-sizer";

const padDate = (component: number) => component.toString().padStart(2, "0");

function DealListRow({ index, data, style: listItemStyles }: ListChildComponentProps<{deals: Deal[], ethData: EthData[]}>) {
  const deal = data.deals[index];
  const ethData = data.ethData[index];
  const dealTime = new Date(ethData.time);

  return (
    <div className={style.dealWrapper} key={deal.id} style={listItemStyles}>
      <div className={style.dealDate}>
        {padDate(dealTime.getDate())}.{padDate(dealTime.getMonth() + 1)} {padDate(dealTime.getHours())}:{padDate(dealTime.getMinutes())}
      </div>
      <div className={style.dealBox}>
        <span className={style.dealActualPrice}><span style={{color: "white"}}>ETH</span> {parseFloat(ethData.open)}$</span>
        {
          deal.profitPercent < 0 ?
            <div className={style.resultBox} style={{color: "#989898"}}>
              <span>
                Failure {deal.profitPercent}%
              </span>
              <FailureArrow className={style.failArrow}/>
            </div>
            :
            <div className={style.resultBox} >
              <span>Success</span>
              <span className={style.percent}>{deal.profitPercent}%</span>
              <SuccessArrow className={style.successArrow}/>
           </div>
        }
      </div>
    </div>
  )
}

export function DealHistoryPage() {
  const ethPrice = useEthPrice();
  const {isLoading, loadData:deals} = useLoading(getLastExecuted);
  const {isLoading: isDataLoading, loadData:ethData} = useLoading(getETHData);

  return (
    <Page back={true}>
      <header>
        <Logo/>
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
        {
          isLoading || isDataLoading ? <Spinner size={"l"} /> :
            <AutoSizer>
              {({width, height})=>
                <List  className={style.dealsContainer}
                       width={width}
                       height={height}
                       itemSize={105}
                       itemData={{deals, ethData}}
                       itemCount={deals.length}>
                  {DealListRow}
                </List>
              }
            </AutoSizer>
        }
      </section>
    </Page>
  );
}
