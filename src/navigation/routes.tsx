import type { ComponentType, JSX } from 'react';

import { HomePage } from '@/pages/HomePage/HomePage.tsx';
import { FaqPage } from "@/pages/FaqPage/FaqPage.tsx";
import { InformationPage } from "@/pages/InformationPage/InformationPage.tsx";
import {LevelsPage} from "@/pages/LevelsPage.tsx";
import {ProfilePage} from "@/pages/ProfilePage/ProfilePage.tsx";
import {RatingPage} from "@/pages/RatingPage.tsx";
import {WalletPage} from "@/pages/WalletPage.tsx";

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

];
