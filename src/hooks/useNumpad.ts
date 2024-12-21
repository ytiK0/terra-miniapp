import {MouseEventHandler, useCallback, useState} from "react";

export function useNumpad() {
  const [enterValue, setEnterValue] = useState("0");

  const handleNumpadBtnClick = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
    const target = event.target as HTMLDivElement;

    const addPiece = target.dataset["numpadValue"];


    if (addPiece === undefined) {
      return;
    }

    if (addPiece === "del") {
      setEnterValue((val) => {
        const poped = val.slice(0, -1);
        return poped.length !== 0 ? poped : "0";
      })
    }
    else if (addPiece === ".") {
      setEnterValue((val) => {
        console.log(val)
        return  val.includes(".") ? val : val + "."
      });
    }
    else {
      setEnterValue((val) => {
        if (val === "0") {
          return addPiece;
        }
        else if (val.length + 1 <= 6 + +val.includes(".")) {
          return val + addPiece;
        }
        else {
          return val;
        }
      });
    }
  }, []);

  return [enterValue, handleNumpadBtnClick, setEnterValue] as const;
}