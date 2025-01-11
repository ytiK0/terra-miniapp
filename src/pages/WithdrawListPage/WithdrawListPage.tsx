import style from "./WithdrawListPage.module.css"
import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";
import {useLoading} from "@/hooks/useLoading.ts";
import {getCashOuts} from "@/api/getCashOuts.ts";
import {Spinner} from "@telegram-apps/telegram-ui";
import {Avatar} from "@/components/Avatar/Avatar.tsx";

export function WithdrawListPage() {
  const {isLoading, loadData: cashOuts} = useLoading(getCashOuts);

  return (
    <Page back={true}>
      <header className={style.header}>
        <Logo />
        <span className={style.headerSubtitle}>
          Withdrawal List
        </span>
      </header>
      <section className={style.withdrawSection}>
        { isLoading ? <Spinner size={"l"} /> :
            cashOuts && cashOuts.length !== 0 ?
              cashOuts.map((cashOut, i, couts) => {
                const date = new Date(cashOut.completedAt);
                const user = cashOut.user;

                return <>
                  { i !== 0 && (new Date(couts[i - 1]?.completedAt)).getDate() !== date.getDate() ?
                    <div className={style.divideLine}></div> : null
                  }
                  <div style={{textAlign: "left"}} key={cashOut.id}>
                    <span className={style.time}>
                      {date.getDate()}.{date.getMonth()} {date.getHours()}:{date.getMinutes()}
                    </span>
                    <div className={style.withdrawElementWrapper}>
                      <Avatar imgUrl={cashOut.user.photoURL} alt={"userpic"} width={50}/>
                      <div className={style.userWrapper}>
                        <span>{user.name}</span>
                        <div className={style.userWalletWrapper}>
                          <span>wallet number</span>
                        </div>
                      </div>
                      <div className={style.amountBadge}>
                        <span>{cashOut.amount}$</span>
                      </div>
                      </div>
                  </div>
                  </>
                }
              ) :
              <span style={{color: "gray"}}>No cash-outs yet</span>
        }
      </section>
    </Page>
  );
}
