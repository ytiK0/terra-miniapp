import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import {StatisticBox} from "@/components/StatisticBox/StatisticBox.tsx";

import "./HomePage.css"
import {Logo} from "@/components/Logo/Logo.tsx";
import {Badge} from "@/components/Badge/Badge.tsx";

export const HomePage: FC = () => {
  return (
    <Page>
      <div className={"home-top"}>
        <Logo />
        <div className="statistic-container">
          <StatisticBox>
            <Badge>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#191B1F"/>
                <path d="M10.272 16.256C8.55467 16.256 7.216 15.792 6.256 14.864C5.296 13.936 4.816 12.6347 4.816 10.96V4.8H8.592V10.848C8.592 11.7013 8.74667 12.3093 9.056 12.672C9.36533 13.024 9.78133 13.2 10.304 13.2C10.8373 13.2 11.2533 13.024 11.552 12.672C11.8613 12.3093 12.016 11.7013 12.016 10.848V4.8H15.728V10.96C15.728 12.6347 15.248 13.936 14.288 14.864C13.328 15.792 11.9893 16.256 10.272 16.256Z" fill="#F89007"/>
              </svg>
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
