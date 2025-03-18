import style from "./ReviewModal.module.css";
import {LogoTelegram, Xmark} from "@gravity-ui/icons";
import { RefObject, useCallback, useState} from "react";
import {initData, useSignal} from "@telegram-apps/sdk-react";
import {sendReview} from "@/api/sendReview.ts";
import {Review} from "@/api/getReviews.ts";

interface ReviewModalProps {
  dialogRef: RefObject<HTMLDialogElement>,
  onClose?: (review: Review) => void,
  amount?: string
}

export default function ReviewModal({dialogRef, amount = "0", onClose}: ReviewModalProps) {
  const [value, setValue] = useState("");
  const user = useSignal(initData.user)

  const handleModalClose = useCallback(() => {
    dialogRef.current?.close();
  }, [])

  const handelSubmit = useCallback(async () => {
    if (!user) {
      throw new Error("Invalid user");
    }

    const review = {
      amount,
      tgId: user.id,
      text: value
    }

    setValue("")
    dialogRef.current?.close()
    onClose && onClose({
      id: Date.now(),
      text: value,
      amount,
      user: {
        name: user.firstName,
        photoURL: user.photoUrl || ""
      }
    })
    await sendReview(review)
  }, [value, amount])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }, []);

  return (
    <dialog className={style.reviewModalContainer} ref={dialogRef}>
      <button className={style.reviewModalCloseButton} onClick={handleModalClose}>
        <Xmark width={30} height={30} style={{verticalAlign: "middle"}}/>
      </button>
      <h3 className={style.reviewModalHeader}>Write a review about using the application</h3>
      <textarea className={style.reviewModalInput} placeholder={"Your review..."} maxLength={500} value={value} onChange={handleChange}/>
      <button className={style.reviewModalSubmitButton} onClick={handelSubmit}>
        Send <LogoTelegram width={20} height={20}/>
      </button>
    </dialog>
  );
}
