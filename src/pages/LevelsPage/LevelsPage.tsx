import {Page} from "@/components/Page.tsx";
import {CircleInfo} from "@gravity-ui/icons";
import {Link} from "@/components/Link/Link.tsx";

import styles from "./LevelsPage.module.css"
import {Badge} from "@/components/Badge/Badge.tsx";
import {getStatus} from "@/helpers/getStatus.ts";
import {calcLevel, levels} from "@/helpers/calcLevel.ts";
import {useAppStore} from "@/state/appState.ts";

const statusStats: Record<string, {gain: string, level: string}> = {
  "Young": {
    gain: "+0.5%T/DAILY",
    level: "1-10"
  },
  "Teen": {
    gain: "+1%T/DAILY",
    level: "11-15"
  },
  "Adult": {
    gain: "+1.5%T/DAILY",
    level: "16-20"
  },
  "Boss": {
    gain: "+2%T/DAILY",
    level: "21-25"
  },
  "Godfather": {
    gain: "+3%T/DAILY",
    level: "26+"
  }
}


export function LevelsPage() {
  const coins = useAppStore((s) => s.userWallet?.terroCoins)


  if (coins === undefined) {
    throw new Error("Something went wrong!")
  }

  const currentLevel = calcLevel(coins);
  const userLevelName = getStatus(coins);
  const isLastLevel = levels.length <= currentLevel;

  const levelIndex = levels.findIndex(({level}) => level == currentLevel);

  let progressPercent = 100;

  let nextLevel: number | null = null;

  if (!isLastLevel) {
    const levelProgressStart = levels[levelIndex].coins;
    nextLevel = levels[levelIndex+1].coins;

    const stageVolume = nextLevel - levelProgressStart;
    const stageCoinsCount = coins - levelProgressStart;

    progressPercent = (stageCoinsCount / stageVolume) * 100
  }


  return (
    <Page>
      <header className={styles.header}>
        <Link to={"/information"} className={styles.moreInformationBtn}>
          <CircleInfo width={30} height={30} color={"#F89007"}/>
        </Link>
        <span className={styles.headerTitle}>Levels</span>
        <Badge className={styles.badge}>{statusStats[userLevelName].gain.split("T/").join(" / ")}</Badge>
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
          <span>{isLastLevel ? "inf" : currentLevel + 1 }</span>
        </div>
        <div className={styles.coinProgress} >
          <div style={{textAlign: "right"}}>{coins}</div>
          <div>/</div>
          <div style={{textAlign: "left"}}>{nextLevel || "inf"}</div>
        </div>
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
