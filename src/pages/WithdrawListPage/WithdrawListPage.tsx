import style from "./WithdrawListPage.module.css"
import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";
import {getCashOuts} from "@/api/getCashOuts.ts";
import {Avatar} from "@/components/Avatar/Avatar.tsx";
import {useInfinityScroll} from "@/hooks/useInfinityScroll.ts";
import {Spinner} from "@telegram-apps/telegram-ui";
import {getStatus} from "@/helpers/getStatus.ts";
import {calcLevel} from "@/helpers/calcLevel.ts";

const padDate = (component: number) => component.toString().padStart(2, "0");

export function WithdrawListPage() {
  const [spinnerRef, data, isLast] = useInfinityScroll(getCashOuts);

  return (
    <Page back={true}>
      <header>
        <Logo />
        <span className={style.headerSubtitle}>
          Withdrawal List
        </span>
      </header>
      <section className={style.withdrawSection}>
        { data.length !== 0 ?
              data.map((cashOut, i, couts) => {
                const date = new Date(cashOut.completedAt);
                const user = cashOut.user;

                return <div key={cashOut.id}>
                  { i !== 0 && (new Date(couts[i - 1]?.completedAt)).getDate() !== date.getDate() ?
                    <div className={style.divideLine}></div> : null
                  }
                  <div style={{textAlign: "left"}}>
                    <span className={style.time}>
                      {date.getDate()}.{padDate(date.getMonth()+1)} {date.getHours()}:{padDate(date.getMinutes())}
                    </span>
                    <div className={style.withdrawElementWrapper}>
                      <Avatar imgUrl={cashOut.user.photoURL} alt={"userpic"} width={40}/>
                      <div className={style.userWrapper}>
                        <span>{user.name}</span>
                        <div className={style.userStats}>
                          {getStatus(user.coins).toUpperCase()}
                          <span className={"orange"}> {calcLevel(user.coins)}LVL</span>
                        </div>
                      </div>
                      <div className={style.amountBadge}>
                        <span>{cashOut.amount}$</span>
                      </div>
                      </div>
                    </div>
                  </div>
                }
              ) :
              <span style={{color: "gray"}}>No cash-outs yet</span>
        }
        {
          isLast ||
            <div ref={spinnerRef}>
                <Spinner size={"l"} />
            </div>
        }
      </section>
    </Page>
  );
}
