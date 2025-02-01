import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";

import style from "./ReviewsPage.module.css";
import {Spinner} from "@telegram-apps/telegram-ui";
import {getReviews} from "@/api/getReviews.ts";
import {Avatar} from "@/components/Avatar/Avatar.tsx";
import {useInfinityScroll} from "@/hooks/useInfinityScroll.ts";

export function ReviewsPage() {
  const [spinnerRef, reviews, isLast] = useInfinityScroll(getReviews);

  return (
    <Page>
      <header className={style.header}>
        <Logo />
        Reviews
      </header>
      <section className={style.reviewsWrapper}>
        { reviews.length === 0 ? <span style={{color: "gray"}}>No reviews to show</span>
            : reviews.map(({id, text, user, amount}) => (
              <div key={id} className={style.reviewBox}>
                <div className={style.reviewHeaderWrapper}>
                  <div className={style.reviewHeaderUser}>
                    <Avatar alt={"reviewer avatar"} imgUrl={user.photoURL} width={33} />
                    <span>{user.name}</span>
                  </div>
                  <div className={style.reviewWithdrawWrapper}>
                    <span style={{fontSize: 8, color: "#989898"}}>Withdraw</span>
                    <div className={style.withdrawBadge}>{amount}$</div>
                  </div>
                </div>
                <div className={style.reviewTextWrapper}>
                  {text}
                </div>
              </div>
            ))
        }
        { isLast ||
            <div ref={spinnerRef}>
              <Spinner size={"l"}/>
            </div>
        }
      </section>
    </Page>
  );
}
