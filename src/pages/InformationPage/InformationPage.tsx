import {Page} from "@/components/Page.tsx";

import styles from "./InformationPage.module.css"
import {useState} from "react";
import {Accordion} from "@telegram-apps/telegram-ui";
import {
  AccordionSummary
} from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import {
  AccordionContent
} from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";


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
    "20": 10000,
    "21": 12000,
    "22": 15000,
    "23": 17500,
    "24": 20000,
    "25": 25000
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
  Godfather:  "2-5%"
}

export function InformationPage() {
  const [openAccordion, setOpenCategory] = useState<null | string>(null)

  return (
    <Page back={true}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.header}>Information</h1>
        <span style={{color: "#D5D5D5", fontSize: "14px", width: "85%", display: "flex"}}>The user receives points equivalent to 50% of the recharge amount</span>
      </div>
      <div className={styles.informationWrapper}>
        {
          Object.keys(information).map((categoryName, i) =>
            <div className={styles.accordionWrapper}>
              <Accordion key={i} expanded={categoryName === openAccordion} onChange={(expanded) => { expanded ? setOpenCategory(categoryName) : setOpenCategory(null)}}>
                <AccordionSummary className={styles.categoryHeader}>
                  {categoryName}  <span className={styles.orange}>{categoryGain[categoryName]}</span>
                </AccordionSummary>
                <AccordionContent className={styles.categoryInformation}>
                  <div className={styles.gridWrapper}>
                    {
                      Object.keys(information[categoryName]).map((infoIndex, i) =>
                        <div key={`${infoIndex}-${i}`} className={styles.infoItem}>
                          {infoIndex === "empty" || <><span className={styles.orange}>{infoIndex}</span> <span className={styles.gray}>-</span> </>}
                          {information[categoryName][infoIndex]}
                          <span className={styles.gray}> Terro</span>
                        </div>
                      )
                    }
                  </div>
                </AccordionContent>
              </Accordion>
            </div>
          )
        }
      </div>
    </Page>
  );
}
