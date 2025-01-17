import {useState} from "react";

export type ProcessStatus = "none" | "pending" | "done" | "error";

export function useProcess() {
  const [state, setState] = useState<ProcessStatus>("none");

  const startProcess = async <T>(process: Promise<T>)=> {
    setState("pending");

    return process.then((processData) => {
      setState("done");

      setTimeout(() => {
        setState("none")
      }, 1000);

      return processData;
    }).catch((err) => {
      setState("error");

      setTimeout(() => {
        setState("none")
      }, 1000);

      throw err
    });
  }

  return [state, startProcess] as const;
}