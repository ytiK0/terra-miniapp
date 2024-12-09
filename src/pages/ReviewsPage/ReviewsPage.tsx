import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";

import style from "./ReviewsPage.module.css";
import {useEffect, useState} from "react";
import {Spinner} from "@telegram-apps/telegram-ui";
import {getReviews} from "@/api/getReviews.ts";
import {Avatar} from "@/components/Avatar/Avatar.tsx";

export interface Review {
  id: number,
  text: string
}

export function ReviewsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([{id: 1, text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum enim repellat harum debitis aliquam voluptas dolores magnam provident veniam unde. Excepturi tempora asperiores perferendis possimus magnam accusamus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic "}])

  useEffect(() => {
    getReviews()
      .then((reviews) => setReviews((prev) => prev.concat(reviews)))
      .then(() => setIsLoading(false))
      .catch((er) => {throw new Error(er)})
  }, [])

  return (
    <Page>
      <header className={style.header}>
        <Logo />
        Reviews
      </header>
      <section className={style.reviewsWrapper}>
        {isLoading ? <Spinner size={"l"}/>
          : reviews.length === 0 ? <span>No reviews to show</span>
            : reviews.map(({text, id}) => (
              <div key={id} className={style.reviewBox}>
                <div className={style.reviewHeaderWrapper}>
                  <div className={style.reviewHeaderUser}>
                    <Avatar alt={"reviewer avatar"} width={33} />
                    <span>{id}</span>
                  </div>
                  <div className={style.reviewWithdrawWrapper}>
                    <span style={{fontSize: 8, color: "#989898"}}>Withdraw</span>
                    <div className={style.withdrawBadge}>25$</div>
                  </div>
                </div>
                <div className={style.reviewTextWrapper}>
                  {text}
                </div>
              </div>
            ))
        }
      </section>
    </Page>
  );
}
