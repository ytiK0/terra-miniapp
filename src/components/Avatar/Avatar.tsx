import {PropsWithChildren, useCallback, useEffect, useState} from "react";

import styles from "./Avatar.module.css";
import {Person} from "@gravity-ui/icons";

interface AvatarProps {
  imgUrl?: string
  alt: string
  width: number
  className?: string
}

export function Avatar({ imgUrl, alt, width, children, className }: PropsWithChildren<AvatarProps>) {
  if (imgUrl === "" || imgUrl === null) {
    imgUrl = "#"
  }

  const [isErrored, setIsErrored] = useState(false);

  const handleError = useCallback(() => {
    setIsErrored(true);
  }, []);

  // Reset error if `imgUrl` was changed to check it again
  useEffect(() => {
    setIsErrored(false);
  }, [imgUrl]);

  if (isErrored || imgUrl === undefined) {
    return (
      <>
        <div className={styles.avatarContainer} style={{width: width + "px"}}>
          <Person className={styles.avatarImg} color={"#1f2022"} style={{backgroundColor: "#27282B"}}/>
        </div>
        {children}
      </>

    )
  }

  return (
    <>
      <div className={`${styles.avatarContainer} ${className}`} style={{width: width + "px", height: width + "px"}}>
        <img
          className={styles.avatarImg}
          src={imgUrl}
          alt={alt}
          onError={handleError}
        />
      </div>
      {children}
    </>

  );
}
