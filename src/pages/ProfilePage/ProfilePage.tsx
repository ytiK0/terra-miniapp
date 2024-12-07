import {Page} from "@/components/Page.tsx";
import {initData, openLink, openTelegramLink, useSignal} from "@telegram-apps/sdk-react";

import styles from "./ProfilePage.module.css"
import {ArrowShapeTurnUpRight, Copy, LogoTelegram} from "@gravity-ui/icons";
import {useCallback} from "react";
import {Link} from "@/components/Link/Link.tsx";
import {getStatus} from "@/helpers/getStatus.ts";



export function ProfilePage() {
  const user = useSignal(initData.user)
  const userCoinCount = 600 // TODO: it will be loaded from api
  const referralLink = `https://t.me/${import.meta.env.VITE_TERRA_BOTNAME}/?start=${user?.id}`

  const copyRefLinkToClipboard = useCallback( async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
    } catch {
      console.log("failed to copy to clipboard!")
    }
  }, [referralLink])

  const openChannel = () => {
    if (openTelegramLink.isAvailable()) {
      openTelegramLink(import.meta.env.VITE_TERRA_CHANEL_LINK);
    }
    else {
      console.log("tg link opening is not supported")
    }
  }

  const openSupport = () => {
    if (openTelegramLink.isAvailable()) {
      openTelegramLink(import.meta.env.VITE_TERRA_SUPPORT_LINK);
    }
    else {
      console.log("tg link opening is not supported")
    }
  }

  const openX = () => {
    if (openLink.isAvailable()) {
      openLink(import.meta.env.VITE_TERRA_TWITTER_LINK, {
        tryBrowser: 'chrome',
        tryInstantView: true,
      })
    }
    else {
      console.log("redirecting not supported")
    }
  }

  return (
    <Page>
      <header className={styles.headWrapper}>
        <div className={styles.headProfileImgBg}>
          <img className={styles.headProfileImg} src={user?.photoUrl} alt="user profil photo"/>
        </div>
        <div className={styles.headSignWrapper}>
          <span className={styles.headSign}>Personal</span>
          <span className={styles.headSign}>cabinet</span>
        </div>
      </header>
      <section className={styles.referralSection}>
        <h3 className={styles.referralSectionHeader}>Referral link</h3>
        <div className={styles.referralLinkWrapper}>
          <div className={styles.referralLinkBox}>
            {referralLink}
          </div>
          <div className={styles.referralCopyButton} onClick={copyRefLinkToClipboard}>
            <Copy width={30} height={30}/>
          </div>

        </div>
      </section>
      <section style={{textAlign:"left", marginLeft:"15px"}}>
        <span style={{}}>Status: <span style={{color:"#F89007"}}>{getStatus(userCoinCount)}</span></span>
      </section>
      <section className={styles.profitSection}>
        <div className={styles.profitBox}>
          <span style={{color: "#989898", fontSize: "10px"}}>After</span>
          <span>1 Day</span>
          <div className={styles.profitLabel}>??? USDT</div>
        </div>
        <div className={styles.profitBox}>
          <span style={{color: "#989898", fontSize: "10px"}}>After</span>
          <span>7 Days</span>
          <div className={styles.profitLabel}>??? USDT</div>
        </div>
        <div className={styles.profitBox}>
          <span style={{color: "#989898", fontSize: "10px"}}>After</span>
          <span>30 Days</span>
          <div className={styles.profitLabel}>??? USDT</div>
        </div>
      </section>
      <section className={styles.externResSection}>
        <Link to={"/reviews"}  className={styles.externResBtn}>
          Reviews
          <ArrowShapeTurnUpRight color={"#F89007"} style={{marginLeft: "10px"}} />
        </Link>
        <Link to={"/withdraw"}  className={styles.externResBtn}>
          with
          <br/>
          drawals
          <ArrowShapeTurnUpRight color={"#F89007"} style={{marginLeft: "10px"}} />
        </Link>
      </section>
      <section className={styles.helpContainer} onClick={openChannel}>
        <div className={styles.helpElement}>
          <LogoTelegram />
          @{import.meta.env.VITE_TERRA_CHANEL_NAME}
        </div>
        <div className={styles.helpElement} onClick={openX}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M15.7512 0H18.818L12.1179 8.4718L20 20H13.8284L8.99458 13.0082L3.46359 20H0.394938L7.5613 10.9385L0 0H6.32828L10.6976 6.39077L15.7512 0ZM14.6748 17.9692H16.3742L5.4049 1.9241H3.58133L14.6748 17.9692Z"
              fill="black"/>
          </svg>
          @terrachannel
        </div>
      </section>
      <section className={styles.helpContainer}>
        <div style={{flexGrow: 1, fontSize:14}}>
          Technical
          <br/>
          Support
        </div>
        <div className={styles.helpElement} onClick={openSupport}>
          @support
        </div>
      </section>
    </Page>
  );
}
