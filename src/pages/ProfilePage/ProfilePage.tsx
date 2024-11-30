import {Page} from "@/components/Page.tsx";
import {initData, useSignal} from "@telegram-apps/sdk-react";

import styles from "./ProfilePage.module.css"

export function ProfilePage() {
  const user = useSignal(initData.user)

  return (
    <Page>
      <div className={styles.headWrapper}>
        <div className={styles.headProfileImgBg}>
          <img className={styles.headProfileImg} src={user?.photoUrl} alt="user profil photo"/>
        </div>
        <div className={styles.headSignWrapper}>
          <span className={styles.headSign}>Personal</span>
          <span className={styles.headSign}>cabinet</span>
        </div>
      </div>
      <div>
        {/* TODO: referral link */}
      </div>
      <div>
        {/* TODO: status*/}
      </div>
      <div>
        {/* TODO: try to set all indo in one wrapper*/}
      </div>
    </Page>
  );
}
