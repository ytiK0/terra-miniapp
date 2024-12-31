import { useEffect, useState } from "react";

type LoadingState<T> =
  | { isLoading: true; loadData: undefined }
  | { isLoading: false; loadData: T };

export function useLoading<T>(
  callback: (signal?: AbortSignal) => Promise<T>
): LoadingState<T> {
  const [state, setState] = useState<LoadingState<T>>({
    isLoading: true,
    loadData: undefined,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    callback(signal)
      .then((data) => {
        setState({ isLoading: false, loadData: data });
      })

    return () => controller.abort();
  }, [callback]);

  return state;
}
