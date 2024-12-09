import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";

import styles from "./RatingPage.module.css"
import {useEffect, useState} from "react";
import {Spin} from "@gravity-ui/uikit";
import {Avatar} from "@/components/Avatar/Avatar.tsx";
import {getTopUsers} from "@/api/getTopUsers.ts";
import {useAppStore} from "@/state/appState.ts";
import {Badge} from "@/components/Badge/Badge.tsx";
import {Link} from "@/components/Link/Link.tsx";
import {ChevronRight} from "@gravity-ui/icons";
import {getUserPlace} from "@/api/getUserPlace.ts";
import {initData, useSignal} from "@telegram-apps/sdk-react";

export function RatingPage() {
  const userId = useSignal(initData.user)?.id;
  const userCoins = useAppStore((s) => s.userWallet?.terroCoins) || 0;
  const [topUsers, setTopUsers] = useState<{name: string, coins: number, id: string}[]>([]);
  const [userPlace, setUserPlace] = useState<number | string>("+999");
  const [isLoading, setIsLoading] = useState(true)

  async function loadTop() {
    if (userId === undefined) {
      throw new Error("Telegram id is undefined!")
    }

    const topUsers = await getTopUsers()
    const userPlace = await getUserPlace(userId)
    setTopUsers(topUsers)
    setUserPlace(userPlace)
  }

  useEffect(() => {
    loadTop().then(() => {setIsLoading(() => false)})
  }, [])

  if (isLoading) {
    return <Page><Logo/><Spin className={styles.spinner} size={"l"}/></Page>
  }

  return (
    <Page>
      <header style={{marginTop: 25}}>
        <Logo />
      </header>
      <section className={styles.topSection}>
        <div className={styles.topUser}>
          <Avatar width={80} imgUrl="lions_mini/teen" alt="user profil img">
            <span style={{fontSize: 20}}>2</span>
          </Avatar>
          <span className={styles.topUsername}>

            { (topUsers[1] && topUsers[1].name) || "-" }
          </span>
        </div>
        <div className={styles.topUserBig}>
          <Avatar width={100} imgUrl="#" alt="user profil img">
            <span style={{fontSize: 26}}>1</span>
          </Avatar>
          <span className={styles.topUsername}>
            {(topUsers[0] && topUsers[0].name) || "-"}
          </span>
        </div>
        <div className={styles.topUser}>
          <Avatar width={80} imgUrl="#" alt="user profil img">
            <span style={{fontSize: 20}}>3</span>
          </Avatar>
          <span className={styles.topUsername}>
            {(topUsers[2] && topUsers[2].name) || "-"}
          </span>
        </div>
      </section>
      <section className={styles.userStatSection}>
        <div className={styles.userStatBox}>
          <Badge>
            <span style={{fontSize: 36}}>
              {userCoins}T
            </span>
          </Badge>
          <Link to={"/wallet"}>
            <span style={{display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20}}>
              BALANCE <ChevronRight width={21} height={21}/>
            </span>
          </Link>
        </div>
        <div className={styles.userStatBox}>
          <Badge>
            <span style={{fontSize: 35}}>
              #{userPlace}
            </span>
          </Badge>
          <Link to={"/balance"}>
            <span style={{display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20}}>
              RATING <ChevronRight width={21} height={21}/>
            </span>
          </Link>
        </div>
      </section>
      <section className={styles.topListSection}>
        {
          topUsers.map((user, i) => (
            <div className={styles.topLine} key={user.name}>
              <div className={"orange"} style={{textAlign: "right"}}>{i+1}</div>
              <span className={styles.topLineName}>{user.name}</span>
              <div className={styles.topLineCoins}>{user.coins}T</div>
            </div>
          ))
        }
      </section>
    </Page>
  );
}
