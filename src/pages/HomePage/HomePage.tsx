import {FC, useCallback, useEffect, useState} from 'react';

import { Page } from '@/components/Page.tsx';

import style from "./HomePage.module.css"
import {Logo} from "@/components/Logo/Logo.tsx";
import {Badge} from "@/components/Badge/Badge.tsx";
import {UsdtIcon} from "@/components/UsdtIcon.tsx";
import {useAppStore} from "@/state/appState.ts";
import {calcLevel} from "@/helpers/calcLevel.ts";
import {getStatus} from "@/helpers/getStatus.ts";
import {BookOpen, CircleInfo, CircleQuestion} from "@gravity-ui/icons";
import {Link} from "@/components/Link/Link.tsx";
import {useUpdateWallet} from "@/hooks/useUpdateWallet.ts";
import ActiveDeal from "@/components/ActiveDeal/ActiveDeal.tsx";
import {useEthPrice} from "@/hooks/useEthPrice.ts";
import SuccessArrow from "@/components/SuccessArrow.tsx";
import FailureArrow from "@/components/FailureArrow.tsx";
import {classNames as clx, cloudStorage, initData, useSignal} from "@telegram-apps/sdk-react";
import {statusStats} from "@/pages/LevelsPage/LevelsPage.tsx";
import TourBox from "@/components/TourBox/TourBox.tsx";
import {useSearchParams} from "react-router-dom";
import {tourSteps} from "@/pages/HomePage/tourConfig.ts";

type TourHole = {
  top: number,
  left: number,
  width: number,
  height: number,
  borderRadius?: number | string
}

export const START_TOUR_PARAM_NAME = "start-tour";

export const HomePage: FC = () => {
  const user = useSignal(initData.user);
  const [searchParams, useSearchParam] = useSearchParams();
  const {terroCoins, usdt, todayProfit} = useAppStore((s) => s.userWallet);
  const level = calcLevel(terroCoins);
  const lion = terroCoins === 0 ? "0" : getStatus(terroCoins).toLowerCase();
  useUpdateWallet()

  if (!user) {
    throw new Error("User is invalid")
  }

  const ethPrice = useEthPrice();
  const userStatus = getStatus(terroCoins);

  tourSteps[0].tourBox.topHeading = tourSteps[0].tourBox.topHeading?.replace("{user}", user.firstName) || null;

  const [tourStep, setTourStep] = useState(0);
  const [hole, setHole] = useState<TourHole|null>(null);
  const [isTourStart, setIsTourStart] = useState(false);

  const startTour = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsTourStart(true);
  }, [])

  const close = useCallback(() => {
    if (searchParams.has(START_TOUR_PARAM_NAME)) {
      searchParams.delete(START_TOUR_PARAM_NAME);
      useSearchParam(searchParams);
    }
    else if (cloudStorage.setItem.isAvailable()) {
      cloudStorage.setItem("is-tour-done", "true");
    }
    else {
      localStorage.setItem("is-tour-done", "true");
    }
    setIsTourStart(false);
    setTourStep(0);
  }, [])

  const next = useCallback((ev: React.MouseEvent) => {
    ev.stopPropagation();
    if (tourStep === tourSteps.length - 1) {
      close();
      return;
    }
    setTourStep((p) => p+1);
  }, [tourStep]);


  useEffect(() => {
    if (!isTourStart) {
      return;
    }

    if (tourSteps[tourStep].targetId === null) {
      setHole(null);
      return;
    }
    const target = document.getElementById(tourSteps[tourStep].targetId as string);
    if (!target) {
      console.error("target not found", tourSteps[tourStep].targetId);
      return;
    }

    const rect = target.getBoundingClientRect();
    console.log("bounding rect", rect)

    const borderRadius = tourSteps[tourStep].borderRadius
    const width = rect.width * (tourSteps[tourStep].widthTransform || 1);
    const height = rect.height * (tourSteps[tourStep].heightTransform || 1)
    const left = rect.left - (width - rect.width) / 2;
    const top = rect.top - (height - rect.height) / 2;

    setHole({
      left, top, height , width, borderRadius
    });
  }, [tourStep, isTourStart]);

  useEffect(() => {
    console.log("hole", hole)
  }, [hole]);


  useEffect(() => {
    ["lion", "usdt-statistic-box", "teero-statistic-box", "deals", "faq", "wallet", "rating", "home", "levels", "profile"]. forEach(id=>console.log(id, document.getElementById(id)?.getBoundingClientRect()))

    async function startTour() {
      let startTour = true;

      if (searchParams.get(START_TOUR_PARAM_NAME) === null) {
        if (cloudStorage.isSupported()) {
          const keys = await cloudStorage.getKeys();

          if (keys.includes("is-tour-done")) {
            startTour = (await cloudStorage.getItem("is-tour-done")) !== "true";
          }
          else {
            await cloudStorage.setItem("is-tour-done", "false");
          }
        }
        else {
           const item = localStorage.getItem("is-tour-done");
           if (item === null)
             localStorage.setItem("is-tour-done", "false");
           else
             startTour = item !== "true"
        }
      }

      setIsTourStart(startTour)
    }

    startTour();
  }, []);

  return (
    <Page>
      {
        isTourStart &&
          <div id={"tour"} className={style.tourContainer}>
              <TourBox {...tourSteps[tourStep].tourBox} next={next} onclose={close}/>
              <div className={style.hole} style={hole || undefined}></div>
          </div>
      }


      <header className={style.header}>
        <Logo/>
        <Link to={"/faq"} className={style.faqLink} id={"faq"}>
          <CircleQuestion color={"#F88F07"} width={40} height={40}/>
        </Link>
        <button className={style.startTourBtn} onClick={startTour}>
          <BookOpen />
        </button>
        {
          ethPrice &&
            <div id={"deals"}>
                <Link to={"/deals"} className={style.dealContainer}>
                    <ActiveDeal ethPrice={ethPrice}/>
                </Link>
            </div>
        }
      </header>
      <section className={style.statisticContainer}>
        <div className={style.statisticBox} id={"usdt-statistic-box"}>
          <Link to={"/wallet"}>
            <Badge className={style.badge}>
              <UsdtIcon/>
              <span>
                  USDT
                </span>
            </Badge>
          </Link>
          <div className={style.value}>
              <span style={{fontSize: "2.75em", lineHeight: "100%"}}>
                {usdt}<span style={{fontSize: "0.75em"}}>$</span>
              </span>
            <span style={{fontSize: "0.875em", lineHeight: "110%", color: todayProfit > 0 ? "#F89007" : "#989898"}}>
                {todayProfit >= 0 ? "+" : "-"}
              {todayProfit}$
              {todayProfit > 0 ? <SuccessArrow className={style.profitArrow}/> :
                <FailureArrow className={clx(style.profitArrow, style.profitArrowFail)}/>}
              </span>
          </div>
        </div>
        <div className={style.statisticBox} id={"teero-statistic-box"}>
          <Link to={"/levels"}>
            <Badge className={style.badge}>
              <span>TERRA</span>
            </Badge>
          </Link>
          <div className={style.value}>
            <span style={{fontSize: "2.625em", lineHeight: "100%"}}>{terroCoins}</span>
            <span style={{fontSize: "1em"}}>POINTS</span>
            <span style={{fontSize: "0.875em", color: "#F89007"}}>
                +{statusStats[userStatus].gainNum}%
                <SuccessArrow className={style.profitArrow}/></span>
          </div>
        </div>
      </section>
      <section className={style.lionSection} id={"lion"}>
        <img className={style.lionImg} src={`lions/${lion}.png`} alt="lion"/>
        <span style={{fontSize: 22, lineHeight: "100%"}}>
          <span style={{fontSize: 44, color: "#F88F07"}}>{level}</span>
          <span style={{display: "inline-block", marginLeft: 5}}>LVL</span>
          <Link to={"/information"} style={{marginLeft: 5}}>
            <CircleInfo color={"#F88F07"} width={25} height={25}/>
          </Link>
        </span>
      </section>
    </Page>
  );
};