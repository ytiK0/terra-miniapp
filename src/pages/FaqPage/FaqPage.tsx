import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";

import styles from "./FaqPage.module.css"

const questions: Record<string, string> = {
  "What is the main purpose of the app?": "Our app is designed for depositing and withdrawing funds with a profit calculation of 0.25% to 0.4% per day. We aim to provide our users with stable income by using their funds for trading on various exchanges.",
  "How can I deposit funds into the app?": "You can deposit funds in any amount. Simply follow the instructions in the app to make a deposit. We accept various methods of depositing funds to ensure convenience for all users.",
  "How does trading work and how do I earn profits?": "We use your funds for trading on various exchanges with the goal of generating overall profits. Our team of professional traders works to maximize the returns on your investments.",
  "What is the withdrawal fee?": "When withdrawing funds, we charge a fee of 15%. This 15% is directed towards the capitalization of the Teero token, which supports its growth and development.",
  "What is the Teero token and how is it related to the app?": "The Teero token is a cryptocurrency whose capitalization is supported by the withdrawal fees and other projects of our ecosystem. Information about the token is available within the app, and we recommend reviewing it to understand its potential.",
  "How can I earn TEERO points?": "In addition to trading, we offer the opportunity to earn TEERO points, which are equivalent to the Teero token. You earn points for actively participating in the project's activities and investing in it. You also receive TEERO points equivalent to 50% of the deposit amount. Additionally, by holding funds without withdrawing, you receive a daily percentage increase in these points. However, after a withdrawal, the points revert to the level your character was at before. After the token is listed, you will be able to exchange your TEERO points for real funds.",
  "How can I withdraw my funds and TEERO points?": "Withdrawing funds and TEERO points can be done through the app interface. Follow the instructions to complete the withdrawal process. Please note that it may take some time to process the withdrawal.",
  "Are there any risks associated with using the app?": "As with any investment project, there are risks involved. We recommend that you carefully review the terms and not invest more than you are willing to lose. Due to diversification and minimal risk strategies, we have not experienced negative results over a 5-year period.",
  "How can I contact support?": "If you have any questions or issues, you can reach out to customer support through the button in your lobby. We are always ready to assist you and answer your questions.",
  "Where can I find additional information about the project?": "You can find additional information about the project, updates, and news on our channels: X and Telegram."
}


export function FaqPage() {
  return (
    <Page back={true}>
      <div className={ styles.headWrapper }>
        <Logo />
        <h1>FAQ</h1>
      </div>

      <div className={styles.questionsContainer}>
        {
          Object.keys(questions).map((question, i) =>
            <details name={"faq"} key={i}>
              <summary className={styles.faqHeader} >
                <div className={styles.faqQuestion}>
                  {question}
                </div>
                <div className={styles.marker}></div>
              </summary>
              <p className={styles.faqAnswer}>
                {questions[question]}
              </p>
            </details>
          )
        }
      </div>
    </Page>
  );
}
