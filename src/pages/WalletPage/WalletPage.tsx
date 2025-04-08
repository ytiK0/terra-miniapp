import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";
import {Badge} from "@/components/Badge/Badge.tsx";
import {UsdtIcon} from "@/components/UsdtIcon.tsx";

import style from "./WalletPage.module.css"
import {useAppStore} from "@/state/appState.ts";
import {ArrowDown, ArrowsRotateRight, ArrowUp} from "@gravity-ui/icons";
import {Link} from "@/components/Link/Link.tsx";
import {useUpdateWallet} from "@/hooks/useUpdateWallet.ts";
import {prettifyFloat} from "@/helpers/pretifyFlat.ts";

export function WalletPage() {
  const {terroCoins, depositedUsdt, earnedUsdt, usdt} = useAppStore((s) => s.userWallet);


  useUpdateWallet();

  return (
    <Page>
      <header>
        <Logo />
      </header>
      <main className={style.walletContainer}>
        <Badge className={style.topBadge}>
          <UsdtIcon />
          <span style={{marginLeft: 5}}>USDT</span>
        </Badge>
        <div className={style.balanceWrapper}>
          {usdt}$
        </div>
        <div className={style.walletButtons}>
          <Link to={"/receive"} className={style.walletButton}>
            <div className={style.walletBtnIconWrapper}>
              <ArrowDown className={style.walletBtnIcon}/>
            </div>
            <span>Deposit</span>
          </Link>
          <Link to={"/send"} className={style.walletButton}>
            <div className={style.walletBtnIconWrapper}>
              <ArrowUp className={style.walletBtnIcon}/>
            </div>
            <span>Withdrawal</span>
          </Link>
          <Link to={"/trade"} className={style.walletButton}>
            <div className={style.walletBtnIconWrapper}>
              <ArrowsRotateRight className={style.walletBtnIcon}/>
            </div>
            <span>Exchange</span>
          </Link>
        </div>
        <div className={style.allBalanceWrapper}>
          <div className={style.terroBalance}>
            <div style={{display: "flex", alignItems: "center", gap: 4}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 31 30" fill="none">
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
                <UsdtIcon invert size={25} />
                USDT
              </div>
              <span className={style.gray}>Deposited</span>
              <span className={style.gray} style={{textAlign: "right"}}>{depositedUsdt} USDT</span>
              <span className={style.gray}></span>
              <span className={style.gray}>Earned</span>
              <span className={style.gray} style={{textAlign: "right"}}>{prettifyFloat(earnedUsdt)}USDT</span>
            </div>
            <div className={style.line}></div>
            <div className={style.result}><span style={{color: "#F89007"}}>{usdt} </span>USDT</div>
          </div>
        </div>
      </main>
    </Page>
  );
}
