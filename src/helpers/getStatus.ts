export function getStatus(coinCount: number) {
  if (coinCount <= 500) {
    return "Young"
  }
  else if (coinCount <= 1500) {
    return "Teen"
  }
  else if (coinCount <= 5000) {
    return "Adult"
  }
  else if (coinCount <= 25000) {
    return "Boss"
  }
  else {
    return "Godfather"
  }
}