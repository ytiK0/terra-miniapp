import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";

import style from "./ReviewsPage.module.css";
import {Spinner} from "@telegram-apps/telegram-ui";
import {getReviews, Review} from "@/api/getReviews.ts";
import {Avatar} from "@/components/Avatar/Avatar.tsx";
import {useInfinityScroll} from "@/hooks/useInfinityScroll.ts";
import ReviewModal from "@/components/ReviewModal/ReviewModal.tsx";
import {useCallback, useRef} from "react";

export function ReviewsPage() {
  const [spinnerRef, reviews, isLast, setReviews] = useInfinityScroll(getReviews);
  const reviewModalRef = useRef<HTMLDialogElement>(null);

  const handleModalOpen = useCallback(() => {
    reviewModalRef.current?.showModal();
  }, []);

  const handleNewReview = useCallback((review: Review) => {
    setReviews((prev) => [review, ...prev]);
  }, [])

  return (
    <Page back={true}>
      <header className={style.header}>
        <Logo/>
        <div>
          Reviews
        </div>
      </header>
      <ReviewModal dialogRef={reviewModalRef} amount={"0"} onClose={handleNewReview}/>
      <section className={style.reviewsWrapper}>
        {reviews.length === 0 ? <span style={{color: "gray"}}>No reviews to show</span>
          : reviews.map(({id, text, user, amount}) => (
            <div key={id} className={style.reviewBox}>
              <div className={style.reviewHeaderWrapper}>
                <div className={style.reviewHeaderUser}>
                  <Avatar alt={"reviewer avatar"} imgUrl={user.photoURL} width={33}/>
                  <span>{user.name}</span>
                </div>

                <div className={style.reviewWithdrawWrapper}>
                  <span style={{fontSize: 8, color: "#989898"}}>Withdraw</span>
                  <div className={style.withdrawBadge}>{+amount === 0 ? "-" : `${+amount}$`}</div>
                </div>
              </div>
              <div className={style.reviewTextWrapper}>
                {text}
              </div>
            </div>
          ))
        }
        {isLast ||
            <div ref={spinnerRef}>
                <Spinner size={"l"}/>
            </div>
        }
      </section>
      <section className={style.newReviewButtonSection}>
        <button className={style.newReviewButton} onClick={handleModalOpen}>
          WRITE A REVIEW
        </button>
      </section>
    </Page>
  );
}
