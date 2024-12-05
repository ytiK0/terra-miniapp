import {PropsWithChildren, useCallback, useEffect, useState} from "react";

import styles from "./Avatar.module.css";
import {Person} from "@gravity-ui/icons";

interface AvatarProps {
  imgUrl: string
  alt: string
  width: number
}

export function Avatar({ imgUrl, alt, width, children }: PropsWithChildren<AvatarProps>) {
  const [isErrored, setIsErrored] = useState(false);

  const handleError = useCallback(() => {
    setIsErrored(true);
  }, []);

  // Reset error if `imgUrl` was changed to check it again
  useEffect(() => {
    setIsErrored(false);
  }, [imgUrl]);

  if (isErrored) {
    return (
      <div>
        <div className={styles.avatarContainer} style={{width: width + "px", height: width + "px"}}>
          <Person className={styles.avatarImg} color={"#1f2022"} style={{backgroundColor: "#27282B"}}/>
        </div>
          {children}
      </div>

    )
  }

  return (
    <div>
      <div className={styles.avatarContainer} style={{width: width + "px", height: width + "px"}}>
        <img
          className={styles.avatarImg}
          src={imgUrl}
          alt={alt}
          onError={handleError}
        />
      </div>
      {children}
    </div>

  );
}
