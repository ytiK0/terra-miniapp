import {TourBoxProps} from "@/components/TourBox/TourBox.tsx";

type TourStep = {
  targetId: string | null,
  widthTransform?: number,
  heightTransform?: number,
  borderRadius?: string | number,
  tourBox: Omit<TourBoxProps, "next" | "onclose">
}

export const tourSteps: TourStep[] = [
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
      innerBox: "By clicking on <info/> you can see how many points you need to earn to reach a <orange>new level</orange>.<br/>" +
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