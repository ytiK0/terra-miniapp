import {FC} from 'react';

import { Page } from '@/components/Page.tsx';

import style from "./HomePage.module.css"
import {Logo} from "@/components/Logo/Logo.tsx";
import {Badge} from "@/components/Badge/Badge.tsx";
import {UsdtIcon} from "@/components/UsdtIcon.tsx";
import {useAppStore} from "@/state/appState.ts";
import {calcLevel} from "@/helpers/calcLevel.ts";
import {getStatus} from "@/helpers/getStatus.ts";
import {CircleInfo, CircleQuestion} from "@gravity-ui/icons";
import {Link} from "@/components/Link/Link.tsx";
import {useUpdateWallet} from "@/hooks/useUpdateWallet.ts";
import ActiveDeal from "@/components/ActiveDeal/ActiveDeal.tsx";
import {useEthPrice} from "@/hooks/useEthPrice.ts";

export const HomePage: FC = () => {
  const {terroCoins, usdt} = useAppStore((s) => s.userWallet);
  const level = calcLevel(terroCoins);
  const lion = terroCoins === 0 ? "0" : getStatus(terroCoins).toLowerCase();
  useUpdateWallet()

  const ethPrice = useEthPrice();

  return (
    <Page>
      <header className={style.header} style={{marginTop:15}}>
        <Logo />
        {
          ethPrice &&
            <Link to={"/deals"} className={style.dealContainer}>
              <ActiveDeal ethPrice={ethPrice} />
            </Link>
        }
        <div className={style.statisticContainer}>
          <div className={style.statisticBox}>
            <Badge className={style.badge}>
              <UsdtIcon />
              <span>
                USDT
              </span>
            </Badge>
            <div className={style.value}>
              <span style={{fontSize:"2.75em", lineHeight: "100%"}}>
                {usdt}<span style={{fontSize: "0.75em"}}>$</span>
              </span>
              <span style={{fontSize: "0.875em", color: "#989898"}}>N% / daily</span>
            </div>
          </div>
          <div className={style.statisticBox}>
            <Badge className={style.badge}>
              <span>TERRA</span>
            </Badge>
            <div className={style.value}>
              <span style={{fontSize: "2.625em", lineHeight: "100%"}}>{terroCoins}</span>
              <span style={{fontSize: "1em"}}>POINTS</span>
              <span style={{fontSize: "0.875em", color: "#989898"}}>N% / daily</span>
            </div>
          </div>
        </div>
        <Link to={"/faq"} className={style.faqLink}>
          <CircleQuestion color={"#F88F07"} width={40} height={40} />
        </Link>
      </header>
      <section className={style.lionSection}>
        <img className={style.lionImg} src={`lions/${lion}.png`} alt="lion"/>
        <span style={{fontSize: 22, lineHeight: "100%"}}>
          <span style={{fontSize: 44,  color: "#F88F07"}}>{level}</span>
          <span style={{display: "inline-block", marginLeft: 5}}>LVL</span>
          <Link to={"/information"} style={{marginLeft: 5}}>
            <CircleInfo color={"#F88F07"} width={25} height={25} />
          </Link>
        </span>
      </section>
    </Page>
  );
};
