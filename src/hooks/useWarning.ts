import {useCallback, useState} from "react";

export function useWarning() {
  const [isWarningVisible, setIsWarningVisible] = useState(false)

  const toggle = useCallback(() => {
    setIsWarningVisible(true);
    setTimeout(() => {
      setIsWarningVisible(false);
    }, 1500);
  }, []);

  return [isWarningVisible, toggle] as const;
}