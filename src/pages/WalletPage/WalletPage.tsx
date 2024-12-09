import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";
import {Badge} from "@/components/Badge/Badge.tsx";
import {UsdtIcon} from "@/components/UsdtIcon.tsx";

import style from "./WalletPage.module.css"
import {useAppStore} from "@/state/appState.ts";
import {ArrowDown, ArrowsRotateRight, ArrowUp} from "@gravity-ui/icons";
import {Link} from "@/components/Link/Link.tsx";

export function WalletPage() {
  const {terroCoins, usdt} = useAppStore((s) => s.userWallet) || {terroCoins: 0, usdt: 0}

  return (
    <Page>
      <header style={{marginTop: 25}}>
        <Logo />
      </header>
      <main className={style.walletContainer}>
        <Badge>
          <UsdtIcon />
          <span style={{marginLeft: 5, fontSize: 26}}>USDT</span>
        </Badge>
        <div className={style.balanceWrapper}>
          {usdt}$
        </div>
        <div className={style.walletButtons}>
          <Link to={"/send"} className={style.walletButton}>
            <div className={style.walletBtnIconWrapper}>
              <ArrowUp className={style.walletBtnIcon}/>
            </div>
            <span>Send</span>
          </Link>
          <Link to={"/receive"} className={style.walletButton}>
            <div className={style.walletBtnIconWrapper}>
              <ArrowDown className={style.walletBtnIcon}/>
            </div>
            <span>Receive</span>
          </Link>
          <Link to={"/trade"} className={style.walletButton}>
            <div className={style.walletBtnIconWrapper}>
              <ArrowsRotateRight className={style.walletBtnIcon}/>
            </div>
            <span>Trade</span>
          </Link>
        </div>
        <div className={style.allBalanceWrapper}>
          <div className={style.terroBalance}>
            <div style={{display: "flex", alignItems: "center", gap: 4}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                <ellipse cx="15.665" cy="15.0001" rx="15" ry="14.9999" fill="#F89007"/>
                <path d="M13.5283 24V12.7983H9.08667V8.83333H23.0833V12.7983H18.6417V24H13.5283Z" fill="#321D01"/>
              </svg>
              TERRO
            </div>

            <span>
              {terroCoins}
              <span style={{color: "white"}}>T</span>
            </span>
          </div>
          <div className={style.usdtBalance}>
            <div className={style.usdtBalanceGrid}>
              <div style={{display: "flex", alignItems: "center", gap: 4}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                  <circle cx="15.6396" cy="15.6667" r="15" fill="#F89007"/>
                  <path
                    d="M15.4933 25.3467C13.1678 25.3467 11.355 24.7183 10.055 23.4617C8.755 22.205 8.105 20.4428 8.105 18.175V9.83333H13.2183V18.0233C13.2183 19.1789 13.4278 20.0022 13.8467 20.4933C14.2656 20.97 14.8289 21.2083 15.5367 21.2083C16.2589 21.2083 16.8222 20.97 17.2267 20.4933C17.6456 20.0022 17.855 19.1789 17.855 18.0233V9.83333H22.8817V18.175C22.8817 20.4428 22.2317 22.205 20.9317 23.4617C19.6317 24.7183 17.8189 25.3467 15.4933 25.3467Z"
                    fill="#321D01"/>
                </svg>
                USDT
              </div>
              <span className={style.gray}>Deposited</span>
              <span className={style.gray} style={{textAlign: "right"}}>{usdt}USDT</span>
              <span className={style.gray}></span>
              <span className={style.gray}>Earned</span>
              <span className={style.gray} style={{textAlign: "right"}}>{usdt}USDT</span>
            </div>
            <div className={style.line}></div>
            <div className={style.result}>{usdt}<span style={{color: "#F89007"}}>USDT</span></div>
          </div>
        </div>
      </main>
    </Page>
  );
}
