export function binarySearch(cb: (mid: number) => boolean, l=1, r=1000) {
  while (l<r) {
    const mid = (l - 1) + Math.round((r - l)/2);

    if (cb(mid)) {
      l = mid + 1;
    }
    else {
      r = mid - 1;
    }
  }

  return l;
}