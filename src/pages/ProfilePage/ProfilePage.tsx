import {Page} from "@/components/Page.tsx";
import {initData, openLink, openTelegramLink, useSignal} from "@telegram-apps/sdk-react";

import styles from "./ProfilePage.module.css"
import {ArrowShapeTurnUpRight, Copy, LogoTelegram} from "@gravity-ui/icons";
import {useCallback} from "react";
import {Link} from "@/components/Link/Link.tsx";
import {getStatus} from "@/helpers/getStatus.ts";
import {Avatar} from "@/components/Avatar/Avatar.tsx";
import {useAppStore} from "@/state/appState.ts";
import * as React from "react";

const addPercent = 1.04;

export function ProfilePage() {
  const user = useSignal(initData.user)
  const {terroCoins, usdt} = useAppStore((s) => s.userWallet);
  const referralLink = `https://t.me/${import.meta.env.VITE_TERRA_BOTNAME}/?start=${user?.id}`;

  const status = getStatus(terroCoins);

  if (user === undefined) {
    throw new Error("User is invalid");
  }

  const copyRefLinkToClipboard = useCallback( async (event: React.MouseEvent) => {
    try {
      const target = event.currentTarget as HTMLDivElement;
      target.classList.add(styles.blink);
      setTimeout(() => {
        target.classList.remove(styles.blink)
      }, 1000)
      await navigator.clipboard.writeText(referralLink);
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
      console.log(import.meta.env.VITE_TERRA_SUPPORT_LINK)
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
        <Avatar className={styles.headProfileImg} width={70} imgUrl={user?.photoUrl} alt="user profil photo"/>
        <span className={styles.username}>
          {
            user.username ? `@${user.username}` : user.firstName
          }
        </span>
      </header>
      <section>
        <span style={{fontSize: 24}}>Status: <span style={{color: "#F89007"}}>{status}</span></span>
      </section>
      <section>
        <section className={styles.externResContainer}>
          <Link to={"/reviews"} className={styles.externResBtn}>
            Reviews
            <ArrowShapeTurnUpRight color={"#F89007"} style={{marginLeft: "10px"}}/>
          </Link>
          <Link to={"/withdraw"} className={styles.externResBtn}>
            with
            <br/>
            drawals
            <ArrowShapeTurnUpRight color={"#F89007"} style={{marginLeft: "10px"}}/>
          </Link>
        </section>
        <section className={styles.profitSection}>
          <div className={styles.profitBox}>
            <span style={{color: "#989898", fontSize: "10px"}}>After</span>
            <span>1 Day</span>
            <div className={styles.profitLabel}>{parseFloat((usdt * addPercent).toFixed(2))} USDT</div>
          </div>
          <div className={styles.profitBox}>
            <span style={{color: "#989898", fontSize: "10px"}}>After</span>
            <span>7 Days</span>
            <div className={styles.profitLabel}>{parseFloat((usdt * Math.pow(addPercent, 7)).toFixed(2))} USDT</div>
          </div>
          <div className={styles.profitBox}>
            <span style={{color: "#989898", fontSize: "10px"}}>After</span>
            <span>30 Days</span>
            <div className={styles.profitLabel}>{parseFloat((usdt * Math.pow(addPercent, 30)).toFixed(2))} USDT</div>
          </div>
        </section>
      </section>
      <section className={styles.helpContainer}>
        <div className={styles.helpElement} onClick={openChannel}>
          <LogoTelegram/>
          {import.meta.env.VITE_TERRA_CHANEL_NAME}
        </div>
        <div className={styles.helpElement} onClick={openX}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M15.7512 0H18.818L12.1179 8.4718L20 20H13.8284L8.99458 13.0082L3.46359 20H0.394938L7.5613 10.9385L0 0H6.32828L10.6976 6.39077L15.7512 0ZM14.6748 17.9692H16.3742L5.4049 1.9241H3.58133L14.6748 17.9692Z"
              fill="black"/>
          </svg>
          TeeroApp
        </div>
      </section>
      <section className={styles.helpContainer}>
        <div style={{flexGrow: 1, fontSize: 16}}>
          Technical
          <br/>
          Support
        </div>
        <div className={styles.helpElement} onClick={openSupport}>
          @support
        </div>
      </section>
      <section className={styles.referralSection}>
        <div className={styles.referralLinkWrapper} onClick={copyRefLinkToClipboard}>
          <div style={{fontSize: 27, color: "#F89007", display: "inline-block", width: "100%", backgroundColor: "#25272B", padding: "5px 0", borderRadius: 10, cursor: "pointer"}}>
            Invite Friends
          </div>
          <div className={styles.referralCopyButton}>
            <Copy className={styles.referralCopyIcon} width={30} height={30}/>
          </div>
        </div>
      </section>
    </Page>
  );
}
