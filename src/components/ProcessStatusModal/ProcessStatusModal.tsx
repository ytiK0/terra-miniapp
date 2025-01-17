import style from "./ProcessStatusModal.module.css";
import {Spinner} from "@telegram-apps/telegram-ui";
import {CircleCheckFill, TriangleExclamationFill} from "@gravity-ui/icons";
import {ProcessStatus} from "@/hooks/useProcess.ts";

export function ProcessStatusModal({ status }: {status: ProcessStatus }) {
  return (
    <>
      {
        status !== "none" &&
          <div className={style.processBox}>
            {
              status === "pending" ?
                <>
                  <Spinner size={"l"} />
                  <span>Loading...</span>
                </>
                :
                status === "done" ?
                  <>
                    <CircleCheckFill style={{display: "block", margin: "0 auto", width: 100, height: 50}} color={"#138800"} />
                    <span>DONE!</span>
                  </>
                  :
                  <>
                    <TriangleExclamationFill style={{display: "block", margin: "0 auto", width: 100, height: 50}} color={"#aa0000"} />
                    <span>Error!</span>
                  </>
            }
          </div>
      }
    </>
  )
}