import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";
import {CircleInfo} from "@gravity-ui/icons";
import {Link} from "@/components/Link/Link.tsx";

import styles from "./LevelsPage.module.css"
import {Badge} from "@/components/Badge/Badge.tsx";
import {useAppStore} from "@/state/appState.ts";

const levels: Record<string, {gain: string, level: string}> = {
  "YOUNG": {
    gain: "+0.5% +10T",
    level: "1-10"
  },
  "TEEN": {
    gain: "+1% +10T",
    level: "11-15"
  },
  "ADULT": {
    gain: "+1.5% +10T",
    level: "16-20"
  },
  "BOSS": {
    gain: "+2% +10T",
    level: "21-25"
  },
  "GOODFATHER": {
    gain: "+3% +10T",
    level: "26+"
  }
}

export function LevelsPage() {
  const coins = useAppStore((s) => s.userWallet?.terroCoins)
  let userLevelName;

  if (coins === undefined) {
    throw new Error("Something went wrong!")
  }

  if (coins < 11) {
    userLevelName = "YOUNG"
  }
  else if (coins < 16) {
    userLevelName = "TEEN"
  }
  else if (coins < 21) {
    userLevelName = "ADULT"
  }
  else if (coins < 26) {
    userLevelName = "BOSS"
  }
  else if (coins >= 26) {
    userLevelName = "GOODFATHER"
  }
  else {
    throw new Error("Something went wrong")
  }

  return (
    <Page>
      <header style={{position: "relative", margin: "0 15px"}}>
        <Link to={"/information"} className={styles.moreInformationBtn}>
          <CircleInfo width={30} height={30} color={"#F89007"}/>
        </Link>
        <Logo/>
        <div className={styles.subtitle}>
          <span className={styles.subtitleHead}>Levels</span>
          <Badge>+5% / DAILY</Badge>
        </div>
      </header>

      <section className={styles.levelsSection}>
        {
          Object.keys(levels).map((levelName) =>
            <div className={styles.levelBox} key={levelName} >
              <img className={styles.levelImg} src={`lions_mini/${levelName.toLowerCase()}.png`} alt="level img"/>
              <div className={styles.levelWrapper}>
                <span className={styles.levelName}>{levelName}</span>
                <span className={[userLevelName === levelName ? styles.levelGainActive : null, styles.levelGain].filter((a) => a).join(" ")}>
                  {levels[levelName].gain}
                </span>
              </div>
              <div className={styles.level}>
                <span>
                  {levels[levelName].level}
                  <br/>
                  LVL
                </span>
              </div>
            </div>
          )
        }
      </section>
    </Page>
  );
}
