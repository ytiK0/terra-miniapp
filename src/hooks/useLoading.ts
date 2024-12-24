import {useEffect, useState} from "react";

export function useLoading<T>(callback: (signal?: AbortSignal) => Promise<T>): [boolean, T|undefined] {
  const [isLoading, setIsLoading] = useState(true);

  const [loadData, setLoadData] = useState<T>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    callback(signal).then((data) => {
      setLoadData(data);
      setIsLoading(false);
    });

    return () => controller.abort("Load canceled")
  }, [])

  return [isLoading, loadData];
}