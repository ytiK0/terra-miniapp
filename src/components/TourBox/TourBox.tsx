import style from "./tourBox.module.css"
import {classNames} from "@telegram-apps/sdk-react";
import {XmarkShapeFill} from "@gravity-ui/icons";
import {TypingEffect} from "@/components/TypingEffect.tsx";

export interface TourBoxProps {
  topHeading: string | null
  innerBox: string
  lionAlign: "left" | "right" | "none"
  next: () => void
  onclose: () => void
  top: number | string
}

export default function TourBox({innerBox, lionAlign, topHeading, top, onclose, next}: TourBoxProps) {

  return (
    <div className={style.tourBox} style={{top}}>
      <div className={style.boxHeader}>
        {topHeading && <TypingEffect speed={0} text={topHeading} />}
      </div>
      <div className={style.tourInnerBox}>
        {<TypingEffect text={innerBox} />}
      </div>
      <button className={style.nextButton} onClick={next}>NEXT</button>
      <button className={style.closeButton} onClick={onclose}>
        <XmarkShapeFill color={"white"} width={25} height={25} style={{verticalAlign: "middle"}} />
      </button>
      {
        lionAlign !== "none" ? <img className={classNames(style.lion, {[style.lionRight]: lionAlign === "right"})} src={"lions/adult.png"} alt={"mascot"} /> : null
      }
    </div>
  );
}
