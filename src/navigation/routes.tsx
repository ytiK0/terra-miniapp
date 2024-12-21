import type { ComponentType, JSX } from 'react';

import { HomePage } from '@/pages/HomePage/HomePage.tsx';
import { FaqPage } from "@/pages/FaqPage/FaqPage.tsx";
import { InformationPage } from "@/pages/InformationPage/InformationPage.tsx";
import {LevelsPage} from "@/pages/LevelsPage/LevelsPage.tsx";
import {ProfilePage} from "@/pages/ProfilePage/ProfilePage.tsx";
import {RatingPage} from "@/pages/RatingPage/RatingPage.tsx";
import {WalletPage} from "@/pages/WalletPage/WalletPage.tsx";
import {WithdrawListPage} from "@/pages/WithdrawListPage/WithdrawListPage.tsx";
import {ReviewsPage} from "@/pages/ReviewsPage/ReviewsPage.tsx";
import {ReceiveUsdtPage, SendUsdtPage} from "@/pages/ManipulateBalance/ManipulateBalance.tsx";
import {TradePage} from "@/pages/TradePage/TradePage.tsx";
import {DealHistoryPage} from "@/pages/DealHistoryPage/DealHistoryPage.tsx";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: HomePage },
  { path: '/faq', Component: FaqPage, title: "FAQ" },
  { path: '/information', Component: InformationPage },
  { path: '/levels', Component: LevelsPage },
  { path: '/profile', Component: ProfilePage },
  { path: '/rating', Component: RatingPage },
  { path: '/wallet', Component: WalletPage },
  { path: '/withdraw', Component: WithdrawListPage },
  { path: '/trade', Component: TradePage },
  { path: '/receive', Component: ReceiveUsdtPage },
  { path: '/send', Component: SendUsdtPage },
  { path: '/reviews', Component: ReviewsPage },
  { path: '/deals', Component: DealHistoryPage }
];
