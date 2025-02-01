import {useCallback, useEffect, useRef, useState} from "react";

const LIMIT = 50;

export function useInfinityScroll<T>(loader: (page: number, limit: number) => Promise<T[]>, limit: number = LIMIT, initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const lastRef = useRef<HTMLDivElement>(null);

  const loadNextReviews = useCallback( async () => {
    if (isLast) {
      return;
    }

    const newData = await loader(page + 1, limit);

    if (newData.length < limit) {
      setIsLast(true);
    }

    setData((prev) => prev.concat(newData));
    setPage((prev) => prev + 1);
  }, [page]);

  useEffect(() => {
    if (!lastRef.current) {
      return
    }

    const observer = new IntersectionObserver( async (entries) => {
      if (entries[0].isIntersecting) {
        await loadNextReviews();
      }
    }, {threshold: 0.7});

    observer.observe(lastRef.current);

    return () => observer.disconnect();
  }, [page]);

  return [lastRef, data, isLast, setData] as const;
}