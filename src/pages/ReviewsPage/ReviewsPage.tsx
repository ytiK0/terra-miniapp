import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";

import style from "./ReviewsPage.module.css";
import {useEffect, useRef, useState} from "react";
import {Spinner} from "@telegram-apps/telegram-ui";
import {getReviews, Review} from "@/api/getReviews.ts";
import {Avatar} from "@/components/Avatar/Avatar.tsx";

const LIMIT = 50;

export function ReviewsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([{
    id: 1,
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum enim repellat usamus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic ",
    amount: 25,
    user: {
      photoURL: "",
      name: "Utikaa"
    }
  },
    {
      id: 2,
      text: "Lorem, ipsum dolor sit amet conserat numquam similique ratione, labore temporibus ea ullam hic ",
      amount: 5,
      user: {
        photoURL: "",
        name: "Utika2a"
      }
    },
    {
      id: 3,
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum enim repellat usamus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic mus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic mus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic mus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic ",
      amount: 105,
      user: {
        photoURL: "",
        name: "Utikaa"
      }
    },
    {
      id: 4,
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum enim repellat usamus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic ",
      amount: 2125,
      user: {
        photoURL: "",
        name: "Uti12kaa"
      }
    },
    {
      id: 5,
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum enim repellat usamus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic ",
      amount: 25,
      user: {
        photoURL: "",
        name: "Utikaa"
      }
    }
  ]);
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(false);
  const lastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLast) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    getReviews(page, LIMIT, signal)
      .then((reviews) => {
        setReviews((prev) => prev.concat(reviews))
      })
      .then(() => setIsLoading(false))
      .catch((er) => {throw new Error(er)})

    return () => controller.abort("Load canceled")
  }, []);

  useEffect(() => {
    if (!lastRef.current) {
      console.log("choe")
      return
    }

    const observer = new IntersectionObserver( async (entries) => {
      if (entries[0].isIntersecting) {
        await loadNextReviews();
      }
    }, {threshold: 0.5});

    observer.observe(lastRef.current);

    return () => observer.disconnect();
  }, []);

  async function loadNextReviews() {
    console.log("loading next");
    if (isLast) {
      return;
    }

    console.log(lastRef);

    const newReviews = await getReviews(page + 1, LIMIT);

    if (newReviews.length < LIMIT) {
      setIsLast(true);
    }

    setReviews((prev) => prev.concat([{
      id: 6,
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum enim repellat usamus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic ",
      amount: 25,
      user: {
        photoURL: "",
        name: "22Utikaa"
      }
    },
      {
        id: 7,
        text: "Lorem, ipsum dolor sit amet conserat numquam similique ratione, labore temporibus ea ullam hic ",
        amount: 5,
        user: {
          photoURL: "",
          name: "122Utika2a"
        }
      },
      {
        id: 8,
        text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum enim repellat usamus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic mus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic mus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic mus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic ",
        amount: 105,
        user: {
          photoURL: "",
          name: "222Utikaa"
        }
      },
      {
        id: 9,
        text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum enim repellat usamus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic ",
        amount: 2125,
        user: {
          photoURL: "",
          name: "322Uti12kaa"
        }
      },
      {
        id: 10,
        text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum enim repellat usamus rerum obcaecati distinctio cupiditate quaerat numquam similique ratione, labore temporibus ea ullam hic ",
        amount: 25,
        user: {
          photoURL: "",
          name: "422Utikaa"
        }
      }
    ]));
    setPage((prev) => prev++);
  }

  return (
    <Page>
      <header className={style.header}>
        <Logo />
        Reviews
      </header>
      <section className={style.reviewsWrapper}>
        {!isLoading && reviews.length === 0 ? <span>No reviews to show</span>
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
            <div ref={lastRef}>
              <Spinner size={"l"}/>
            </div>
        }
      </section>
    </Page>
  );
}
