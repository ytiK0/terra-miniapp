import {Page} from "@/components/Page.tsx";
import {CircleInfo} from "@gravity-ui/icons";
import {Link} from "@/components/Link/Link.tsx";

import styles from "./LevelsPage.module.css"
import {Badge} from "@/components/Badge/Badge.tsx";
import {getStatus} from "@/helpers/getStatus.ts";
import {calcLevel, levels} from "@/helpers/calcLevel.ts";
import {useAppStore} from "@/state/appState.ts";
import {FC, useMemo} from "react";
import {binarySearch} from "@/helpers/binarySearch.ts";

const InfinityIcon: FC<{ color: string, align: string, height: number }> = ({color, align, height}) => (
  <svg viewBox="0 0 24 24" height={height} style={{verticalAlign: align}} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_iconCarrier">
      <path
        d="M18.1777 8C23.2737 8 23.2737 16 18.1777 16C13.0827 16 11.0447 8 5.43875 8C0.85375 8 0.85375 16 5.43875 16C11.0447 16 13.0828 8 18.1788 8H18.1777Z"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </g>
  </svg>
)

export const statusStats: Record<string, { gain: string, level: string, gainNum: number }> = {
  "Young": {
    gainNum: 0.5,
    gain: "+0.5% +10T",
    level: "1-10"
  },
  "Teen": {
    gainNum: 1,
    gain: "+1% +10T",
    level: "11-15"
  },
  "Adult": {
    gainNum: 1.5,
    gain: "+1.5% +10T",
    level: "16-20"
  },
  "Boss": {
    gainNum: 2,
    gain: "+2% +10T",
    level: "21-25"
  },
  "Godfather": {
    gainNum: 3,
    gain: "+3% +10T",
    level: "26+"
  }
}

const DAYS_COUNTING_PERCENT = 1.04

export function LevelsPage() {
  const usdt = useAppStore((s) => s.userWallet.usdt);
  const coins = useAppStore((s) => s.userWallet.terroCoins);


  if (coins === undefined) {
    throw new Error("Something went wrong!")
  }

  const currentLevel = calcLevel(coins);
  const userLevelName = getStatus(coins);
  const isLastLevel = levels.length <= currentLevel;

  const levelIndex = levels.findIndex(({level}) => level == currentLevel);

  let progressPercent = 100;
  let coinsToNextLevel = 0;


  if (!isLastLevel) {
    const levelProgressStart = levels[levelIndex].coins;
    const nextLevel = levels[levelIndex+1].coins;

    coinsToNextLevel = nextLevel - coins;
    const stageVolume = nextLevel - levelProgressStart;
    const stageCoinsCount = coins - levelProgressStart;

    progressPercent = (stageCoinsCount / stageVolume) * 100
  }

  const holdDays = useMemo(() => {
    if (!isLastLevel && coins !== 0) {
      return binarySearch((mid) => (levels[levelIndex+1].coins * 2) >= (usdt) * DAYS_COUNTING_PERCENT ** mid, 1, 5 * 365);
    }

    return <InfinityIcon height={18} color={"#D5D5D599"} align={"bottom"} />;
  }, [coins])

  return (
    <Page>
      <header className={styles.header}>
        <span className={styles.headerTitle}>Levels</span>
        <Badge className={styles.badge}>+{statusStats[userLevelName].gainNum}%/DAILY</Badge>
        <Link to={"/information"} className={styles.moreInformationBtn}>
          <CircleInfo width={30} height={30} color={"#F89007"}/>
        </Link>
      </header>

      <section className={styles.progressBarSection}>
        <div className={styles.currentLevel}>
          <span className={"orange"}>{currentLevel}</span> LVL
        </div>
        <div className={styles.progressBarWidget}>
          <span>{currentLevel}</span>
          <div className={styles.progressBar}>
            <div className={styles.progressBarFiller} style={{width: `${progressPercent}%`, height: "100%"}}></div>
          </div>
          <span>{isLastLevel ? <InfinityIcon height={30} align={"top"} color={"white"} /> : currentLevel + 1 }</span>
        </div>
        <span className={styles.progressHint}>
          {holdDays} days hold / Deposit {coinsToNextLevel * 2}$
        </span>
      </section>

      <section className={styles.levelsSection}>
        {
          Object.keys(statusStats).map((levelName) =>
            <div className={styles.levelBox} key={levelName} >
              <img className={styles.levelImg} src={`lions_mini/${levelName.toLowerCase()}.png`} alt="level img"/>
              <div className={styles.levelWrapper}>
                <span className={styles.levelName}>{levelName}</span>
                <span className={[userLevelName === levelName ? styles.levelGainActive : null, styles.levelGain].filter((a) => a).join(" ")}>
                  {statusStats[levelName].gain}
                </span>
              </div>
              <div className={styles.level}>
                <span style={{fontSize: 20, lineHeight: "100%"}}>
                  {statusStats[levelName].level}
                  <br/>
                  <span style={{fontSize: 18}}>
                    LVL
                  </span>
                </span>
              </div>
            </div>
          )
        }
      </section>
    </Page>
  );
}
