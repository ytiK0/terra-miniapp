import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import {StatisticBox} from "@/components/StatisticBox/StatisticBox.tsx";

import "./HomePage.css"
import {Logo} from "@/components/Logo/Logo.tsx";
import {Badge} from "@/components/Badge/Badge.tsx";
import {UsdtIcon} from "@/components/UsdtIcon.tsx";

export const HomePage: FC = () => {
  return (
    <Page>
      <div className={"home-top"}>
        <Logo />
        <div className="statistic-container">
          <StatisticBox>
            <Badge>
              <UsdtIcon />
              USDT
            </Badge>
            <p style={{fontSize: 12}}>
              will be added with api access
            </p>
          </StatisticBox>
          <StatisticBox>
            <Badge>TERRA</Badge>
            <p style={{fontSize: 12}}>
              will be added with api access
            </p>

          </StatisticBox>
        </div>
      </div>
    </Page>
  );
};
