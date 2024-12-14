import {useCallback, useState} from "react";

export function useWarning(delay: number | null) {
  const [isWarningVisible, setIsWarningVisible] = useState(false)

  const toggle = useCallback(() => {
    if (delay === null) {
      setIsWarningVisible((s) => !s);
    }

    else {
      setIsWarningVisible(true);

      setTimeout(() => {
        setIsWarningVisible(false);
      }, delay);
    }
  }, []);

  return [isWarningVisible, toggle] as const;
}