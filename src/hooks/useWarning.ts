import {useCallback, useState} from "react";

export function useWarning(delay: number | null) {
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [message, setMessage] = useState<string>();

  const toggle = useCallback((message?: string) => {
    if (delay === null) {
      setIsWarningVisible((s) => !s);
      setMessage(message);
    }

    else {
      setIsWarningVisible(true);
      setMessage(message);

      setTimeout(() => {
        setIsWarningVisible(false);
        setMessage(undefined);
      }, delay);
    }
  }, []);

  return [isWarningVisible, toggle, message] as const;
}