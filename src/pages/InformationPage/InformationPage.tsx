import {Page} from "@/components/Page.tsx";

import styles from "./InformationPage.module.css";
import {classNames as clx} from "@telegram-apps/sdk-react";


const information: Record<string, Record<string, number | null | string>> = {
  "Kid": {
    "1": 0,
    "2": 25,
    "3": 50,
    "4": 75,
    "5": 100,
    "6": 150,
    "7": 250,
    "8": 300,
    "9": 400,
    "10": 500
  },
  "Teen": {
    "11": 650,
    "12": 800,
    "13": 1000,
    "14": 1250,
    "15": 1500
  },
  "Adult": {
    "16": 2000,
    "17": 2500,
    "18": 3000,
    "19": 4000,
    "20": 5000
  },
  "Boss": {
    "21": 10000,
    "22": 12000,
    "23": 15000,
    "24": 17500,
    "25": 20000,
  },
  "Godfather": {
    "empty": "+25000"
  }
}

const categoryGain: Record<string, string> = {
  Kid: "0.5%",
  Teen: "1%",
  Adult: "1.5%",
  Boss: "2%",
  Godfather: "2.5%"
}

export function InformationPage() {

  return (
    <Page back={true}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.header}>Information</h1>
        <span style={{color: "#D5D5D5", fontSize: "14px", width: "85%"}}>
          The user receives teero points equivalent to 50% of the recharge USDT amount
        </span>
      </div>
      <div className={styles.informationWrapper}>
        {
          Object.keys(information).map((categoryName, i) =>
            <details name={"info"} key={categoryName} >
              <summary className={styles.categoryHeader}>
                <span>
                  {categoryName} <span className={styles.orange}>{categoryGain[categoryName]} </span>
                  <span style={{color: "#636465", fontSize: 12, textTransform: "none"}}>Teero Points Daily</span>
                </span>
                <div className={styles.marker}></div>
              </summary>
              <div className={styles.categoryInformation}>
                <div className={clx(styles.gridWrapper, {[styles.oneLineGrid]: i !== 0})}>
                  {
                    Object.keys(information[categoryName]).map((infoIndex, i) =>
                      <div key={`${infoIndex}-${i}`} className={styles.infoItem}>
                        {infoIndex === "empty" || <><span className={styles.orange}>{infoIndex} lvl</span> <span className={styles.gray}>-</span> </>}
                        {information[categoryName][infoIndex]}
                        <span className={styles.gray}> Teero</span>
                      </div>
                    )
                  }
                </div>
              </div>
            </details>
          )
        }
      </div>
    </Page>
  );
}
