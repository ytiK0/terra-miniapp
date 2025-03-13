import {FC, useCallback, useEffect, useState} from 'react';

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
import SuccessArrow from "@/components/SuccessArrow.tsx";
import FailureArrow from "@/components/FailureArrow.tsx";
import {classNames as clx, cloudStorage, initData, useSignal} from "@telegram-apps/sdk-react";
import {statusStats} from "@/pages/LevelsPage/LevelsPage.tsx";
import TourBox, {TourBoxProps} from "@/components/TourBox/TourBox.tsx";

type TourHole = {
  top: number,
  left: number,
  width: number,
  height: number,
  borderRadius?: number | string
}

type TourStep = {
  targetId: string | null,
  widthTransform?: number,
  heightTransform?: number,
  borderRadius?: string | number,
  tourBox: Omit<TourBoxProps, "next" | "onclose">
}

const tourSteps: TourStep[] = [
  {
    targetId: null,
    tourBox: {
      lionAlign: "left",
      top: "35%",
      topHeading: "Hello <orange>{user}</orange>. My name is <orange>Teero</orange> and I will help you figure out our application.",
      innerBox: "First, let me tell you what we're here for.<br/>" +
        "You will be able to receive <orange>0.25% - 1%</orange> of your total balance per day. <orange>How?</orange> " +
        "The essence of our application is that our huge, experienced team of traders trades with a common bank in order to increase the profits of our users, however, we charge a <orange>15% commission</orange> on withdrawal and direct it to the capitalization of our Teero token.<br/>" +
        "Users also have the opportunity to earn <orange>Teero points</orange> - they are the currency of our coin, after capitalization of which you can withdraw them to <orange>USDT</orange>.<br/>" +
        "Let me show you how things work here."
    }
  },
  {
    targetId: "lion",
    widthTransform: 0.6,
    heightTransform: 1.1,
    borderRadius: "50%",
    tourBox: {
      lionAlign: "none",
      top: 50,
      innerBox: "By clicking on you can see how many points you need to earn to reach a <orange>new level</orange>.<br/>" +
        "When you top up your USDT balance, you get <orange>2 times more</orange> dash points.",
      topHeading: "This is your <orange>Teero</orange> - it grows as your glasses grow."
    }
  },
  {
    targetId: "lion",
    widthTransform: 0.6,
    heightTransform: 1.1,
    borderRadius: "50%",
     tourBox: {
      lionAlign: "none",
      top: 50,
      topHeading: null,
      innerBox: "As your Terra grows, so does the <orange>daily percentage</orange> of pharma teero points.<br/>Yes, yes, it didn't seem to you, you earn not only USDT, but also <orange>Teero points every day.</orange>"
    }
  },
  {
    targetId: "usdt-statistic-box",
    widthTransform: 1.1,
    heightTransform: 1.1,
    tourBox: {
      lionAlign: "right",
      top: "45%",
      innerBox: "The amount of your <orange>USDT balance!</orange><br/>Below you can see how much was earned for the <orange>current day.</orange>",
      topHeading: null
    }
  },
  {
    targetId: "teero-statistic-box",
    widthTransform: 1.1,
    heightTransform: 1.1,
    tourBox: {
      lionAlign: "left",
      top: "45%",
      innerBox: "<orange>Teero Points</orange><br/>Below you can see a daily <orange>% increase</orange> in teero points.",
      topHeading: null
    }
  },
  {
    targetId: "deals",
    widthTransform: 0.6,
    heightTransform: 1.1,
    tourBox: {
      lionAlign: "left",
      top: "60%",
      innerBox: "By clicking on this button, you can watch all the <orange>latest deals</orange> of our team, both successful and failed.",
      topHeading: null
    }
  },
  {
    targetId: "faq",
    widthTransform: 1.2,
    heightTransform: 1.1,
    tourBox: {
      lionAlign: "right",
      top: "60%",
      innerBox: "<orange>FAQ</orange> - Frequently Asked Questions",
      topHeading: null
    }
  },
  {
    targetId: "wallet",
    widthTransform: 2,
    heightTransform: 1.5,
    tourBox: {
      lionAlign: "left",
      top: "60%",
      innerBox: "<orange>Wallet</orange><br/>" +
        "Top up your balance, withdraw funds, and I have usdt for teero points",
      topHeading: null
    }
  },
  {
    targetId: "rating",
    widthTransform: 2,
    heightTransform: 1.5,
    tourBox: {
      lionAlign: "right",
      top: "60%",
      innerBox: "<orange>Rating</orange><br/>" +
        "See your own and other users results",
      topHeading: null
    }
  },
  {
    targetId: "home",
    widthTransform: 2.3,
    heightTransform: 2.3,
    tourBox: {
      lionAlign: "left",
      top: "60%",
      innerBox: "<orange>Home Button</orange>",
      topHeading: null
    }
  },
  {
    targetId: "levels",
    widthTransform: 2,
    heightTransform: 1.5,
    tourBox: {
      lionAlign: "right",
      top: "60%",
      innerBox: "The character's height and available <orange>levels page</orange><br/>" +
        "It displays all the information about the levels, percentage of point growth and the number of points for further growth.",
      topHeading: null
    }
  },
  {
    targetId: "profile",
    widthTransform: 2,
    heightTransform: 1.5,
    tourBox: {
      lionAlign: "left",
      top: "60%",
      innerBox: "<orange>Personal account</orange><br/>" +
        "Earnings forecasts, reviews, conclusions, channels, support, and even a referral link. You can find all this on this page.",
      topHeading: null
    }
  }
];

export const HomePage: FC = () => {
  const user = useSignal(initData.user);
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
  const [isTourStart, setIsTourStart] = useState(false)

  const close = useCallback(() => {
    if (cloudStorage.setItem.isAvailable())
      cloudStorage.setItem("is-tour-done", "true")
    else
      localStorage.setItem("is-tour-done", "true")
    setIsTourStart(false);
  }, [])

  const next = useCallback(() => {
    if (tourStep === tourSteps.length - 1) {
      close();
      setTourStep(0);

      return;
    }
    setTourStep((p) => p+1);
  }, [tourStep]);


  useEffect(() => {
    if (tourSteps[tourStep].targetId === null) {
      setHole(null);
      return;
    }
    const target = document.getElementById(tourSteps[tourStep].targetId as string);
    if (!target) {
      console.error("target not found", tourSteps[tourStep].targetId);
      return;
    }

    const {top, height, width, left} = target.getBoundingClientRect();

    const widthTransform = tourSteps[tourStep].widthTransform || 1;
    const heightTransform = tourSteps[tourStep].heightTransform || 1;
    const borderRadius = tourSteps[tourStep].borderRadius

    setHole({
      left: left + width / 2, top: top + height / 2, height: height * heightTransform, width: width * widthTransform, borderRadius
    })
  }, [tourStep]);


  useEffect(() => {
    async function startTour() {
      let startTour = true;

      if (cloudStorage.isSupported()) {
        const keys = await cloudStorage.getKeys();

        if (keys.includes("is-tour-done")) {
          console.log("inc")
          startTour = (await cloudStorage.getItem("is-tour-done")) !== "true";
        }
        else
          await cloudStorage.setItem("is-tour-done", "false");
      }
      else {
         const item = localStorage.getItem("is-tour-done");
         if (item === null)
           localStorage.setItem("is-tour-done", "false");
         else
           startTour = item !== "true"
      }

      console.log(startTour)

      setIsTourStart(startTour)
    }

    const timeout = setTimeout(startTour, 1000);
    return () => clearTimeout(timeout);
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


      <header className={style.header} style={{marginTop: 15}}>
        <Logo/>
        {
          ethPrice &&
            <div id={"deals"}>
                <Link to={"/deals"} className={style.dealContainer}>
                    <ActiveDeal ethPrice={ethPrice} />
                </Link>
            </div>
        }
        <div className={style.statisticContainer} >
          <div className={style.statisticBox} id={"usdt-statistic-box"}>
            <Link to={"/wallet"}>
              <Badge className={style.badge}>
                <UsdtIcon />
                <span>
                  USDT
                </span>
              </Badge>
            </Link>
            <div className={style.value}>
              <span style={{fontSize:"2.75em", lineHeight: "100%"}}>
                {usdt}<span style={{fontSize: "0.75em"}}>$</span>
              </span>
              <span style={{fontSize: "0.875em", lineHeight: "110%", color: todayProfit > 0 ? "#F89007" : "#989898"}}>
                {todayProfit >= 0 ? "+" : "-"}
                {todayProfit}$
                {todayProfit > 0 ? <SuccessArrow className={style.profitArrow} /> : <FailureArrow className={clx(style.profitArrow, style.profitArrowFail)} />}
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
                <SuccessArrow className={style.profitArrow} /></span>
            </div>
          </div>
        </div>
        <Link to={"/faq"} className={style.faqLink} id={"faq"}>
          <CircleQuestion color={"#F88F07"} width={40} height={40} />
        </Link>
      </header>
      <section className={style.lionSection} id={"lion"}>
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