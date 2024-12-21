import {useEffect, useState} from "react";

export function useLoading<T>(callback: () => Promise<T>): [boolean, T|undefined] {
  const [isLoading, setIsLoading] = useState(true);

  const [loadData, setLoadData] = useState<T>()

  useEffect(() => {
    callback().then((data) => {
      setLoadData(data)
      setIsLoading(false)
    });
  }, [])

  return [isLoading, loadData];
}