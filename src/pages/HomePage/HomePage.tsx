import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import {StatisticBox} from "@/components/StatisticBox/StatisticBox.tsx";

import style from "./HomePage.module.css"
import {Logo} from "@/components/Logo/Logo.tsx";
import {Badge} from "@/components/Badge/Badge.tsx";
import {UsdtIcon} from "@/components/UsdtIcon.tsx";
import {useAppStore} from "@/state/appState.ts";
import {calcLevel} from "@/helpers/calcLevel.ts";
import {getStatus} from "@/helpers/getStatus.ts";

export const HomePage: FC = () => {
  const {terroCoins, usdt} = useAppStore((s) => s.userWallet) || {terroCoins: 0, usdt: 0};
  const level = calcLevel(terroCoins);
  const lion = terroCoins === 0 ? "0" : getStatus(terroCoins).toLowerCase();

  return (
    <Page>
      <header>
        <Logo />
        <div className={style.statisticContainer}>
          <StatisticBox>
            <Badge>
            <UsdtIcon />
              USDT
            </Badge>
            <div className={style.value}>
              <span style={{fontSize:"44px", lineHeight: "100%"}}>
                {usdt}<span style={{fontSize: 33}}>$</span>
              </span>
              <span style={{fontSize: 14, color: "#989898"}}>N% / daily</span>
            </div>
          </StatisticBox>
          <StatisticBox>
            <Badge>TERRA</Badge>
            <div className={style.value}>
              <span style={{fontSize: 42, lineHeight: "100%"}}>{terroCoins}</span>
              <span style={{fontSize: 16}}>POINTS</span>
              <span style={{fontSize: 14, color: "#989898"}}>N% / daily</span>
            </div>
          </StatisticBox>
        </div>
      </header>
      <section className={style.lionSection}>
        <img className={style.lionImg} src={`lions/${lion}.png`} alt="lion"/>
        <span style={{fontSize: 22}}>
          <span style={{fontSize: 44,  color: "#F88F07"}}>{level}</span>
          <span style={{display: "inline-block", marginLeft: 5}}>LVL</span>
        </span>
      </section>
    </Page>
  );
};
